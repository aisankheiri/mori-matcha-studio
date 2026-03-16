import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/sections/home/HeroSection";
import MatchaShowcase from "@/sections/home/MatchaShowcase";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MatchaShowcase />
      </main>
    </>
  );
}