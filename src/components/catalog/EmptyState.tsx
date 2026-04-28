import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
  linkHref?: string;
  linkLabel?: string;
}

export default function EmptyState({
  title = "Товары не найдены",
  description = "Попробуйте изменить параметры фильтров или сбросить их",
  linkHref = "/catalog",
  linkLabel = "Сбросить фильтры",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center rounded-lg border border-[#e3dfd6] bg-[#f4f2eb] shadow-[0_4px_24px_-12px_rgba(0,0,0,0.35)] max-w-md mx-auto">
      <svg
        className="w-16 h-16 text-[#c8c2b8] mb-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
        <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
        <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
      </svg>

      <h3
        className="text-xl font-bold text-[#2a2622] mb-2"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        {title}
      </h3>

      <p className="text-[#5a5048] text-sm mb-6 max-w-xs">{description}</p>

      <Link
        href={linkHref}
        className="px-6 py-3 bg-[#5c7a3e] hover:bg-[#6b8f47] text-white text-sm uppercase tracking-widest font-semibold transition-colors"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        {linkLabel}
      </Link>
    </div>
  );
}
