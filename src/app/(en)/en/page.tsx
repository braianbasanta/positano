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
      <SiteHeader lang="en" />
      <main>
        <Hero lang="en" />
        <LaCasa lang="en" />
        <ReelStrip lang="en" />
        <MenuDelDia lang="en" />
        <LaMasa lang="en" />
        <Resenas lang="en" />
        <Faq lang="en" />
        <Visitanos lang="en" />
      </main>
      <SiteFooter lang="en" />
    </>
  );
}
