import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { EnvelopeSimple, LockKey, Eye, EyeSlash } from "@phosphor-icons/react";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-xs font-medium">Email</Label>
        <div className="relative">
          <EnvelopeSimple className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" weight="regular" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
            className="h-10 pl-9 text-sm"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-xs font-medium">Password</Label>
        <div className="relative">
          <LockKey className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" weight="regular" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="h-10 pl-9 pr-9 text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeSlash className="h-4 w-4" weight="regular" /> : <Eye className="h-4 w-4" weight="regular" />}
          </button>
        </div>
      </div>
      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2">
          <p className="text-xs text-destructive font-medium">{error}</p>
        </div>
      )}
      <Button type="submit" className="w-full h-10" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>
      <p className="text-sm text-center text-muted-foreground">
        Don't have an account?
        <Link to="/auth/register" className="text-primary font-semibold hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}
