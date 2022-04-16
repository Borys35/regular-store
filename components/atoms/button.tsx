import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";

interface Props extends React.HTMLAttributes<HTMLElement> {
  to?: string;
  href?: string;
  toNewPage?: boolean;
}

const Button: FC<Props> = ({
  children,
  to,
  href,
  toNewPage,
  className,
  ...props
}) => {
  const classes = classNames(
    "inline-block",
    "text-white",
    "bg-primary",
    "px-8",
    "py-6",
    "rounded-xl",
    "uppercase",
    "font-bold",
    "shadow-xl",
    "transition-all",
    "hover:brightness-125",
    "active:brightness-100 active:ring-4",
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
    </button>
  );
};

export default Button;
