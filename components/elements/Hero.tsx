import Link from "next/link";
import { Button } from "../ui/button";

import PaddingContainer from "../layout/padding-container";

const Hero = () => {
  return (
    <PaddingContainer>
      <section className="flex items-center justify-center py-32">
        <div className="max-w-[64rem] text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl pb-4">
            An example app built using Next.js 13 server components.
          </h1>
          <div className="flex items-center justify-center">
            <p className="text-xl text-[#64748B] max-w-[42rem] pb-4 leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              I'm building a web app with Next.js 13 and open sourcing
              everything. Follow along as we figure this out together.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button asChild>
              <Link className="px-6 py-5" href="#!">
                Get Started
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link className="px-6 py-5" href="#!">
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PaddingContainer>
  );
};

export default Hero;
