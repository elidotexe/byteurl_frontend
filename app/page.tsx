import Hero from "@/components/elements/Hero";
import Nav from "@/components/navigation/Nav";
import Footer from "@/components/navigation/Footer";
import { marketingConfig } from "@/config/Marketing";

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
