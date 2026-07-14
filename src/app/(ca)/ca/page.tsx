import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import LaCasa from "@/components/LaCasa";
import ReelStrip from "@/components/reels/ReelStrip";
import LaMasa from "@/components/LaMasa";
import MenuDelDia from "@/components/MenuDelDia";
import Resenas from "@/components/Resenas";
import Faq from "@/components/Faq";
import Visitanos from "@/components/Visitanos";
import SiteFooter from "@/components/SiteFooter";

export default function HomeCa() {
  return (
    <>
      <SiteHeader lang="ca" />
      <main>
        <Hero lang="ca" />
        <LaCasa lang="ca" />
        <ReelStrip lang="ca" />
        <MenuDelDia lang="ca" />
        <LaMasa lang="ca" />
        <Resenas lang="ca" />
        <Faq lang="ca" />
        <Visitanos lang="ca" />
      </main>
      <SiteFooter lang="ca" />
    </>
  );
}
