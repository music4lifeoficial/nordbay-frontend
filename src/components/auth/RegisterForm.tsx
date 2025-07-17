'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useToast } from '@/hooks/useToast';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    name: '',
    phone: '',
    address: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuthStore();
  const showToast = useToast();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      showToast("Las contraseñas no coinciden.", "error");
      return false;
    }

    if (formData.password.length < 8) {
      showToast("La contraseña debe tener al menos 8 caracteres.", "error");
      return false;
    }

    if (!formData.acceptTerms) {
      showToast("Debes aceptar los términos y condiciones.", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      await register({
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        accept_terms: formData.acceptTerms
      });
      showToast("¡Cuenta creada exitosamente! Ya puedes iniciar sesión con tu nueva cuenta.", "success");
      router.push('/auth/login');
    } catch (error) {
      showToast("No se pudo crear la cuenta. Intenta nuevamente.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nordic-50 to-white px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo y Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-nordic-600 to-nordic-700 rounded-2xl mb-6 shadow-lg">
            <span className="text-2xl font-bold text-white">N</span>
          </div>
          <h1 className="text-3xl font-bold text-nordic-900 mb-2">
            Únete a NordBay
          </h1>
          <p className="text-nordic-600">
            Crea tu cuenta para empezar a comprar y vender
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-nordic-200 p-6">
            <div className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-nordic-700 mb-2">
                  Correo electrónico *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-nordic-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-nordic-300 rounded-lg focus:ring-2 focus:ring-nordic-500 focus:border-nordic-500 transition-colors"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              {/* Nickname */}
              <div>
                <label htmlFor="nickname" className="block text-sm font-medium text-nordic-700 mb-2">
                  Nombre de usuario *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-nordic-400" />
                  </div>
                  <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    value={formData.nickname}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-nordic-300 rounded-lg focus:ring-2 focus:ring-nordic-500 focus:border-nordic-500 transition-colors"
                    placeholder="tu_usuario"
                    required
                  />
                </div>
              </div>

              {/* Nombre completo */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-nordic-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 border border-nordic-300 rounded-lg focus:ring-2 focus:ring-nordic-500 focus:border-nordic-500 transition-colors"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-nordic-700 mb-2">
                  Teléfono *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-nordic-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-nordic-300 rounded-lg focus:ring-2 focus:ring-nordic-500 focus:border-nordic-500 transition-colors"
                    placeholder="+45 12 34 56 78"
                    required
                  />
                </div>
              </div>

              {/* Dirección */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-nordic-700 mb-2">
                  Dirección *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-nordic-400" />
                  </div>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-nordic-300 rounded-lg focus:ring-2 focus:ring-nordic-500 focus:border-nordic-500 transition-colors"
                    placeholder="Tu dirección completa"
                    required
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-nordic-700 mb-2">
                  Contraseña *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-nordic-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-12 py-3 border border-nordic-300 rounded-lg focus:ring-2 focus:ring-nordic-500 focus:border-nordic-500 transition-colors"
                    placeholder="Mínimo 8 caracteres"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-nordic-400 hover:text-nordic-600 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-nordic-400 hover:text-nordic-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirmar Contraseña */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-nordic-700 mb-2">
                  Confirmar contraseña *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-nordic-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-12 py-3 border border-nordic-300 rounded-lg focus:ring-2 focus:ring-nordic-500 focus:border-nordic-500 transition-colors"
                    placeholder="Repite tu contraseña"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-nordic-400 hover:text-nordic-600 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-nordic-400 hover:text-nordic-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Términos y condiciones */}
              <div className="flex items-start space-x-3 pt-2">
                <div className="flex items-center h-5">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-nordic-600 focus:ring-nordic-500 border-nordic-300 rounded"
                    required
                  />
                </div>
                <div className="text-sm">
                  <label htmlFor="acceptTerms" className="text-nordic-700">
                    Acepto los{' '}
                    <Link href="/terms" className="text-nordic-600 hover:text-nordic-800 underline">
                      términos y condiciones
                    </Link>
                    {' '}y la{' '}
                    <Link href="/privacy" className="text-nordic-600 hover:text-nordic-800 underline">
                      política de privacidad
                    </Link>
                  </label>
                </div>
              </div>
            </div>

            {/* Botón de Registro */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-gradient-to-r from-nordic-600 to-nordic-700 text-white py-3 px-4 rounded-lg font-medium hover:from-nordic-700 hover:to-nordic-800 focus:ring-2 focus:ring-nordic-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Crear cuenta
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Enlace a Login */}
        <div className="text-center mt-6">
          <p className="text-nordic-600">
            ¿Ya tienes una cuenta?{' '}
            <Link 
              href="/auth/login" 
              className="font-medium text-nordic-700 hover:text-nordic-900 transition-colors"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-nordic-500">
          <p>© 2025 NordBay. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}
