import Header from '@/components/layout/Header';
import Link from 'next/link';
import * as React from "react";
import { ArrowRight, ShoppingBag, Shield, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-nordic-50 to-white">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="space-y-8">
              {/* Logo & Title */}
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-nordic-600 to-nordic-700 rounded-3xl mb-8 shadow-xl">
                  <span className="text-3xl font-bold text-white">N</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-nordic-900 tracking-tight">
                  NordBay
                </h1>
                <p className="text-xl md:text-2xl text-nordic-600 max-w-3xl mx-auto leading-relaxed">
                  Nordic Marketplace for Conscious Consumers
                </p>
                <p className="text-lg text-nordic-500 max-w-2xl mx-auto">
                  The Danish marketplace for authentic, quality products. 
                  Buy and sell with confidence in our trusted Nordic community.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                <Link
                  href="/auth/register"
                  className="bg-gradient-to-r from-nordic-600 to-nordic-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-nordic-700 hover:to-nordic-800 transition-all duration-200 flex items-center gap-2 shadow-lg"
                >
                  Comenzar ahora
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/auth/login"
                  className="border-2 border-nordic-300 text-nordic-700 px-8 py-4 rounded-xl font-semibold hover:bg-nordic-50 transition-all duration-200"
                >
                  Iniciar sesión
                </Link>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center px-6 py-3 bg-green-50 border border-green-200 text-green-800 rounded-full text-sm font-medium mt-8">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                ✅ Sistema conectado y funcionando
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-nordic-900 mb-4">
                ¿Por qué elegir NordBay?
              </h2>
              <p className="text-lg text-nordic-600 max-w-2xl mx-auto">
                Una plataforma diseñada para la comunidad nórdica con los más altos estándares de calidad y seguridad.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl border border-nordic-200 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-nordic-100 rounded-2xl mb-6">
                  <Shield className="w-8 h-8 text-nordic-600" />
                </div>
                <h3 className="text-xl font-semibold text-nordic-900 mb-4">Seguridad Total</h3>
                <p className="text-nordic-600">
                  Sistema de verificación de 3 niveles con integración MitID para máxima confianza en cada transacción.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl border border-nordic-200 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-nordic-100 rounded-2xl mb-6">
                  <Users className="w-8 h-8 text-nordic-600" />
                </div>
                <h3 className="text-xl font-semibold text-nordic-900 mb-4">Comunidad Local</h3>
                <p className="text-nordic-600">
                  Conecta con vendedores locales en Dinamarca. Productos auténticos de tu región con entrega rápida.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl border border-nordic-200 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-nordic-100 rounded-2xl mb-6">
                  <ShoppingBag className="w-8 h-8 text-nordic-600" />
                </div>
                <h3 className="text-xl font-semibold text-nordic-900 mb-4">Fácil de Usar</h3>
                <p className="text-nordic-600">
                  Publica, compra y vende productos en minutos con una interfaz intuitiva y soporte local.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
