"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { formatCurrency } from "@/lib/utils/currency";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  if (!items.length) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-heading-2 text-dark-900">Your Cart</h1>
        <p className="mt-4 text-body text-dark-700">Your cart is empty.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-dark-900 px-5 py-3 text-body-medium text-light-100 transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]"
        >
          Browse products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-heading-2 text-dark-900">Your Cart</h1>
        <button
          type="button"
          onClick={clearCart}
          className="text-body text-dark-700 underline underline-offset-4 hover:text-dark-900"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 rounded-xl border border-light-300 bg-light-100 p-4"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-light-200">
                <Image
                  src={item.image ?? "/shoes/shoe-1.jpg"}
                  alt={item.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <Link href={`/products/${item.id}`} className="text-body-medium text-dark-900 hover:underline">
                  {item.name}
                </Link>
                <p className="text-body text-dark-700">{formatCurrency(item.price)}</p>
                <div className="mt-2 flex items-center gap-3">
                  <label className="text-caption text-dark-700" htmlFor={`qty-${item.id}`}>
                    Qty
                  </label>
                  <input
                    id={`qty-${item.id}`}
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    className="w-16 rounded-md border border-light-300 px-2 py-1 text-body"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-caption text-red-700 underline underline-offset-4 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-body-medium text-dark-900">
                {formatCurrency(item.price * item.quantity)}
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-xl border border-light-300 bg-light-100 p-4">
          <h2 className="text-heading-3 text-dark-900">Summary</h2>
          <div className="mt-4 flex items-center justify-between text-body text-dark-700">
            <span>Items</span>
            <span>
              {items.reduce((sum, i) => sum + i.quantity, 0)} product(s)
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-body text-dark-900">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-full bg-dark-900 px-5 py-3 text-body-medium text-light-100 transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]"
          >
            Checkout
          </button>
          <Link
            href="/products"
            className="mt-3 block text-center text-body text-dark-700 underline underline-offset-4 hover:text-dark-900"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}
