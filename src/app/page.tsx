import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/sections/home/HeroSection";
import MatchaRecipes from "@/sections/home/MatchaRecipes";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/common/WhatsAppFloat";
import MatchaJourneySection from "@/sections/home/MatchaJourneySection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MatchaJourneySection />
        <MatchaRecipes />
        <WhatsAppFloat />
      </main>
      <Footer />
    </>
  );
}