import classNames from "classnames";
import { FC, forwardRef } from "react";

interface Props extends React.HTMLAttributes<HTMLSelectElement> {}

const Select: FC<Props> = forwardRef<HTMLSelectElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <select
        className={classNames(
          "px-4 py-2 rounded-xl shadow-md placeholder:text-accent bg-white",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export default Select;
