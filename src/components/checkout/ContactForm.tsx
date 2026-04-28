"use client";

export interface ContactFormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}

export interface ContactFormProps {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  errors: ContactFormErrors;
  onChange: (patch: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
  }) => void;
}

const inputBase =
  "w-full px-3 py-2.5 text-sm text-[#f0ece4] bg-[#0a0a0a] border rounded-md transition-colors focus:border-[#5c7a3e] focus:outline-none";

export default function ContactForm({
  firstName,
  lastName,
  phone,
  email,
  errors,
  onChange,
}: ContactFormProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <label htmlFor="checkout-firstName" className="text-xs text-[#9a8f80]">
          Имя <span className="text-[#5c7a3e]">*</span>
        </label>
        <input
          id="checkout-firstName"
          name="firstName"
          type="text"
          autoComplete="given-name"
          value={firstName}
          onChange={(e) => onChange({ firstName: e.target.value })}
          className={`${inputBase} ${
            errors.firstName ? "border-red-700" : "border-[#2a2a2a]"
          }`}
        />
        {errors.firstName && (
          <p className="text-xs text-red-600">{errors.firstName}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="checkout-lastName" className="text-xs text-[#9a8f80]">
          Фамилия <span className="text-[#5c7a3e]">*</span>
        </label>
        <input
          id="checkout-lastName"
          name="lastName"
          type="text"
          autoComplete="family-name"
          value={lastName}
          onChange={(e) => onChange({ lastName: e.target.value })}
          className={`${inputBase} ${
            errors.lastName ? "border-red-700" : "border-[#2a2a2a]"
          }`}
        />
        {errors.lastName && (
          <p className="text-xs text-red-600">{errors.lastName}</p>
        )}
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <label htmlFor="checkout-phone" className="text-xs text-[#9a8f80]">
          Телефон <span className="text-[#5c7a3e]">*</span>
        </label>
        <input
          id="checkout-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7 (___) ___-__-__"
          value={phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          className={`${inputBase} ${
            errors.phone ? "border-red-700" : "border-[#2a2a2a]"
          }`}
        />
        {errors.phone && (
          <p className="text-xs text-red-600">{errors.phone}</p>
        )}
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <label htmlFor="checkout-email" className="text-xs text-[#9a8f80]">
          Email <span className="text-[#5c7a3e]">*</span>
        </label>
        <input
          id="checkout-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => onChange({ email: e.target.value })}
          className={`${inputBase} ${
            errors.email ? "border-red-700" : "border-[#2a2a2a]"
          }`}
        />
        {errors.email && (
          <p className="text-xs text-red-600">{errors.email}</p>
        )}
      </div>
    </div>
  );
}
