import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";

interface Props extends React.HTMLAttributes<HTMLElement> {
  to?: string;
  href?: string;
  toNewPage?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const Button: FC<Props> = ({
  children,
  to,
  href,
  toNewPage,
  size = "md",
  variant = "secondary",
  className,
  disabled = false,
  ...props
}) => {
  const classes = classNames(
    "inline-block",
    { "text-white": variant === "primary" },
    { "text-primary": variant === "secondary" },
    { "bg-primary": variant === "primary" },
    { "bg-white": variant === "secondary" },
    { "border-2 border-primary": variant === "secondary" },
    { "px-8": size === "lg" },
    { "py-6": size === "lg" },
    { "px-6": size === "md" },
    { "py-4": size === "md" },
    { "px-4": size === "sm" },
    { "py-2": size === "sm" },
    "rounded-2xl",
    "uppercase",
    "font-bold",
    "shadow-xl",
    "transition-all",
    "text-center",
    { "hover:brightness-125": !disabled },
    { "active:brightness-100 active:ring-4": !disabled },
    "tracking-wide",
    { "cursor-pointer": !disabled },
    { "cursor-default": disabled },
    { "opacity-50": disabled },
    className
  );

  if (to)
    return (
      <Link href={to} {...props}>
        <a className={classes}>{children}</a>
      </Link>
    );

  if (href) {
    if (toNewPage)
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    else
      return (
        <a href={href} className={classes} {...props}>
          {children}
        </a>
      );
  }

  return (
    <button className={classes} {...props}>
      {children}
      {/* <FaSpinner className="animate-spin" /> */}
    </button>
  );
};

export default Button;
