"use client";

import { SortOption } from "@/types";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "default", label: "По умолчанию" },
  { value: "price-asc", label: "Цена: по возрастанию" },
  { value: "price-desc", label: "Цена: по убыванию" },
  { value: "rating-desc", label: "По рейтингу" },
  { value: "new", label: "Новинки" },
];

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="sort-select"
        className="text-xs uppercase tracking-widest text-[#6b6055] whitespace-nowrap hidden sm:block"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Сортировка
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="bg-[#f4f2eb] border border-[#e3dfd6] text-[#2a2622] text-sm px-3 py-2 pr-8 appearance-none cursor-pointer shadow-sm hover:border-[#5c7a3e] focus:border-[#5c7a3e] focus:outline-none transition-colors"
        style={{
          fontFamily: "var(--font-oswald)",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235a5048' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
        }}
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
