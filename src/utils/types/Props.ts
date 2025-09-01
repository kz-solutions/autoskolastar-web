import React from "react";
import { routing } from "@/i18n/routing";

export type Children = {
  children?: React.ReactNode;
};

export type ClassName = {
  className?: string;
};

export type Locales = (typeof routing.locales)[number];
