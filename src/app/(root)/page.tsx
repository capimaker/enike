import React from "react";
import Link from "next/link";
import { Card } from "@/components";
import { getCurrentUser } from "@/lib/auth/actions";
import { getAllProducts } from "@/lib/actions/product";
import { formatCurrency } from "@/lib/utils/currency";

const Home = async () => {
  const user = await getCurrentUser();
  const { products } = await getAllProducts({
    search: undefined,
    genderSlugs: [],
    sizeSlugs: [],
    colorSlugs: [],
    brandSlugs: [],
    categorySlugs: [],
    priceMin: undefined,
    priceMax: undefined,
    priceRanges: [],
    sort: "newest",
    page: 1,
    limit: 6,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <section aria-labelledby="latest" className="pb-12">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="latest" className="text-heading-3 text-dark-900">
            Latest shoes
          </h2>
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center rounded-full bg-dark-900 px-5 py-2 text-body-medium text-light-100 transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]"
          >
            Sign in
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Card
              key={p.id}
              title={p.title}
              subtitle={p.subtitle ?? undefined}
              meta={undefined}
              imageSrc={p.imageUrl ?? "/shoes/shoe-1.jpg"}
              price={p.minPrice !== null ? formatCurrency(p.minPrice) : undefined}
              href={`/products/${p.id}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
