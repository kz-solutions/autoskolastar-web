import { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";

const host = process.env.NEXT_PUBLIC_ADMIN_URL;

const locales = ["cs", "en"];

const staticPages = [
  "/",
  "/cenik",
  "/kontakt",
  "/ridicske-prukazy",
  "/skoleni-ridicu",
  "/sluzby",
];

const categories = ["a", "b", "c", "d", "t"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    const languages: Record<string, string> = {};

    for (const locale of locales) {
      languages[locale] = host + (await getPathname({ locale, href: page }));
    }

    entries.push({
      url: languages["cs"],
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: page === "/" ? 1 : 0.8,
      alternates: {
        languages,
      },
    });
  }

  for (const category of categories) {
    const href = `/ridicske-prukazy/${category}`;
    const languages: Record<string, string> = {};

    for (const locale of locales) {
      languages[locale] = host + (await getPathname({ locale, href }));
    }

    entries.push({
      url: languages["cs"],
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages,
      },
    });
  }

  return entries;
}
