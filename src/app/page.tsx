import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/sections/home/HeroSection";
import MatchaRecipes from "@/sections/home/MatchaRecipes";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MatchaRecipes />
      </main>
      <Footer />
    </>
  );
}