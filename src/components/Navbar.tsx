"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";

const NAV_LINKS = [
  { label: "Men", href: "/products?gender=men" },
  { label: "Women", href: "/products?gender=women" },
  { label: "Kids", href: "/products?gender=unisex" },
  { label: "Collections", href: "/collections" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const [cartCount, setCartCount] = useState(0);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    setCartCount(itemCount);
  }, [itemCount]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) return;
        const data = await res.json();
        setUserName(data?.user?.name ?? null);
      } catch (e) {
        // ignore
      }
    };
    loadUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await fetch("/api/sign-out", { method: "POST" });
      setUserName(null);
    } catch (e) {
      // ignore
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-light-100">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <Link href="/" aria-label="Nike Home" className="flex items-center">
          <Image src="/logo.svg" alt="Nike" width={28} height={28} priority className="invert" />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-body text-dark-900 transition-colors hover:text-dark-700"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/cart" className="text-body text-dark-900 transition-colors hover:text-dark-700">
            My Cart ({cartCount})
          </Link>
          {userName ? (
            <div className="flex items-center gap-3">
              <span className="text-body text-dark-900">Hi, {userName}</span>
              <button
                type="button"
                onClick={handleSignOut}
                className="text-body text-dark-700 underline underline-offset-4 hover:text-dark-900"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link href="/sign-in" className="text-body text-dark-900 transition-colors hover:text-dark-700">
              Sign in
            </Link>
          )}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="flex h-5 w-6 flex-col justify-between">
            <span className="block h-0.5 w-full rounded bg-dark-900"></span>
            <span className="block h-0.5 w-full rounded bg-dark-900"></span>
            <span className="block h-0.5 w-full rounded bg-dark-900"></span>
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`border-t border-light-300 md:hidden ${open ? "block" : "hidden"}`}
      >
        <ul className="space-y-2 px-4 py-3">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block py-2 text-body text-dark-900 hover:text-dark-700"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center justify-between pt-2">
            <Link href="/cart" className="text-body" onClick={() => setOpen(false)}>
              My Cart ({cartCount})
            </Link>
            {userName ? (
              <button className="text-body underline" onClick={() => { handleSignOut(); setOpen(false); }}>
                Sign out
              </button>
            ) : (
              <Link href="/sign-in" className="text-body" onClick={() => setOpen(false)}>
                Sign in
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
