import Link from "next/link";

import { marketingConfig } from "@/config/marketing";
import { Button } from "@/components/ui/button";

import PaddingContainer from "@/components/layout/padding-container";
import Nav from "@/components/navigation/nav";
import Hero from "@/components/elements/hero";
import Footer from "@/components/navigation/footer";

export default function IndexPage() {
  return (
    <>
      <PaddingContainer>
        <div className="flex items-center justify-between">
          <Nav items={marketingConfig.mainNav} />
          <Button
            className="bg-secondary hover:bg-secondary/80 h-9 rounded-md px-4 border-none text-sm font-medium transition-colors"
            variant="outline"
            asChild
          >
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </PaddingContainer>
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}
