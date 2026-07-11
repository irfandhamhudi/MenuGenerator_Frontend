import LoginForm from "../components/auth/LoginForm";
import MenuPreviewSVG from "../components/ui/MenuPreviewSVG";
import { ForkKnife } from "@phosphor-icons/react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/90 to-primary/40 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative text-white text-center flex flex-col items-center gap-6">
          <MenuPreviewSVG />
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">Menu Generator</h1>
            <p className="text-lg text-white/80 max-w-sm mx-auto leading-relaxed">
              Create stunning, professional menus for your restaurant or cafe in minutes.
            </p>
          </div>
          <div className="flex items-center justify-center gap-8 pt-2">
            <div className="text-center">
              <p className="text-2xl font-bold">5+</p>
              <p className="text-xs text-white/60 mt-1">Templates</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold">Free</p>
              <p className="text-xs text-white/60 mt-1">To Use</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold">PDF</p>
              <p className="text-xs text-white/60 mt-1">Export</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center lg:hidden">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
              <ForkKnife className="h-7 w-7 text-primary" weight="fill" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Menu Generator</h1>
            <p className="text-muted-foreground text-sm mt-1">Sign in to your account</p>
          </div>
          <div className="hidden lg:block text-center">
            <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground text-sm mt-1">Sign in to your account</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
