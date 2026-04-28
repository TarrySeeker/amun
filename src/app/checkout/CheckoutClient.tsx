"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import FormSection from "@/components/checkout/FormSection";
import ContactForm from "@/components/checkout/ContactForm";
import DeliveryForm from "@/components/checkout/DeliveryForm";
import PaymentForm from "@/components/checkout/PaymentForm";
import OrderReview from "@/components/checkout/OrderReview";
import { useCart } from "@/context/CartContext";
import { formatRuPhoneInput, isRuPhoneComplete } from "@/lib/phone";
import type { PaymentMethod } from "@/types";
import type { CheckoutDeliveryMethod } from "@/components/checkout/DeliveryForm";

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  deliveryMethod: CheckoutDeliveryMethod;
  city: string;
  address: string;
  postalCode: string;
  comment: string;
  paymentMethod: PaymentMethod;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  city?: string;
  address?: string;
  postalCode?: string;
}

function validateForm(data: CheckoutFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = "Введите имя";
  if (!data.lastName.trim()) errors.lastName = "Введите фамилию";
  if (!data.phone.trim() || data.phone.trim() === "+7")
    errors.phone = "Введите телефон";
  else if (!isRuPhoneComplete(data.phone))
    errors.phone = "Введите полный номер телефона";
  if (!data.email.trim() || !data.email.includes("@"))
    errors.email = "Введите корректный email";
  if (data.deliveryMethod !== "pickup" && !data.city.trim())
    errors.city = "Введите город";
  if (data.deliveryMethod === "courier" && !data.address.trim())
    errors.address = "Введите адрес";
  if (data.deliveryMethod === "post") {
    if (!data.address.trim()) errors.address = "Введите адрес";
    if (data.postalCode.trim().length !== 6)
      errors.postalCode = "Введите индекс из 6 цифр";
  }
  return errors;
}

const initialForm: CheckoutFormData = {
  firstName: "",
  lastName: "",
  phone: "+7 ",
  email: "",
  deliveryMethod: "courier",
  city: "",
  address: "",
  postalCode: "",
  comment: "",
  paymentMethod: "card",
};

export default function CheckoutClient() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutFormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [items.length, router]);

  const updateForm = useCallback((patch: Partial<CheckoutFormData>) => {
    setForm((prev) => {
      const next = { ...prev, ...patch };
      if (typeof patch.phone === "string") {
        next.phone = formatRuPhoneInput(patch.phone);
      }
      return next;
    });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 page-content-top pb-24 text-center text-[#9a8f80]">
        Перенаправление в корзину…
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 page-content-top pb-10 md:pb-14">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Корзина", href: "/cart" },
          { label: "Оформление" },
        ]}
      />

      <h1
        className="text-3xl md:text-4xl font-bold text-[#f0ece4] mb-8 md:mb-10"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Оформление заказа
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <FormSection title="1. Контактные данные" isFirst>
              <ContactForm
                firstName={form.firstName}
                lastName={form.lastName}
                phone={form.phone}
                email={form.email}
                errors={errors}
                onChange={(patch) => updateForm(patch)}
              />
            </FormSection>

            <FormSection title="2. Доставка">
              <DeliveryForm
                deliveryMethod={form.deliveryMethod}
                city={form.city}
                address={form.address}
                postalCode={form.postalCode}
                comment={form.comment}
                errors={errors}
                onChange={(patch) => updateForm(patch)}
              />
            </FormSection>

            <FormSection title="3. Оплата">
              <PaymentForm
                paymentMethod={form.paymentMethod}
                onChange={(paymentMethod) => updateForm({ paymentMethod })}
              />
            </FormSection>

            <button
              type="submit"
              className="w-full sm:w-auto min-w-[240px] bg-[#5c7a3e] hover:bg-[#6b8f47] text-white py-3.5 px-8 text-sm uppercase tracking-widest font-semibold transition-colors"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Оформить заказ
            </button>
          </div>

          <div>
            <OrderReview deliveryMethod={form.deliveryMethod} />
          </div>
        </div>
      </form>
    </div>
  );
}
