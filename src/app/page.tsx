import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import LaCasa from "@/components/LaCasa";
import ReelStrip from "@/components/reels/ReelStrip";
import LaMasa from "@/components/LaMasa";
import Resenas from "@/components/Resenas";
import Visitanos from "@/components/Visitanos";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <LaCasa />
        <ReelStrip />
        <LaMasa />
        <Resenas />
        <Visitanos />
      </main>
      <SiteFooter />
    </>
  );
}
