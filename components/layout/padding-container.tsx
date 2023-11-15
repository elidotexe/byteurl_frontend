import { ReactNode } from "react";

const PaddingContainer = ({ children }: { children: ReactNode }) => {
  return <div className="container mx-auto py-6">{children}</div>;
};

export default PaddingContainer;
