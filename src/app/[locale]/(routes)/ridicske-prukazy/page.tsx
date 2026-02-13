import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import LicenseCategories from "@/components/sections/license-categories/LicenseCategories";

export default function RidicskePrukazyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-16">
        <LicenseCategories />
      </main>
      <Footer />
    </div>
  );
}
