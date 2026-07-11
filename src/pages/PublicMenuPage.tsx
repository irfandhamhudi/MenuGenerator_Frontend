import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { templates } from "../templates";
import AutoScale from "../components/menu/AutoScale";
import { toPng, toJpeg } from "html-to-image";
import jsPDF from "jspdf";
import { Button } from "../components/ui/button";
import { ForkKnife, Image, FileImage, FilePdf } from "@phosphor-icons/react";
import { Skeleton } from "../components/ui/skeleton";
import type { Menu } from "../types";
import api from "../services/api";

export default function PublicMenuPage() {
  const { id } = useParams();
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await api.get(`/public/menus/${id}`);
        setMenu(res.data.menu);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const exportPng = async () => {
    const el = document.querySelector("[data-menu-preview]") as HTMLElement;
    if (!el) return;
    const dataUrl = await toPng(el, { pixelRatio: 3, cacheBust: true, onclone: (doc: Document) => {
      const cloned = doc.querySelector("[data-menu-preview]") as HTMLElement;
      if (cloned) { cloned.style.opacity = "1"; cloned.style.position = "static"; cloned.style.visibility = "visible"; cloned.style.width = "800px"; }
    } } as any);
    const link = document.createElement("a");
    link.download = `${menu?.title || "menu"}.png`; link.href = dataUrl; link.click();
  };

  const exportJpg = async () => {
    const el = document.querySelector("[data-menu-preview]") as HTMLElement;
    if (!el) return;
    const dataUrl = await toJpeg(el, { pixelRatio: 3, quality: 0.95, cacheBust: true } as any);
    const link = document.createElement("a");
    link.download = `${menu?.title || "menu"}.jpg`; link.href = dataUrl; link.click();
  };

  const exportPdf = async () => {
    const el = document.querySelector("[data-menu-preview]") as HTMLElement;
    if (!el) return;
    const dataUrl = await toPng(el, { pixelRatio: 3, cacheBust: true } as any);
    const pdf = new jsPDF("p", "mm", "a4");
    const maxW = 210; const maxH = 297;
    const ratio = el.scrollWidth / el.scrollHeight;
    let imgW = maxW; let imgH = imgW / ratio;
    if (imgH > maxH) { imgH = maxH; imgW = imgH * ratio; }
    pdf.addImage(dataUrl, "PNG", (maxW - imgW) / 2, (maxH - imgH) / 2, imgW, imgH);
    pdf.save(`${menu?.title || "menu"}.pdf`);
  };

  if (loading) return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16 rounded-md" />
            <Skeleton className="h-8 w-16 rounded-md" />
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-[600px] w-full rounded-lg" />
      </div>
    </div>
  );

  if (notFound) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <ForkKnife className="h-12 w-12 text-muted-foreground/30 mx-auto" weight="light" />
        <h1 className="text-xl font-semibold tracking-tight">Menu not found</h1>
        <p className="text-sm text-muted-foreground">This menu may have been deleted or the link is invalid.</p>
      </div>
    </div>
  );

  if (!menu) return null;

  const PreviewComponent = templates[menu.template]?.component;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{menu.title}</h1>
            <p className="text-sm text-muted-foreground">{menu.items.length} items &middot; {templates[menu.template]?.name}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportPng}><Image className="h-4 w-4" /> PNG</Button>
            <Button variant="outline" size="sm" onClick={exportJpg}><FileImage className="h-4 w-4" /> JPG</Button>
            <Button variant="outline" size="sm" onClick={exportPdf}><FilePdf className="h-4 w-4" /> PDF</Button>
          </div>
        </div>

        <div className="w-full rounded-lg border bg-white">
          <AutoScale className="p-8 min-h-[600px]">
            <div data-menu-preview>
              <PreviewComponent title={menu.title} items={menu.items} />
            </div>
          </AutoScale>
        </div>
      </div>
    </div>
  );
}
