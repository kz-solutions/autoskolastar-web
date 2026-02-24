export type ImportantLink = {
  label: string;
  href?: string;
  external?: boolean;
  download?: boolean;
};

export type InfoSubmenuSection = {
  title: string;
  items: ImportantLink[];
};

export type InfoSubmenu = {
  documents: InfoSubmenuSection;
  links: InfoSubmenuSection;
};

export type NavLink = {
  title: string;
  href: string;
  submenuKey?: "drivingLicenses" | "info";
};

export type MobileSubmenuKey = "drivingLicenses" | "info" | null;
