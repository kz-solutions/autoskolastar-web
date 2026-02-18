import type { ImportantLink, InfoSubmenu, InfoSubmenuSection } from "./types";

export function parseImportantLinks(value: unknown): ImportantLink[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && !!v)
    .map((v) => ({
      label: String(v.label ?? ""),
      href: typeof v.href === "string" ? v.href : undefined,
      external: typeof v.external === "boolean" ? v.external : undefined,
      download: typeof v.download === "boolean" ? v.download : undefined,
    }))
    .filter((v) => v.label.trim().length > 0);
}

function parseSection(value: unknown): InfoSubmenuSection {
  if (!value || typeof value !== "object" || !("title" in value) || !("items" in value)) {
    return { title: "", items: [] };
  }
  const obj = value as Record<string, unknown>;
  return {
    title: String(obj.title ?? ""),
    items: parseImportantLinks(obj.items),
  };
}

export function parseInfoSubmenu(value: unknown): InfoSubmenu | null {
  if (!value || typeof value !== "object") return null;
  const obj = value as Record<string, unknown>;
  const documents = parseSection(obj.documents);
  const links = parseSection(obj.links);
  if (!documents.title && !links.title) return null;
  return { documents, links };
}

export function getImportantLinkMeta(item: ImportantLink) {
  const href = (item.href ?? "").trim();
  const disabled = href.length === 0;
  const external = item.external ?? href.startsWith("http");
  return { href, disabled, external };
}
