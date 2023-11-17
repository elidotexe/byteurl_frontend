import Link from "next/link";

import PaddingContainer from "../layout/padding-container";
import { Icons } from "../icons";
import { ModeToggle } from "../theme/mode-toggle";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full">
      <PaddingContainer>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center text-sm">
              <div className="mr-2">
                <Icons.logo />
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
