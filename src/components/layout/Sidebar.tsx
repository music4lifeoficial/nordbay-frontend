import Link from 'next/link';
import { Home, Search, PlusCircle, Heart, User, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLocale } from '@/context/LocaleContext';

const navLabels = {
  da: {
    home: 'Forside',
    search: 'Søg',
    sell: 'Sælg',
    favorites: 'Favoritter',
    profile: 'Profil',
    logout: 'Log ud',
  },
  en: {
    home: 'Home',
    search: 'Search',
    sell: 'Sell',
    favorites: 'Favorites',
    profile: 'Profile',
    logout: 'Log out',
  },
};

type NavKey = 'home' | 'search' | 'sell' | 'favorites' | 'profile';
const navItems: { href: string; icon: any; key: NavKey }[] = [
  { href: '/', icon: Home, key: 'home' },
  { href: '/search', icon: Search, key: 'search' },
  { href: '/create', icon: PlusCircle, key: 'sell' },
  { href: '/favorites', icon: Heart, key: 'favorites' },
  { href: '/profile', icon: User, key: 'profile' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { locale } = useLocale();
  return (
    <aside className="flex flex-col h-full w-64 bg-white border-r border-nordic-200 py-8 px-4 space-y-4 shadow-sm">
      <nav className="flex-1 space-y-2">
        {navItems.map(({ href, icon: Icon, key }) => {
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
              <span>{navLabels[locale][key]}</span>
            </Link>
          );
        })}
      </nav>
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-nordic-500 hover:bg-nordic-100 transition text-sm">
        <LogOut className="h-4 w-4" />
        {navLabels[locale].logout}
      </button>
    </aside>
  );
}
