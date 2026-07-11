import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { ForkKnife, Sun, Moon, User, SignOut, Trash } from "@phosphor-icons/react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("dark-mode");
    if (stored !== null) return stored === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("dark-mode", String(dark));
  }, [dark]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate("/auth/login");
  };

  return (
    <nav className="border-b bg-card sticky top-0 z-50">
      <div className="flex h-14 items-center px-3 sm:px-4 gap-2 sm:gap-4 max-w-6xl mx-auto">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold tracking-tight shrink-0">
          <ForkKnife className="h-5 w-5" weight="fill" /> <span className="hidden sm:inline">MenuGenerator</span>
        </Link>
        <div className="flex-1 min-w-0" />
        {user && (
          <div className="flex items-center gap-1 sm:gap-3">
            <Link to="/trash">
              <Button variant="ghost" size="icon" title="Trash">
                <Trash className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setDark(!dark)} title={dark ? "Light mode" : "Dark mode"}>
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <div ref={menuRef} className="relative">
              <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)} title="Account">
                <User className="h-4 w-4" />
              </Button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border bg-card shadow-lg p-1.5">
                  <div className="px-3 py-2 text-sm font-medium truncate border-b border-border/50 mb-1">
                    {user.username}
                  </div>
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                    <SignOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
