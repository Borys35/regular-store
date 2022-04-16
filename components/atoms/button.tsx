import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";

interface Props extends React.HTMLAttributes<HTMLElement> {
  to?: string;
  href?: string;
}

const Button: FC<Props> = ({ children, to, href, className, ...props }) => {
  const classes = classNames(
    "inline-block",
    "text-white",
    "bg-blue-500",
    "px-4",
    "py-2",
    "rounded",
    "hover:bg-blue-600",
    className
  );

  if (to)
    return (
      <Link href={to} {...props}>
        <a className={classes}>{children}</a>
      </Link>
    );

  if (href)
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

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
