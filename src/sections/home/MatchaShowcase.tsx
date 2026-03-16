import Image from "next/image";
import Container from "@/components/ui/Container";

export default function MatchaShowcase() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#f7f6f2_0%,#f2efe9_100%)]" />

      <Container>
        <div className="relative flex justify-center">
          <Image
            src="/images/hero/matcha-collection.png"
            alt="Matcha, bowl ve bambu whisk koleksiyonu"
            width={1600}
            height={900}
            priority
            className="w-[600px] md:w-[750px] h-auto object-contain mx-auto"
          />
        </div>
      </Container>
    </section>
  );
}