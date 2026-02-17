import "@/app/globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Children } from "@/utils/types/Props";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  params: Promise<{ locale: string }>;
} & Children) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <NextIntlClientProvider>
        <body className={"w-full flex flex-col items-center justify-center"}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
