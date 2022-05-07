import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";
import { FaSpinner } from "react-icons/fa";

interface Props extends React.HTMLAttributes<HTMLElement> {
  to?: string;
  href?: string;
  toNewPage?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
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
  loading = false,
  ...props
}) => {
  const classes = classNames(
    "inline-block",
    { "text-white": variant === "primary" },
    { "text-primary": variant === "secondary" },
    { "bg-primary": variant === "primary" },
    { "bg-white": variant === "secondary" },
    { "border-1 border-primary": variant === "secondary" },
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
    { "hover:brightness-125 hover:shadow-2xl": !disabled || !loading },
    { "active:brightness-100 active:ring-4": !disabled || !loading },
    "tracking-wide",
    { "cursor-pointer": !disabled },
    { "cursor-default": disabled },
    { "opacity-50": disabled },
    className
  );

  const content = loading ? <FaSpinner className="animate-spin" /> : children;

  if (to)
    return (
      <Link href={to} {...props}>
        <a className={classes}>{content}</a>
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
          {content}
        </a>
      );
    else
      return (
        <a href={href} className={classes} {...props}>
          {content}
        </a>
      );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
};

export default Button;
