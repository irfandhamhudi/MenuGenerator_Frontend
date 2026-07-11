import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { getMenu, createMenu, updateMenu, deleteMenu, uploadImage } from "../services/api";
import { templates } from "../templates";
import { Plus, Trash, Upload, X, CaretDown, TrashSimple, Sparkle } from "@phosphor-icons/react";
import type { MenuItem, TemplateType } from "../types";

const DIALOG_KEY = "menu-editor-dialog";

function loadDialogState() {
  try {
    const raw = sessionStorage.getItem(DIALOG_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveDialogState(state: { dialogOpen: boolean; editingIdx: number | null; formItem: MenuItem }) {
  try {
    sessionStorage.setItem(DIALOG_KEY, JSON.stringify(state));
  } catch {}
}

function clearDialogState() {
  sessionStorage.removeItem(DIALOG_KEY);
}

const defaultItem: MenuItem = { category: "", name: "", price: 0, image: "" };

function formatPrice(value: number): string {
  if (!value && value !== 0) return "";
  return Math.round(value).toLocaleString("id-ID");
}

function parsePrice(value: string): number {
  const cleaned = value.replace(/[^0-9]/g, "");
  return parseInt(cleaned, 10) || 0;
}

export default function MenuEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState("My Menu");
  const [template, setTemplate] = useState<TemplateType>("modern");

  useEffect(() => {
    const saved = localStorage.getItem("menu-editor-template");
    if (saved) setTemplate(saved as TemplateType);
  }, []);

  const [categories, setCategories] = useState<string[]>(["Makanan", "Minuman"]);
  const [newCategory, setNewCategory] = useState("");
  const [items, setItems] = useState<MenuItem[]>([]);
  const [saving, setSaving] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(1);

  const saved = loadDialogState();
  const [dialogOpen, setDialogOpen] = useState(saved?.dialogOpen ?? false);
  const [editingIdx, setEditingIdx] = useState<number | null>(saved?.editingIdx ?? null);
  const [formItem, setFormItem] = useState<MenuItem>(saved?.formItem ?? { ...defaultItem });
  const [categoryDialog, setCategoryDialog] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const autoSaveTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<{ download_url: string }[]>([]);
  const dragIdx = useRef<number | null>(null);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  useEffect(() => {
    if (dialogOpen) {
      saveDialogState({ dialogOpen, editingIdx, formItem });
    } else {
      clearDialogState();
    }
  }, [dialogOpen, editingIdx, formItem]);

  useEffect(() => {
    if (!dialogOpen) {
      setFormItem({ ...defaultItem, category: categories[0] || "" });
    }
  }, [categories, dialogOpen]);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    setPreviewScale(Math.min(el.clientWidth / 800, 1));
    const observer = new ResizeObserver(() => {
      setPreviewScale(Math.min(el.clientWidth / 800, 1));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (id) {
      loadMenu(id);
    }
  }, [id]);

  useEffect(() => {
    if (!isEditing) return;
    if (autoSaveTimeout.current) clearTimeout(autoSaveTimeout.current);
    autoSaveTimeout.current = setTimeout(async () => {
      setSaving(true);
      const data = { title, template, categories, items: items.filter((i) => i.name) };
      try {
        await updateMenu(id!, data);
      } catch {
        // silent
      } finally {
        setTimeout(() => setSaving(false), 800);
      }
    }, 2000);
    return () => {
      if (autoSaveTimeout.current) clearTimeout(autoSaveTimeout.current);
    };
  }, [title, template, categories, items, isEditing, id]);

  useEffect(() => {
    if (galleryOpen) {
      fetch("https://picsum.photos/v2/list?limit=20")
        .then((r) => r.json())
        .then(setGalleryImages)
        .catch(() => {});
    }
  }, [galleryOpen]);

  const loadMenu = async (menuId: string) => {
    try {
      const res = await getMenu(menuId);
      setTitle(res.menu.title);
      selectTemplate(res.menu.template);
      if (res.menu.categories?.length > 0) setCategories(res.menu.categories);
      setItems(res.menu.items.length > 0 ? res.menu.items : []);
    } catch {
      navigate("/dashboard");
    }
  };

  const selectTemplate = (tpl: TemplateType) => {
    setTemplate(tpl);
    localStorage.setItem("menu-editor-template", tpl);
  };

  const addCategory = () => {
    const cat = newCategory.trim();
    if (!cat || categories.includes(cat)) return;
    setCategories((prev) => [...prev, cat]);
    setNewCategory("");
  };

  const removeCategory = (cat: string) => {
    setCategories((prev) => prev.filter((c) => c !== cat));
    setItems((prev) => prev.map((item) => (item.category === cat ? { ...item, category: "" } : item)));
  };

  const openAddDialog = (presetCategory?: string) => {
    setEditingIdx(null);
    setFormItem({ ...defaultItem, category: presetCategory || categories[0] || "" });
    setDialogOpen(true);
  };

  const openEditDialog = (idx: number) => {
    setEditingIdx(idx);
    setFormItem({ ...items[idx] });
    setDialogOpen(true);
  };

  const removeItem = (idx: number) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateFormField = (field: keyof MenuItem, value: string | number) => {
    setFormItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormUpload = async (file: File) => {
    setUploading(true);
    try {
      const res = await uploadImage(file);
      updateFormField("image", res.url);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const saveItem = () => {
    if (!formItem.name.trim()) return;
    if (editingIdx !== null) {
      setItems((prev) => prev.map((item, i) => (i === editingIdx ? { ...formItem } : item)));
    } else {
      setItems((prev) => [...prev, { ...formItem }]);
    }
    setDialogOpen(false);
  };

  const confirmDelete = async () => {
    setDeleteDialogOpen(false);
    try {
      await deleteMenu(id!);
      navigate("/dashboard");
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleDelete = () => setDeleteDialogOpen(true);

  const handleSave = async () => {
    setSaving(true);
    const data = { title, template, categories, items: items.filter((i) => i.name) };
    try {
      if (isEditing) {
        await updateMenu(id!, data);
      } else {
        await createMenu(data);
      }
      navigate("/dashboard");
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setSaving(false);
    }
  };

  const PreviewComponent = templates[template].component;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 grid lg:grid-cols-2 gap-6 sm:gap-8">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {isEditing ? "Edit Menu" : "Create Menu"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isEditing ? "Update your menu details below" : "Fill in the details to create your menu"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isEditing && (
              <Button variant="outline" size="sm" onClick={handleDelete} className="text-destructive border-destructive/30 hover:text-destructive hover:bg-destructive/10">
                <TrashSimple className="h-4 w-4" />
                Delete
              </Button>
            )}
            <Button onClick={handleSave} disabled={saving} size="sm">
              {saving ? "Saving..." : "Save Menu"}
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-medium">Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 px-4 pb-4 pt-0">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs">Menu Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="h-8 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Template</Label>
              <div className="grid grid-cols-5 gap-1.5">
                {(Object.entries(templates) as [TemplateType, { name: string }][]).map(([key, tpl]) => (
                  <Button
                    key={key}
                    variant={template === key ? "default" : "outline"}
                    // size="sm"
                    onClick={() => selectTemplate(key)}
                    className="w-full h-8 text-[11px] px-1"
                  >
                    {tpl.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0 space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Add category..."
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCategory())}
                className="h-8 text-xs flex-1"
              />
              <Button variant="outline" size="sm" className="h-8 shrink-0" onClick={addCategory}>
                <Plus className="h-3.5 w-3.5" weight="bold" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                >
                  {cat}
                  <button onClick={() => removeCategory(cat)} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {categories.length === 0 && (
                <span className="text-[11px] text-muted-foreground">No categories yet</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 pt-0 space-y-2">
            {items.length === 0 ? (
              <div className="text-center py-8 text-sm text-muted-foreground">
                No items yet.
              </div>
            ) : (
              [...categories, ""].map((cat) => {
                const catItems = items.filter((i) => (cat ? i.category === cat : !i.category));
                if (catItems.length === 0) return null;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategoryDialog(cat)}
                    className="w-full flex items-center gap-3 p-3 border rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors text-left cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-primary">
                        {catItems.length}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{cat || "Uncategorized"}</p>
                      <p className="text-xs text-muted-foreground">
                        {catItems.length} {catItems.length === 1 ? "item" : "items"}
                      </p>
                    </div>
                    <CaretDown className="h-4 w-4 text-muted-foreground shrink-0 -rotate-90" weight="bold" />
                  </button>
                );
              })
            )}
            <Button variant="outline" className="w-full h-9 text-xs gap-1 mt-1" onClick={() => openAddDialog()}>
              <Plus className="h-3.5 w-3.5" weight="bold" />
              Add Item
            </Button>
          </CardContent>
        </Card>

        <Dialog open={!!categoryDialog} onOpenChange={(v) => { if (!v) setCategoryDialog(null); }}>
          <DialogContent className="max-h-[80vh] flex flex-col max-w-lg">
            <DialogHeader>
              <DialogTitle>{categoryDialog || "Uncategorized"}</DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto scrollbar-none space-y-1.5 min-h-0 pr-1">
              {items
                .filter((i) => (categoryDialog ? i.category === categoryDialog : !i.category))
                .map((item, idx) => {
                  const realIdx = items.indexOf(item);
                  return (
                    <div
                      key={idx}
                      draggable
                      onDragStart={() => { dragIdx.current = realIdx; setDraggedIdx(realIdx); }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        if (dragIdx.current === null || dragIdx.current === realIdx) return;
                        setItems(prev => {
                          const next = [...prev];
                          const [moved] = next.splice(dragIdx.current!, 1);
                          next.splice(realIdx, 0, moved);
                          return next;
                        });
                        dragIdx.current = null;
                        setDraggedIdx(null);
                      }}
                      onDragEnd={() => { dragIdx.current = null; setDraggedIdx(null); }}
                      className={`flex items-center gap-3 p-2.5 border rounded-lg bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors ${draggedIdx === realIdx ? "opacity-50" : ""}`}
                      onClick={() => openEditDialog(realIdx)}
                    >
                      {item.image ? (
                        <img src={item.image} alt="" className="w-10 h-10 rounded object-cover border shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded bg-muted-foreground/10 flex items-center justify-center shrink-0">
                          <span className="text-lg font-semibold text-muted-foreground/40">
                            {item.name.charAt(0).toUpperCase() || "?"}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium truncate block">{item.name}</span>
                        <p className="text-xs text-muted-foreground">
                          Rp {item.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={(e) => { e.stopPropagation(); removeItem(realIdx); }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
            </div>
            <div className="pt-3 border-t mt-3">
              <Button variant="outline"  className="w-full h-9 text-xs gap-1" onClick={() => { const cat = categoryDialog; setCategoryDialog(null); openAddDialog(cat || undefined); }}>
                <Plus className="h-3.5 w-3.5" weight="bold" />
                Add Item to {categoryDialog || "Uncategorized"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingIdx !== null ? "Edit Item" : "Add Item"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Category</Label>
                <div className="relative">
                  <select
                    value={formItem.category}
                    onChange={(e) => updateFormField("category", e.target.value)}
                    className="w-full h-9 text-sm rounded-md border border-input bg-background px-3 pr-8 text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                  >
                    {categories.length === 0 && <option value="">No category</option>}
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <CaretDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" weight="bold" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Item Name</Label>
                <Input
                  placeholder="Enter item name"
                  value={formItem.name}
                  onChange={(e) => updateFormField("name", e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Price (Rp)</Label>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter price"
                  value={formatPrice(formItem.price)}
                  onChange={(e) => updateFormField("price", parsePrice(e.target.value))}
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Image (optional)</Label>
                {formItem.image ? (
                  <div className="relative rounded-lg border overflow-hidden group">
                    <img src={formItem.image} alt="" className="w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 text-xs gap-1"
                        disabled={uploading}
                        onClick={() => document.getElementById("dialog-file")?.click()}
                      >
                        {uploading ? (
                          <div className="animate-spin h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full" />
                        ) : (
                          <Upload className="h-3.5 w-3.5" />
                        )}
                        {uploading ? "Uploading..." : "Change"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 text-xs gap-1"
                        onClick={() => updateFormField("image", "")}
                      >
                        <X className="h-3.5 w-3.5" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : uploading ? (
                  <div className="w-full rounded-lg border-2 border-dashed border-muted bg-muted/20 px-6 py-8 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <div className="animate-spin h-6 w-6 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full" />
                    <span className="text-sm font-medium">Uploading...</span>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => document.getElementById("dialog-file")?.click()}
                      className="w-full rounded-lg border-2 border-dashed border-input bg-transparent px-6 py-8 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring"
                    >
                      <Upload className="h-6 w-6" weight="light" />
                      <span className="text-sm font-medium">Click to upload</span>
                      <span className="text-xs">PNG, JPG or WEBP</span>
                    </button>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm" className="flex-1 h-8 text-xs gap-1" onClick={() => setGalleryOpen(true)}>
                        <Sparkle className="h-3.5 w-3.5" />
                        Gallery
                      </Button>
                    </div>
                  </>
                )}
                <input
                  id="dialog-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFormUpload(file);
                  }}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={saveItem} disabled={!formItem.name.trim()}>
                  {editingIdx !== null ? "Update" : "Add"} Item
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Delete Menu</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">Are you sure you want to delete this menu? This action cannot be undone.</p>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button variant="destructive" size="sm" onClick={confirmDelete}>Delete</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Stock Images</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {galleryImages.map((img, i) => (
                <img
                  key={i}
                  src={img.download_url}
                  alt=""
                  className="w-full h-40 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => { updateFormField("image", img.download_url); setGalleryOpen(false); }}
                />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div ref={previewRef} className="sticky top-6 overflow-hidden hidden lg:block">
        <div style={{ zoom: previewScale }}>
          <PreviewComponent title={title} items={items.filter((i) => i.name)} />
        </div>
      </div>
    </div>
  );
}
