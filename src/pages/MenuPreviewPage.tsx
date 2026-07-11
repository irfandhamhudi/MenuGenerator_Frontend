import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenu } from "../services/api";
import { templates } from "../templates";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import AutoScale from "../components/menu/AutoScale";
import { toPng, toJpeg } from "html-to-image";
import jsPDF from "jspdf";
import { Image, FileImage, FilePdf, PencilSimple, Link as LinkIcon } from "@phosphor-icons/react";
import { Skeleton } from "../components/ui/skeleton";
import type { Menu } from "../types";

export default function MenuPreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    loadMenu(id);
  }, [id]);

  const loadMenu = async (menuId: string) => {
    try {
      const res = await getMenu(menuId);
      setMenu(res.menu);
    } catch {
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const baseOptions = (): any => ({
    pixelRatio: 3,
    cacheBust: true,
    onclone: (doc: Document) => {
      const cloned = doc.querySelector("[data-menu-preview]") as HTMLElement;
      if (cloned) {
        cloned.style.opacity = "1";
        cloned.style.position = "static";
        cloned.style.visibility = "visible";
        cloned.style.width = "800px";
      }
    },
  });

  const exportPng = async () => {
    const el = document.querySelector("[data-menu-preview]") as HTMLElement;
    if (!el) return;
    const dataUrl = await toPng(el, baseOptions());
    const link = document.createElement("a");
    link.download = `${menu?.title || "menu"}.png`;
    link.href = dataUrl;
    link.click();
  };

  const exportJpg = async () => {
    const el = document.querySelector("[data-menu-preview]") as HTMLElement;
    if (!el) return;
    const dataUrl = await toJpeg(el, { ...baseOptions(), quality: 0.95 });
    const link = document.createElement("a");
    link.download = `${menu?.title || "menu"}.jpg`;
    link.href = dataUrl;
    link.click();
  };

  const exportPdf = async () => {
    const el = document.querySelector("[data-menu-preview]") as HTMLElement;
    if (!el) return;
    const dataUrl = await toPng(el, baseOptions());
    const pdf = new jsPDF("p", "mm", "a4");
    const pageW = 210;
    const pageH = 297;
    const margin = 0;
    const maxW = pageW;
    const maxH = pageH;
    const ratio = el.scrollWidth / el.scrollHeight;
    let imgW = maxW;
    let imgH = imgW / ratio;
    if (imgH > maxH) {
      imgH = maxH;
      imgW = imgH * ratio;
    }
    const x = (pageW - imgW) / 2;
    const y = (pageH - imgH) / 2;
    pdf.addImage(dataUrl, "PNG", x, y, imgW, imgH);
    pdf.save(`${menu?.title || "menu"}.pdf`);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-7 sm:h-8 w-48 sm:w-56" />
            <Skeleton className="h-4 w-28 sm:w-32" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Skeleton className="h-8 w-14 sm:w-16 rounded-md" />
            <Skeleton className="h-8 w-14 sm:w-16 rounded-md" />
            <Skeleton className="h-8 w-14 sm:w-16 rounded-md" />
            <Skeleton className="h-8 w-16 sm:w-20 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-[400px] sm:h-[600px] w-full rounded-lg" />
      </div>
    );
  }

  if (!menu) return null;

  const PreviewComponent = templates[menu.template]?.component;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{menu.title}</h1>
          <p className="text-sm text-muted-foreground">
            {menu.items.length} {menu.items.length === 1 ? "item" : "items"}
            <span className="mx-2">&middot;</span>
            {templates[menu.template]?.name} template
          </p>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          <Button variant="outline" size="sm" onClick={exportPng}>
            <Image className="h-4 w-4" weight="bold" />
            PNG
          </Button>
          <Button variant="outline" size="sm" onClick={exportJpg}>
            <FileImage className="h-4 w-4" weight="bold" />
            JPG
          </Button>
          <Button variant="outline" size="sm" onClick={exportPdf}>
            <FilePdf className="h-4 w-4" weight="bold" />
            PDF
          </Button>
          <Button variant="default" size="sm" onClick={() => navigate(`/menu/${id}/edit`)}>
            <PencilSimple className="h-4 w-4" weight="bold" />
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={() => {
            const url = `${window.location.origin}/public/menu/${id}`;
            navigator.clipboard.writeText(url);
            setLinkCopied(true);
          }}>
            <LinkIcon className="h-4 w-4" weight="bold" />
            Copy Link
          </Button>
        </div>
      </div>
      
      <div ref={captureRef} className="w-full rounded-lg bg-white border border-border bg-background shadow-sm">
        <AutoScale className="p-8 min-h-[600px]">
          <div data-menu-preview>
            <PreviewComponent title={menu.title} items={menu.items} />
          </div>
        </AutoScale>
      </div>

      <Dialog open={linkCopied} onOpenChange={setLinkCopied}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Link Copied!</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Public link has been copied to clipboard. Anyone with this link can view your menu.
          </p>
          <div className="flex justify-end pt-2">
            <Button size="sm" onClick={() => setLinkCopied(false)}>OK</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
