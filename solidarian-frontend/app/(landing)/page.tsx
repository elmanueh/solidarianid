import { Button } from '@/components/ui';
import logoSolidarian from '@/public/solidarian-logo.png';
import { IconBolt, IconGlobe, IconHeart, IconShieldCheck, IconTrendingUp, IconUsersGroup } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-500">
        <nav className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Image src={logoSolidarian} alt="SolidarianID Logo" className="h-10 w-10" />
            <span className="hidden text-lg font-medium sm:inline">SolidarianID</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" nativeButton={false} render={<Link href="/login">Iniciar sesión</Link>} />

            <Button nativeButton={false} render={<Link href="/register">Registrarse</Link>} />
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl">Gestión profesional de impacto social</h1>
          <p className="mb-8 text-lg leading-relaxed text-gray-500 sm:text-xl">
            Organiza comunidades, impulsa causas y ejecuta acciones con resultados tangibles y medibles.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 text-white transition-colors hover:bg-blue-700"
            >
              <IconBolt className="h-5 w-5" />
              Crear cuenta gratis
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-8 py-3 text-gray-700 transition-colors hover:border-gray-400"
            >
              Conocer más
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl">Todo lo necesario para generar impacto real</h2>
          <p className="mx-auto max-w-2xl text-gray-500">
            Una plataforma completa y profesional diseñada para organizaciones que buscan resultados tangibles.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-primary/30 p-6 transition-colors hover:border-blue-600">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <IconUsersGroup className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2">Gestión de comunidades</h3>
            <p className="text-gray-500">
              Organiza y administra múltiples comunidades con roles diferenciados y permisos granulares.
            </p>
          </div>

          <div className="rounded-xl border border-primary/30 p-6 transition-colors hover:border-green-600">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <IconHeart className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2">Causas con propósito</h3>
            <p className="text-gray-500">
              Crea y gestiona causas con objetivos claros, métricas definidas y seguimiento continuo.
            </p>
          </div>

          <div className="rounded-xl border border-primary/30 p-6 transition-colors hover:border-orange-600">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
              <IconBolt className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="mb-2">Acciones ejecutables</h3>
            <p className="text-gray-500">
              Define acciones concretas, asigna responsables y mide el impacto de cada iniciativa.
            </p>
          </div>

          <div className="rounded-xl border border-primary/30 p-6 transition-colors hover:border-blue-600">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <IconTrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2">Métricas de impacto</h3>
            <p className="text-gray-500">Visualiza el progreso con reportes detallados sobre resultados tangibles.</p>
          </div>

          <div className="rounded-xl border border-primary/30 p-6 transition-colors hover:border-green-600">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <IconShieldCheck className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2">Transparencia total</h3>
            <p className="text-gray-500">
              Cada acción, decisión y resultado queda registrado para garantizar la transparencia.
            </p>
          </div>

          <div className="rounded-xl border border-primary/30 p-6 transition-colors hover:border-orange-600">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
              <IconGlobe className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="mb-2">Colaboración efectiva</h3>
            <p className="text-gray-500">
              Facilita la coordinación entre miembros con herramientas de comunicación y gestión integradas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl">Cómo funciona</h2>
            <p className="mx-auto max-w-2xl text-gray-500">
              Un proceso simple y efectivo para maximizar tu impacto social.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl text-white">
                1
              </div>
              <h3 className="mb-2">Crea tu comunidad</h3>
              <p className="text-gray-500">Define tu organización, invita miembros y establece roles y permisos.</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-2xl text-white">
                2
              </div>
              <h3 className="mb-2">Define causas</h3>
              <p className="text-gray-500">Establece objetivos claros, métricas de éxito y planifica estrategias.</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 text-2xl text-white">
                3
              </div>
              <h3 className="mb-2">Ejecuta y mide</h3>
              <p className="text-gray-500">Implementa acciones concretas y visualiza el impacto en tiempo real.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="rounded-2xl bg-linear-to-r from-blue-600 to-green-600 p-8 text-center text-white sm:p-12">
          <h2 className="mb-4 text-3xl sm:text-4xl">Comienza a generar impacto hoy</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            Únete a las organizaciones que están transformando comunidades con resultados medibles y transparentes.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 text-blue-600 transition-colors hover:bg-gray-100"
          >
            Crear cuenta gratis
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-500 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <IconHeart className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium">SolidarianID</span>
            </div>
            <p className="text-sm text-gray-500">© 2026 SolidarianID. Gestión profesional de impacto social.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
