"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useToast } from '@/hooks/useToast';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuthStore();
  const showToast = useToast();
  const router = useRouter();

  // Podés tipar el evento si usás TypeScript: (e: React.FormEvent<HTMLFormElement>)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login({ email, password });
      showToast("¡Bienvenido a NordBay! Has iniciado sesión exitosamente.", "success");
      router.push('/dashboard');
    } catch (error) {
      showToast("Credenciales incorrectas. Intenta nuevamente.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nordic-50 to-white px-4">
      <div className="w-full max-w-md">
        {/* Logo y Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-nordic-600 to-nordic-700 rounded-2xl mb-6 shadow-lg">
            <span className="text-2xl font-bold text-white">N</span>
          </div>
          <h1 className="text-3xl font-bold text-nordic-900 mb-2">
            Bienvenido a NordBay
          </h1>
          <p className="text-nordic-600">
            Inicia sesión para acceder a tu cuenta
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-nordic-200 p-6">
            {/* Campo Email */}
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-nordic-700 mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-nordic-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-nordic-300 rounded-lg focus:ring-2 focus:ring-nordic-500 focus:border-nordic-500 transition-colors"
                    placeholder="tu@email.com"
                    required
                    autoFocus
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Campo Contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-nordic-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-nordic-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-nordic-300 rounded-lg focus:ring-2 focus:ring-nordic-500 focus:border-nordic-500 transition-colors"
                    placeholder="Tu contraseña"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
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

            {/* Olvidé mi contraseña */}
            <div className="flex justify-end mt-4">
              <Link 
                href="/auth/forgot-password" 
                className="text-sm text-nordic-600 hover:text-nordic-800 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Botón de Login */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full mt-6 bg-gradient-to-r from-nordic-600 to-nordic-700 text-white py-3 px-4 rounded-lg font-medium hover:from-nordic-700 hover:to-nordic-800 focus:ring-2 focus:ring-nordic-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Iniciar sesión
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Enlace a Registro */}
        <div className="text-center mt-6">
          <p className="text-nordic-600">
            ¿No tienes una cuenta?{' '}
            <Link 
              href="/auth/register" 
              className="font-medium text-nordic-700 hover:text-nordic-900 transition-colors"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-xs text-nordic-500">
          <hr className="mb-3 opacity-20" />
          <p>© 2025 NordBay. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}
