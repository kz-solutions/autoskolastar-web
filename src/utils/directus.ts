import { createDirectus, rest } from "@directus/sdk";

const directus = createDirectus(process.env.NEXT_PUBLIC_ADMIN_URL || "").with(
  rest(),
);

export default directus;
