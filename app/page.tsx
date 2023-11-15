import Hero from "@/components/elements/hero";
import Nav from "@/components/navigation/nav";
import Footer from "@/components/navigation/footer";
import { marketingConfig } from "@/config/marketing";

export default function Home() {
  return (
    <>
      <Nav items={marketingConfig.mainNav} />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}
