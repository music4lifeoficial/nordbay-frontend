import Link from 'next/link';
import { Home, Search, PlusCircle, Heart, User, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, label: 'Inicio' },
  { href: '/search', icon: Search, label: 'Buscar' },
  { href: '/create', icon: PlusCircle, label: 'Vender' },
  { href: '/favorites', icon: Heart, label: 'Favoritos' },
  { href: '/profile', icon: User, label: 'Perfil' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex flex-col h-full w-64 bg-white border-r border-nordic-200 py-8 px-4 space-y-4 shadow-sm">
      <nav className="flex-1 space-y-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-nordic-700 hover:bg-nordic-100 transition',
                isActive && 'bg-nordic-100 font-semibold text-brand-600'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-nordic-500 hover:bg-nordic-100 transition text-sm">
        <LogOut className="h-4 w-4" />
        Cerrar sesión
      </button>
    </aside>
  );
}
