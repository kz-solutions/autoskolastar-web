"use client";

import React from "react";

type Props = {
  isOpen: boolean;
  isMenuOpening: boolean;
  isMenuClosing: boolean;
  onClick: () => void;
};

export function BurgerButton({
  isOpen,
  isMenuOpening,
  isMenuClosing,
  onClick,
}: Props) {
  const isBusy = isMenuOpening || isMenuClosing;

  return (
    <button
      onClick={onClick}
      className="lg:hidden text-neutral-700 hover:text-primary-500 transition-colors w-11 h-11 flex items-center justify-center"
      aria-expanded={isOpen}
      aria-controls="mobile-nav"
      aria-disabled={isBusy}
      style={{ pointerEvents: isBusy ? "none" : "auto" }}
      type="button"
    >
      <span
        className={["burger-icon-menu04", isOpen ? "active" : ""]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
      </span>
    </button>
  );
}
