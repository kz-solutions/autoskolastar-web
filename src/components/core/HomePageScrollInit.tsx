"use client";

import { useScrollToHashOnLoad } from "@/hooks/useSmoothScroll";

export function HomePageScrollInit() {
  useScrollToHashOnLoad();
  return null;
}
