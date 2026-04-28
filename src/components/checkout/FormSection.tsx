import type { ReactNode } from "react";

export interface FormSectionProps {
  title: string;
  children: ReactNode;
  /** Первая секция — без верхней границы */
  isFirst?: boolean;
}

export default function FormSection({
  title,
  children,
  isFirst = false,
}: FormSectionProps) {
  return (
    <section
      className={`rounded-lg bg-[#111] p-5 md:p-6 space-y-4 ${
        isFirst ? "" : "border-t border-[#1e1e1e]"
      }`}
    >
      <h2
        className="text-lg md:text-xl font-semibold text-[#f0ece4] tracking-wide"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
