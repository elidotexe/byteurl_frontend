import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { Icons } from "../icons";

interface LinkCreateButtonProps extends ButtonProps {}

const LinkCreateButton = ({
  className,
  variant,
  ...props
}: LinkCreateButtonProps) => {
  const isLoading = false;

  return (
    <button
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      New link
    </button>
  );
};

export default LinkCreateButton;
