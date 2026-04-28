"use client";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  /** Светлая плашка на тёмной странице поиска */
  variant?: "dark" | "light";
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Искать товар по названию или категории…",
  autoFocus,
  variant = "dark",
}: SearchInputProps) {
  const light = variant === "light";
  return (
    <div
      className={
        light
          ? "relative flex items-center gap-3 rounded-lg border border-[#e3dfd6] bg-[#f4f2eb] px-4 py-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.3)]"
          : "relative flex items-center gap-3 border-b border-[#2a2a2a] pb-3"
      }
    >
      <svg
        className={`w-5 h-5 shrink-0 ${light ? "text-[#8a8278]" : "text-[#6b6055]"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        className={
          light
            ? "flex-1 min-w-0 bg-transparent text-lg text-[#2a2622] placeholder:text-[#9a9080] focus:outline-none"
            : "flex-1 min-w-0 bg-transparent text-lg text-[#f0ece4] placeholder:text-[#6b6055] focus:outline-none"
        }
      />
      {value.length > 0 && (
        <button
          type="button"
          aria-label="Очистить"
          className={
            light
              ? "shrink-0 p-1 rounded text-[#8a8278] hover:text-[#2a2622] hover:bg-[#ebe7df] transition-colors"
              : "shrink-0 p-1 rounded text-[#6b6055] hover:text-[#f0ece4] hover:bg-[#1a1a1a] transition-colors"
          }
          onClick={() => onChange("")}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
