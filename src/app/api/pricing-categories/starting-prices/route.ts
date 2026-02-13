import directus from "@/utils/directus";
import { aggregate, readItems } from "@directus/sdk";

export async function GET() {
  const aggregated = await directus.request(
    aggregate("pricing_items", {
      aggregate: { min: ["price"] },
      groupBy: ["category_id"],
    }),
  );

  const categories = await directus.request(
    readItems("pricing_categories", {
      fields: [
        "id",
        {
          category_code: ["code"],
        },
      ],
    }),
  );

  const codeById = Object.fromEntries(
    categories.map((c) => [c.id, c.category_code]),
  );

  const res = aggregated.map((row) => ({
    category_code: codeById[row.category_id].code,
    min_price: row.min.price,
  }));

  return Response.json(res);
}
