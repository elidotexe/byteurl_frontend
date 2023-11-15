import Link from "next/link";

import { Atom } from "lucide-react";
import { ModeToggle } from "../theme/ModeToggle";

import PaddingContainer from "../layout/padding-container";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full">
      <PaddingContainer>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center text-sm">
              <div className="mr-2">
                <Atom />
              </div>
              <div>
                Built by{" "}
                <Link
                  className="font-medium underline underline-offset-4"
                  href="#!"
                >
                  Eli
                </Link>
                . The source code is available on{" "}
                <Link
                  className="font-medium underline underline-offset-4"
                  href="#!"
                >
                  GitHub
                </Link>
                .
              </div>
            </div>
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
      </PaddingContainer>
    </footer>
  );
};

export default Footer;
