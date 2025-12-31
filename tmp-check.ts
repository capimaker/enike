import { db } from './src/lib/db';
import { productVariants, colors } from './src/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

const run = async () => {
  const rows = await db
    .select({ slug: colors.slug, cnt: sql`count(*)`.as('c') })
    .from(productVariants)
    .leftJoin(colors, eq(colors.id, productVariants.colorId))
    .groupBy(colors.slug);
  console.log(rows);
};
run().catch((e) => { console.error(e); process.exit(1); });
