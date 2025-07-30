"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/lib/useTranslation";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useToast } from "@/hooks/useToast";
import { Alert } from "@/components/ui/Alert";

export default function LoginForm() {
  const t = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { login } = useAuthStore();
  const showToast = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setIsLoading(true);
    if (!email || !password) {
      setFormError(t.login?.missingFields ?? "Por favor completa todos los campos.");
      setIsLoading(false);
      return;
    }
    try {
      await login({ email, password });
      showToast(t.login.success, "success");
      router.push("/dashboard2");
    } catch (err) {
      setFormError(t.login.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    showToast("Redirigiendo a Google...", "success");
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, "_self");
  };
  const handleFacebookLogin = () => {
    showToast("Redirigiendo a Facebook...", "success");
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`, "_self");
  };
  const handleMitIDLogin = async () => {
    showToast("Redirigiendo a MitID...", "success");
    try {
      const url = await useAuthStore.getState().initiateMitIDVerification();
      window.open(url, "_self");
    } catch (e) {
      showToast("Error iniciando MitID", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nordic-50 to-white px-4">
      <div className="w-full max-w-md">
        {/* Branding & Slogan */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-nordic-600 to-nordic-700 rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl font-bold text-white">N</span>
          </div>
          <h1 className="text-3xl font-bold text-nordic-900 mb-1">{t.login.title}</h1>
          <p className="text-nordic-600 mb-2">{t.login.subcopy}</p>
          <span className="block text-xs text-nordic-500 italic mb-2">{t.hero.slogan}</span>
        </div>
        {/* Motivational message */}
        <div className="bg-nordic-50 border border-nordic-100 rounded-lg p-3 mb-4 text-center text-nordic-700 text-sm shadow-sm">
          {t.login.motivation}
        </div>
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulario de inicio de sesión">
          {formError && <Alert type="error" message={formError} className="mb-4" />}
          <div className="bg-white rounded-xl shadow-sm border border-nordic-200 p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-nordic-700 mb-2">Correo electrónico</label>
                <label htmlFor="email" className="block text-sm font-medium text-nordic-700 mb-2">{t.login.emailLabel}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-nordic-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-nordic-300 rounded-lg focus:ring-2 focus:ring-nordic-500 focus:border-nordic-500 transition-colors"
                    placeholder={t.login.emailPlaceholder}
                    required
                    autoFocus
                    autoComplete="email"
                    aria-required="true"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-nordic-700 mb-2">Contraseña</label>
                <label htmlFor="password" className="block text-sm font-medium text-nordic-700 mb-2">{t.login.passwordLabel}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-nordic-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-nordic-300 rounded-lg focus:ring-2 focus:ring-nordic-500 focus:border-nordic-500 transition-colors"
                    placeholder={t.login.passwordPlaceholder}
                    required
                    autoComplete="current-password"
                    aria-required="true"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? t.login.hidePassword : t.login.showPassword}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    tabIndex={0}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-nordic-400 hover:text-nordic-600 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-nordic-400 hover:text-nordic-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Link href="/auth/forgot-password" className="text-sm text-nordic-600 hover:text-nordic-800 transition-colors">
                {t.login.forgotPassword}
              </Link>
            </div>
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full mt-6 bg-gradient-to-r from-nordic-600 to-nordic-700 text-white py-3 px-4 rounded-lg font-medium hover:from-nordic-700 hover:to-nordic-800 focus:ring-2 focus:ring-nordic-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              aria-label={t.login.submitAria}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {t.login.submit}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
        {/* Divider & Social Login */}
        <div className="mt-8 space-y-3">
          <div className="relative" aria-label="O accede con">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-nordic-200" />
            </div>
            <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-nordic-600">{t.login.orContinueWith}</span>
            </div>
          </div>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-nordic-200 rounded-lg py-3 bg-white hover:bg-nordic-50 transition-colors"
            aria-label={t.login.googleAria || "Iniciar sesión con Google"}
            onClick={handleGoogleLogin}
            tabIndex={0}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.41c-.23 1.25-.93 2.31-1.98 3.01v2.5h3.2c1.87-1.73 2.97-4.28 2.97-7.3z" fill="#4285F4"/><path d="M10 20c2.7 0 4.97-.89 6.63-2.41l-3.2-2.5c-.89.6-2.02.96-3.43.96-2.64 0-4.88-1.78-5.68-4.18H1.01v2.62A9.99 9.99 0 0010 20z" fill="#34A853"/><path d="M4.32 12.37A5.99 5.99 0 013.67 10c0-.82.15-1.62.41-2.37V5.01H1.01A9.99 9.99 0 000 10c0 1.64.39 3.19 1.01 4.56l3.31-2.19z" fill="#FBBC05"/><path d="M10 4.04c1.47 0 2.8.51 3.84 1.51l2.88-2.88C14.97 1.07 12.7 0 10 0A9.99 9.99 0 001.01 5.01l3.31 2.62C5.12 6.82 7.36 4.04 10 4.04z" fill="#EA4335"/></g></svg>
            Google
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-nordic-200 rounded-lg py-3 bg-white hover:bg-nordic-50 transition-colors"
            aria-label={t.login.facebookAria || "Iniciar sesión con Facebook"}
            onClick={handleFacebookLogin}
            tabIndex={0}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="#1877F3"/><path d="M13.5 10.5H11V17H8.5V10.5H7V8.5h1.5V7.5c0-1.1.9-2 2-2h2v2h-2c-.28 0-.5.22-.5.5v1h2.5l-.5 2z" fill="#fff"/></svg>
            Facebook
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-nordic-200 rounded-lg py-3 bg-white hover:bg-nordic-50 transition-colors"
            aria-label={t.login.mitidAria || "Iniciar sesión con MitID"}
            onClick={handleMitIDLogin}
            tabIndex={0}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="#2563eb"/><text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Arial" dy=".3em">MitID</text></svg>
            MitID
          </button>
          <div className="text-xs text-nordic-500 text-center mt-2">No compartimos datos sin tu permiso. Acceso rápido y seguro.</div>
          <div className="text-xs text-nordic-500 text-center mt-2">{t.login.privacyNote}</div>
        </div>
        {/* Register & Legal Links */}
        <div className="text-center mt-6">
          <p className="text-nordic-600">
            {t.login.noAccount} <Link href="/auth/register" className="font-medium text-nordic-700 hover:text-nordic-900 transition-colors">{t.login.registerHere}</Link>
          </p>
        </div>
        <div className="text-center mt-4 text-xs text-nordic-500">
          <Link href="/legal/terms" className="underline hover:text-nordic-700">{t.login.terms}</Link> &nbsp;|&nbsp;
          <Link href="/legal/privacy" className="underline hover:text-nordic-700">{t.login.privacy}</Link>
        </div>
        {/* Footer */}
        <div className="text-center mt-8 text-xs text-nordic-500">
          <hr className="mb-3 opacity-20" />
          <p>{t.login.copyright}</p>
        </div>
      </div>
    </div>
  );
}
