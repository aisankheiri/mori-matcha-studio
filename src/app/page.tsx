import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/sections/home/HeroSection";
import MatchaRecipes from "@/sections/home/MatchaRecipes";


export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MatchaRecipes />
      </main>
    </>
  );
}