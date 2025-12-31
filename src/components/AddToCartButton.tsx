"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";

type AddToCartButtonProps = {
  productId: string;
  name: string;
  price: number;
  image?: string | null;
  className?: string;
};

export default function AddToCartButton({ productId, name, price, image, className = "" }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const getItemCount = useCartStore((s) => s.getItemCount);
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem({
      id: productId,
      name,
      price,
      image: image ?? undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 rounded-full bg-dark-900 px-6 py-4 text-body-medium text-light-100 transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500] ${className}`}
    >
      {added ? "Added to cart" : `Add to Bag (${getItemCount()})`}
    </button>
  );
}
