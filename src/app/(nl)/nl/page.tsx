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
      <SiteHeader lang="nl" />
      <main>
        <Hero lang="nl" />
        <LaCasa lang="nl" />
        <ReelStrip lang="nl" />
        <MenuDelDia lang="nl" />
        <LaMasa lang="nl" />
        <Resenas lang="nl" />
        <Faq lang="nl" />
        <Visitanos lang="nl" />
      </main>
      <SiteFooter lang="nl" />
    </>
  );
}
