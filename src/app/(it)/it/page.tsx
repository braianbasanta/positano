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

export default function HomeEn() {
  return (
    <>
      <SiteHeader lang="it" />
      <main>
        <Hero lang="it" />
        <LaCasa lang="it" />
        <ReelStrip lang="it" />
        <MenuDelDia lang="it" />
        <LaMasa lang="it" />
        <Resenas lang="it" />
        <Faq lang="it" />
        <Visitanos lang="it" />
      </main>
      <SiteFooter lang="it" />
    </>
  );
}
