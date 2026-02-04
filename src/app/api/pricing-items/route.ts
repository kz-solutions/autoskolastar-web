import directus from "@/utils/directus";
import { readItems } from "@directus/sdk";

export async function GET() {
  const res = await directus.request(readItems("pricing_items"));

  return Response.json(res);
}
