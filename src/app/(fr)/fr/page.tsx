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
      <SiteHeader lang="fr" />
      <main>
        <Hero lang="fr" />
        <LaCasa lang="fr" />
        <ReelStrip lang="fr" />
        <MenuDelDia lang="fr" />
        <LaMasa lang="fr" />
        <Resenas lang="fr" />
        <Faq lang="fr" />
        <Visitanos lang="fr" />
      </main>
      <SiteFooter lang="fr" />
    </>
  );
}
