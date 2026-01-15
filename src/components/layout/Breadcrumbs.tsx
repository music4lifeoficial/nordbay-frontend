"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/useTranslation";

export function Breadcrumbs({ className }: { className?: string }) {
  const t = useTranslation();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  const crumbs = segments.map((seg, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    // Optionally, you can prettify segment names here
    const label = decodeURIComponent(seg)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return { href, label };
  });

  return (
    <nav className={cn("flex items-center text-sm text-nordic-500 gap-1", className)} aria-label="Breadcrumb">
      <Link href="/" className="hover:text-brand-600 font-medium">{t?.common?.home || 'Home'}</Link>
      {crumbs.map((crumb, idx) => (
        <span key={crumb.href} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-1 text-nordic-300" />
          {idx === crumbs.length - 1 ? (
            <span className="text-nordic-700 font-semibold truncate max-w-[120px]">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-brand-600 truncate max-w-[120px]">{crumb.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
