import { Home, Search, PlusCircle, Heart, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/search', icon: Search, label: 'Search' },
  { href: '/create', icon: PlusCircle, label: 'Sell' },
  { href: '/favorites', icon: Heart, label: 'Likes' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-nordic-200 z-50">
      <div className="grid grid-cols-5 h-16">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center text-xs transition-colors',
                isActive ? 'text-brand-600' : 'text-nordic-400 hover:text-nordic-600'
              )}
            >
              <Icon className={cn('h-5 w-5 mb-1', isActive && 'fill-current')} />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
