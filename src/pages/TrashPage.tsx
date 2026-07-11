import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTrashedMenus, restoreMenu, permanentDeleteMenu } from "../services/api";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Trash, ArrowClockwise, TrashSimple } from "@phosphor-icons/react";
import { Skeleton, CardSkeleton } from "../components/ui/skeleton";
import type { Menu } from "../types";
import { templates } from "../templates";

const templateNames: Record<string, string> = {
  modern: "Modern", classic: "Classic", minimal: "Minimal", dark: "Dark",
  bistro: "Bistro", elegant: "Elegant", vintage: "Vintage", neobrutalism: "Neobrutalism",
  nature: "Nature", asian: "Asian", monochrome: "Monochrome", playful: "Playful",
  luxury: "Luxury", fiesta: "Fiesta", mediterranean: "Mediterranean", farm: "Farm",
  cyberpunk: "Cyberpunk", parisian: "Parisian", tropical: "Tropical", korean: "Korean",
};

export default function TrashPage() {
  const [trashed, setTrashed] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => { loadTrashed(); }, []);

  const loadTrashed = async () => {
    try {
      const res = await getTrashedMenus();
      setTrashed(res.menus);
    } catch { navigate("/auth/login"); }
    finally { setLoading(false); }
  };

  const handleRestore = async (id: string) => {
    await restoreMenu(id);
    await loadTrashed();
  };

  const confirmPermanentDelete = async () => {
    if (!deleteTarget) return;
    await permanentDeleteMenu(deleteTarget);
    setDeleteTarget(null);
    await loadTrashed();
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trash</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {trashed.length} deleted {trashed.length === 1 ? "menu" : "menus"}
        </p>
      </div>

      {trashed.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6">
              <Trash className="h-8 w-8 text-muted-foreground" weight="light" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight mb-2">Trash is empty</h2>
            <p className="text-muted-foreground max-w-sm">Deleted menus will appear here. You can restore them within 30 days.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trashed.map((menu) => {
            const preview = templates[menu.template]?.component;
            return (
              <Card key={menu._id} className="group overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="aspect-4/3 bg-muted overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/40 z-10" />
                  {preview && (
                    <div className="absolute inset-0 flex items-start justify-center overflow-hidden pointer-events-none">
                      <div className="w-[800px] h-[800px] shrink-0 scale-45 origin-top">
                        {preview({ title: menu.title, items: menu.items.slice(0, 6) })}
                      </div>
                    </div>
                  )}
                  {menu.deletedAt && (
                    <div className="absolute inset-x-0 bottom-0 z-20 p-3">
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white backdrop-blur-sm">
                        <TrashSimple className="h-3 w-3 text-red-400" weight="fill" />
                        <span className="text-[11px] text-red-400 font-medium">
                          {(() => {
                            const daysLeft = Math.ceil((new Date(menu.deletedAt).getTime() + 30 * 86400000 - Date.now()) / 86400000);
                            return daysLeft > 0 ? `Auto-delete in ${daysLeft}d` : "Expiring soon";
                          })()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-base truncate">{menu.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {templateNames[menu.template]} &middot; {menu.items.length} {menu.items.length === 1 ? "item" : "items"}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => handleRestore(menu._id)}>
                      <ArrowClockwise className="h-3.5 w-3.5" /> Restore
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1 text-destructive border-destructive/30 hover:text-destructive hover:bg-destructive/10" onClick={() => setDeleteTarget(menu._id)}>
                      <TrashSimple className="h-3.5 w-3.5" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={!!deleteTarget} onOpenChange={(v) => { if (!v) setDeleteTarget(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete permanently?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">This action cannot be undone. The menu will be permanently deleted.</p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={confirmPermanentDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
