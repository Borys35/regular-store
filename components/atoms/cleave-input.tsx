import classNames from "classnames";
import Cleave from "cleave.js/react";
import { Props as CleaveProps } from "cleave.js/react/props";
import { Component, FC, forwardRef } from "react";

interface Props extends CleaveProps {}

const CleaveInput: FC<Props> = forwardRef<Component<Props, any, any>, Props>(
  ({ className, ...props }, ref) => {
    return (
      <Cleave
        className={classNames(
          "px-4 py-2 rounded-xl shadow-lg placeholder:text-accent text-black",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

CleaveInput.displayName = "Cleave Input";

export default CleaveInput;
