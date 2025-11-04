import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import * as React from "react";

const ButtonVariants = cva(
  "small button group/button bg-black max-xl:bg-white relative  inline-flex uppercase items-center justify-center  transition-colors  disabled:pointer-events-none disabled:opacity-50 border border-black min-w-[19rem] max-sm:min-w-52 [&:before]:content-[''] [&:before]:z-2 [&:before]:bg-white max-xl:[&:before]:hidden  [&:before]:absolute [&:before]:inset-0 [&:before]:transition-transform [&:before]:duration-300 [&:before]:ease-[cubic-bezier(0.7, 0, 0.2, 1)] [&:before]:origin-[100%_50%] hover:[&:before]:-translate-x-full hover:[&:before]:origin-[0%_50%] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "",
        outline:
          "",
      },
      size: {
        default: "px-8 py-7 max-sm:py-4", 
        sm: "px-2",
        lg: "px-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  href?: string;
  target?: string;
  typeDiv?: boolean;
  loading?: boolean;
  showLogo?: boolean; // New prop to control logo visibility
  dark?: boolean; // New prop to control logo visibility
  title?: string;
  titleClassName?: string;
}

export interface BaseButtonProps extends VariantProps<typeof ButtonVariants> {
  loading?: boolean;
  asChild?: boolean;
  showLogo?: boolean; // Add to base props
  dark?: boolean; // Add to base props
  title?: string;
  titleClassName?: string;
}

export interface ButtonAsLinkProps
  extends BaseButtonProps,
    React.ComponentPropsWithoutRef<typeof Link> {}

export interface ButtonAsButtonProps
  extends BaseButtonProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
}

export interface DivAsButtonProps
  extends BaseButtonProps,
    React.ButtonHTMLAttributes<HTMLDivElement> {}

const Button = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>(
  (
    {
      className,
      variant,
      size,
      href,
      target = "internal",
      loading,
      typeDiv,
      onClick,
      children,
      showLogo = false, // Default to false
      dark = false, // Default to false
      title,
      titleClassName,
      ...props
    },
    ref,
  ) => {
    if (typeDiv) {
      const divOnClick = onClick as
        | React.MouseEventHandler<HTMLDivElement>
        | undefined;
      return (
        <div
          className={cn(ButtonVariants({ variant, size }), className)}
          ref={ref as React.Ref<HTMLDivElement>}
          onClick={divOnClick}
          {...(props as DivAsButtonProps)}
        >
          {children}
        </div>
      );
    }

    if (href) {
      return (
        <Link
          className={cn(ButtonVariants({ variant, size }), className)}
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target === "internal" ? "_self" : "_blank"}
          prefetch={false}
          {...(props as Omit<ButtonAsLinkProps, "href" | "onClick">)}
          onClick={
            onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>
          }
        >
          <span className={cn("overflow-hidden block relative z-3 text-black xl:group-hover/button:text-white", titleClassName)}>
             <span className="overflow-hidden block relative xl:group-hover/button:move-up-down text-inherit">{title}</span>
          </span>
        </Link>
      );
    }

    return (
      <button
        className={cn(ButtonVariants({ variant, size }), className)}
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        {...(props as ButtonAsButtonProps)}
      >
        {/* {loading ? <Spinner className="me-2 size-4" /> : null} */}
        {/* {children} */}
        <span className={cn("overflow-hidden block relative z-3 text-black xl:group-hover/button:text-white", titleClassName)}>
            <span className="overflow-hidden block relative xl:group-hover/button:move-up-down text-inherit">{title}</span>
        </span>
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, ButtonVariants };

