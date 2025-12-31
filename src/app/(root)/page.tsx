import React from "react";
import { Card } from "@/components";
import { getAllProducts } from "@/lib/actions/product";
import { formatCurrency } from "@/lib/utils/currency";

const Home = async () => {
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
        <h2 id="latest" className="mb-6 text-heading-3 text-dark-900">
          Latest shoes
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Card
              key={p.id}
              title={p.name}
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
