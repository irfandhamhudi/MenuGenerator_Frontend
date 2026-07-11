import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMenus } from "../services/api";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Plus, PencilSimple, Eye, MagnifyingGlass } from "@phosphor-icons/react";
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
export default function DashboardPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => { loadMenus(); }, []);
  const loadMenus = async () => {
    try {
      const res = await getMenus();
      setMenus(res.menus);
    } catch { navigate("/auth/login"); }
    finally { setLoading(false); }
  };
  const filtered = useMemo(() => {
    if (!search.trim()) return menus;
    const q = search.toLowerCase();
    return menus.filter(m => m.title.toLowerCase().includes(q) || templateNames[m.template]?.toLowerCase().includes(q));
  }, [menus, search]);
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Menus</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {menus.length} saved {menus.length === 1 ? "menu" : "menus"}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {menus.length > 0 && (
            <>
              <div className="relative flex-1 sm:flex-none">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" weight="regular" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full sm:w-52 h-9 pl-9 pr-3 text-sm rounded-md border border-primary/30 bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              <Link to="/menu/new">
                <Button size="sm"><Plus className="h-4 w-4" weight="bold" /> New</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {menus.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6">
              <Plus className="h-8 w-8 text-muted-foreground" weight="light" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight mb-2">No menus yet</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">Create your first menu to start building beautiful, printable menus in minutes.</p>
            <Link to="/menu/new"><Button size="lg" className="gap-2"><Plus className="h-5 w-5" weight="bold" /> Create Your First Menu</Button></Link>
          </CardContent>
        </Card>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
          <MagnifyingGlass className="h-16 w-16 text-muted-foreground/20" weight="light" />
          <p className="text-muted-foreground text-base font-medium">No menus match your search</p>
          <p className="text-sm text-muted-foreground/60">Try using different keywords or check the spelling</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((menu) => {
            const preview = templates[menu.template]?.component;
            return (
              <Card key={menu._id} className="group overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="aspect-4/3 bg-muted overflow-hidden relative group/image">
                  {preview && (
                    <div className="absolute inset-0 flex items-start justify-center overflow-hidden pointer-events-none">
                      <div className="w-[800px] h-[800px] shrink-0 scale-45 origin-top">
                        {preview({ title: menu.title, items: menu.items.slice(0, 6) })}
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
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/menu/${menu._id}/edit`)}>
                      <PencilSimple className="h-3.5 w-3.5" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/menu/${menu._id}/preview`)}>
                      <Eye className="h-3.5 w-3.5" /> Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
