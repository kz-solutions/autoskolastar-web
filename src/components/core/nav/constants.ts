export const NAVBAR_SCROLL = {
  JITTER: 2,
  HIDE_AFTER: 160,
  SHOW_AFTER: 40,
} as const;

export const MOBILE_MENU_ANIM = {
  OPEN: { duration: 0.5, ease: "power2.inOut" as const },
  CLOSE: { duration: 0.25, ease: "power2.out" as const },
} as const;

export const MOBILE_ACCORDION_ANIM = {
  OPEN: { duration: 0.28, ease: "power2.out" as const },
  CLOSE: { duration: 0.22, ease: "power2.out" as const },
} as const;
