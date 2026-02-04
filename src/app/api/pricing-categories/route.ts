import directus from "@/utils/directus";
import { readItems } from "@directus/sdk";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const locale = req.cookies.get("NEXT_LOCALE")?.value ?? "cs";

  console.log(locale);

  const res = await directus.request(
    readItems("pricing_categories", {
      fields: ["id", { translations: ["label", "description"] }],
      deep: {
        translations: {
          _filter: {
            languages_code: { _eq: locale },
          },
        },
      },
    }),
  );

  return Response.json(res);
}
