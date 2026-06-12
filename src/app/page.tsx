import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Network from "@/components/sections/Network";
import TextToBooking from "@/components/sections/TextToBooking";
import Superpowers from "@/components/sections/Superpowers";
import Finale from "@/components/sections/Finale";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Manifesto />
      <Network />
      <TextToBooking />
      <Superpowers />
      <Finale />
    </main>
  );
}
