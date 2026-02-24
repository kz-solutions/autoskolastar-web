"use client";

import React from "react";
import { getImportantLinkMeta } from "./utils";
import type { ImportantLink } from "./types";

export function ImportantLinkItem({
  item,
  variant,
  role,
  onClick,
}: {
  item: ImportantLink;
  variant: "desktop" | "mobile";
  role?: React.AriaRole;
  onClick?: () => void;
}) {
  const { href, disabled, external } = getImportantLinkMeta(item);

  const baseClass =
    variant === "desktop"
      ? "block px-4 py-3 text-sm text-neutral-700"
      : "pl-4 py-2 text-neutral-700 transition-colors";

  const stateClass = disabled
    ? "opacity-50 cursor-not-allowed"
    : variant === "desktop"
      ? "hover:bg-neutral-50 hover:text-primary-600"
      : "hover:text-primary-500";

  if (disabled) {
    return (
      <span
        role={role}
        aria-disabled="true"
        className={`${baseClass} ${stateClass}`}
      >
        {item.label}
      </span>
    );
  }

  return (
    <a
      role={role}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      download={item.download}
      onClick={onClick}
      className={`${baseClass} ${stateClass}`}
    >
      {item.label}
    </a>
  );
}
