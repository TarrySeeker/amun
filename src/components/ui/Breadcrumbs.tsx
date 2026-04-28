import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Навигация"
      className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm mb-6 min-w-0"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-[#3a3a3a]">/</span>}
            {isLast || !item.href ? (
              <span className="text-[#f0ece4]">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-[#6b6055] hover:text-[#7a9e52] transition-colors"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
