import "@/app/globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Children } from "@/utils/types/Props";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import { Manrope } from "next/font/google";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const manrope = Manrope({
  subsets: ["latin", "latin-ext"], // important for Czech
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

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
    <html lang={locale} className={manrope.variable}>
      <NextIntlClientProvider>
        <body
          className={
            "w-full min-h-screen flex flex-col items-center justify-center"
          }
        >
          <Navbar />
          {children}
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
