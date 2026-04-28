import { ProductSpec } from "@/types";

interface ProductSpecsProps {
  specs: ProductSpec[];
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  return (
    <dl className="divide-y divide-[#1e1e1e]">
      {specs.map((spec, index) => (
        <div
          key={spec.label}
          className={`flex justify-between py-3 px-4 ${
            index % 2 === 0 ? "bg-[#111]" : "bg-transparent"
          }`}
        >
          <dt className="text-[#6b6055] text-sm">{spec.label}</dt>
          <dd className="text-[#f0ece4] text-sm font-medium">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
