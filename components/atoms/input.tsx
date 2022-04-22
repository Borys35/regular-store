import classNames from "classnames";
import { FC } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<Props> = ({ className, ...props }) => {
  return (
    <input
      className={classNames(
        "px-4 py-2 rounded-xl shadow-lg placeholder:text-accent border-1 border-accent",
        className
      )}
      {...props}
    />
  );
};

export default Input;
