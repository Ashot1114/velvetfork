import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged in successfully");
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-[5%]">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="font-sans text-[0.72rem] tracking-[0.25em] uppercase text-primary mb-2">Management</p>
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-foreground">Admin Login</h1>
        </div>

        <form onSubmit={handleLogin} className="bg-muted border border-primary/20 p-8 space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
              placeholder="admin@velvetfork.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full font-sans text-[0.78rem] font-medium tracking-[0.18em] uppercase px-10 py-4 bg-primary text-primary-foreground transition-all hover:bg-primary-light disabled:opacity-50"
            style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
