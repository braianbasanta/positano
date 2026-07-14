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
      <SiteHeader lang="de" />
      <main>
        <Hero lang="de" />
        <LaCasa lang="de" />
        <ReelStrip lang="de" />
        <MenuDelDia lang="de" />
        <LaMasa lang="de" />
        <Resenas lang="de" />
        <Faq lang="de" />
        <Visitanos lang="de" />
      </main>
      <SiteFooter lang="de" />
    </>
  );
}
