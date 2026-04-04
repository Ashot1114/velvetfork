import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuthModal } from "@/contexts/AuthModalContext";

const AuthModal = () => {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const { t } = useLanguage();
  const { isOpen, closeAuthModal } = useAuthModal();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t("auth.loginSuccess"));
      closeAuthModal();
      resetForm();
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
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
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { phone } } });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t("auth.registerSuccess"));
      closeAuthModal();
      resetForm();
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t("auth.resetEmailSent"));
      setOtpMode(true);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) {
      toast.error(t("auth.otpLength"));
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: "recovery",
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t("auth.otpVerified"));
      closeAuthModal();
      resetForm();
      navigate("/reset-password?verified=true");
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhone("");
    setShowPassword(false);
    setShowConfirm(false);
    setForgotMode(false);
  };

  const inputClass = "w-full bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors placeholder:text-muted-foreground";

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeAuthModal} />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-background border border-border animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center pt-8 pb-4 px-8">
          <p className="font-sans text-[0.72rem] tracking-[0.25em] uppercase text-primary mb-2">
            {t("auth.welcome")}
          </p>
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-light text-foreground">
            Velvet Fork
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mx-8">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-3 text-[0.72rem] tracking-[0.18em] uppercase transition-colors ${
              tab === "login"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("auth.signIn")}
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 py-3 text-[0.72rem] tracking-[0.18em] uppercase transition-colors ${
              tab === "register"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("auth.signUp")}
          </button>
        </div>

        {/* Form */}
        {forgotMode ? (
          <form onSubmit={handleForgotPassword} className="p-8 space-y-5">
            <p className="text-sm text-muted-foreground">{t("auth.forgotDesc")}</p>
            <div className="flex flex-col gap-2">
              <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">
                {t("auth.email")}
              </label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder={t("contact.yourEmail")} />
            </div>
            <button type="submit" disabled={loading} className="w-full font-sans text-[0.78rem] font-medium tracking-[0.18em] uppercase px-10 py-4 bg-primary text-primary-foreground transition-all hover:bg-primary-light disabled:opacity-50" style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}>
              {loading ? t("auth.sending") : t("auth.sendResetLink")}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              <button type="button" onClick={() => setForgotMode(false)} className="text-primary hover:underline">
                {t("auth.backToLogin")}
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={tab === "login" ? handleLogin : handleRegister} className="p-8 space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">
                {t("auth.email")}
              </label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder={t("contact.yourEmail")} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">
                {t("auth.password")}
              </label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputClass} pr-10`} placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {tab === "login" && (
                <button type="button" onClick={() => setForgotMode(true)} className="text-xs text-primary hover:underline self-end mt-1">
                  {t("auth.forgotPassword")}
                </button>
              )}
            </div>

            {tab === "register" && (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">
                    {t("auth.phone")}
                  </label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="+1 (555) 000-0000" />
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
              </>
            )}

            <button type="submit" disabled={loading} className="w-full font-sans text-[0.78rem] font-medium tracking-[0.18em] uppercase px-10 py-4 bg-primary text-primary-foreground transition-all hover:bg-primary-light disabled:opacity-50" style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}>
              {loading
                ? (tab === "login" ? t("auth.signingIn") : t("auth.signingUp"))
                : (tab === "login" ? t("auth.signIn") : t("auth.signUp"))
              }
            </button>

            <p className="text-center text-xs text-muted-foreground">
              {tab === "login" ? t("auth.noAccount") : t("auth.hasAccount")}{" "}
              <button type="button" onClick={() => setTab(tab === "login" ? "register" : "login")} className="text-primary hover:underline">
                {tab === "login" ? t("auth.signUp") : t("auth.signIn")}
              </button>
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[0.68rem] tracking-[0.15em] uppercase text-muted-foreground">{t("auth.or")}</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Google Sign-In */}
            <button
              type="button"
              onClick={async () => {
                setLoading(true);
                try {
                  const result = await lovable.auth.signInWithOAuth("google", {
                    redirect_uri: window.location.origin,
                  });
                  if (result.error) {
                    toast.error(String(result.error));
                  } else if (!result.redirected) {
                    toast.success(t("auth.loginSuccess"));
                    closeAuthModal();
                    resetForm();
                  }
                } catch (e) {
                  toast.error("Google sign-in failed");
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-muted border border-border text-foreground font-sans text-sm font-medium transition-all hover:bg-accent disabled:opacity-50"
            >
              <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.003 24.003 0 0 0 0 21.56l7.98-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              {t("auth.continueWithGoogle")}
            </button>

            {/* Apple Sign-In */}
            <button
              type="button"
              onClick={async () => {
                setLoading(true);
                try {
                  const result = await lovable.auth.signInWithOAuth("apple", {
                    redirect_uri: window.location.origin,
                  });
                  if (result.error) {
                    toast.error(String(result.error));
                  } else if (!result.redirected) {
                    toast.success(t("auth.loginSuccess"));
                    closeAuthModal();
                    resetForm();
                  }
                } catch (e) {
                  toast.error("Apple sign-in failed");
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-foreground text-background font-sans text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              {t("auth.continueWithApple")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
