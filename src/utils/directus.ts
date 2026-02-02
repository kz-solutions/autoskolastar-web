import { createDirectus, rest } from "@directus/sdk";

const directus = createDirectus(
  "http://directus-o44ss0kw0so84gk4gc0owccw.89.167.41.102.sslip.io",
).with(rest());

export default directus;
