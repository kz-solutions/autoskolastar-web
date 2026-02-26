"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { parseInfoSubmenu, getImportantLinkMeta } from "@/components/core/nav";
import type { ImportantLink } from "@/components/core/nav/types";
import { BookIcon } from "@/icons/Book";
import { FileIcon } from "@/icons/File";
import { StarIcon } from "@/icons/Star";

function DocCard({
  item,
  ctaDownload,
  ctaReadMore,
  ctaOpen,
}: {
  item: ImportantLink;
  ctaDownload: string;
  ctaReadMore: string;
  ctaOpen: string;
}) {
  const { href, disabled, external } = getImportantLinkMeta(item);
  const isInternal = href?.startsWith("/") && !href.startsWith("http");
  const ctaLabel = item.download
    ? ctaDownload
    : isInternal
      ? ctaReadMore
      : ctaOpen;
  const isLink = external && !item.download;
  const Icon = isLink ? BookIcon : FileIcon;
  const iconWrapClass = isLink
    ? "bg-neutral-50 text-neutral-700"
    : "bg-primary-50 text-primary-600";

  const content = (
    <>
      <div className="flex items-center gap-4">
        <span
          className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${iconWrapClass}`}
        >
          <Icon className="w-5 h-5" />
        </span>
        <span className="font-semibold text-neutral-900 text-lg leading-snug">
          {item.label}
        </span>
        {!disabled && (
          <span className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 text-primary-700 font-semibold text-sm group-hover:bg-primary-500/15 group-hover:underline shrink-0">
            {ctaLabel}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {external ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              )}
            </svg>
          </span>
        )}
      </div>
    </>
  );

  if (disabled) {
    return (
      <div className="rounded-xl border border-neutral-200/70 bg-white/50 p-5 opacity-60 cursor-not-allowed">
        {content}
      </div>
    );
  }

  const className =
    "block rounded-xl border border-neutral-200/70 bg-white/60 p-5 transition-all hover:border-primary-200 hover:bg-white/80 group";

  // Download links should be <a download> (even if internal).
  if (item.download) {
    return (
      <a href={href} download className={className}>
        {content}
      </a>
    );
  }

  if (isInternal) {
    return (
      <Link href={href!} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={className}
    >
      {content}
    </a>
  );
}

export default function InformacePage() {
  const t = useTranslations("InfoPage");
  const tHeader = useTranslations("HomePage.Header");
  const infoSubmenu = parseInfoSubmenu(tHeader.raw("InfoSubmenu"));

  if (!infoSubmenu) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto text-center">
          <p className="text-neutral-600">{t("intro")}</p>
        </main>
      </div>
    );
  }

  const { documents, links } = infoSubmenu;

  return (
    <div className="flex flex-col">
      <main className="flex-1 pt-24 pb-32">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <h1 className="text-heading_lg text-neutral-900 mb-4">{t("title")}</h1>
          <p className="text-lg text-neutral-600 leading-relaxed mb-12">
            {t("intro")}
          </p>

          {/* Jeden velký obdélník: Dokumenty | Odkazy vedle sebe (jako dřív) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-y-12 lg:gap-x-16 items-start">
            {/* Dokumenty */}
            <div className="lg:pr-2">
              <h2 className="text-label text-primary-500 text-[1rem] mb-1">{documents.title}</h2>
              <p className="text-neutral-600 text-sm mb-6">{t("documentsLead")}</p>
              <div className="pt-6 mt-6 border-t border-neutral-200/70 grid grid-cols-1 gap-4">
                {documents.items.map((item) => (
                  <DocCard
                    key={item.label}
                    item={item}
                    ctaDownload={t("ctaDownload")}
                    ctaReadMore={t("ctaReadMore")}
                    ctaOpen={t("ctaOpen")}
                  />
                ))}
              </div>
            </div>

            {/* Divider se hvězdičkou (jen desktop) */}
            <div className="hidden lg:flex flex-col items-center self-stretch px-4">
              <div className="w-px flex-1 bg-primary-500/50" />
              <StarIcon className="w-5 h-5 text-primary-500/60 my-4" weight={1.5} />
              <div className="w-px flex-1 bg-primary-500/50" />
            </div>

            {/* Odkazy */}
            <div className="lg:pl-2">
              <h2 className="text-label text-primary-500 text-[1rem] mb-1">{links.title}</h2>
              <p className="text-neutral-600 text-sm mb-6">{t("linksLead")}</p>
              <div className="pt-6 mt-6 border-t border-neutral-200/70 grid grid-cols-1 gap-4">
                {links.items.map((item) => (
                  <DocCard
                    key={item.label}
                    item={item}
                    ctaDownload={t("ctaDownload")}
                    ctaReadMore={t("ctaReadMore")}
                    ctaOpen={t("ctaOpen")}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
