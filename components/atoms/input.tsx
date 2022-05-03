import classNames from "classnames";
import { FC, forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        className={classNames(
          "px-4 py-2 rounded-xl shadow-lg placeholder:text-accent border-1 border-accent",
          { "self-start": type === "checkbox" },
          className
        )}
        ref={ref}
        type={type}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
