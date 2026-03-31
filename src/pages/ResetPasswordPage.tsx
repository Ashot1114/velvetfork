import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setValid(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(t("auth.passwordMismatch"));
      return;
    }
    if (password.length < 6) {
      toast.error(t("auth.passwordMin"));
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t("auth.passwordResetSuccess"));
      navigate("/");
    }
  };

  const inputClass = "w-full bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors placeholder:text-muted-foreground";

  if (!valid) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{t("auth.invalidResetLink")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-background border border-border p-8">
        <h2 className="font-serif text-2xl font-light text-foreground mb-6 text-center">
          {t("auth.resetPassword")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">
              {t("auth.newPassword")}
            </label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputClass} pr-10`} placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">
              {t("auth.confirmPassword")}
            </label>
            <div className="relative">
              <input type={showConfirm ? "text" : "password"} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`${inputClass} pr-10`} placeholder="••••••••" />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full font-sans text-[0.78rem] font-medium tracking-[0.18em] uppercase px-10 py-4 bg-primary text-primary-foreground transition-all hover:bg-primary-light disabled:opacity-50">
            {loading ? t("password.updating") : t("auth.resetPassword")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
