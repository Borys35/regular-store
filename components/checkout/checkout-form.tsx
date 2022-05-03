import classNames from "classnames";
import { FC } from "react";

interface Props extends React.HTMLAttributes<HTMLFormElement> {}

const CheckoutForm: FC<Props> = ({ children, className, ...props }) => {
  return (
    <form className={classNames("flex flex-col gap-6 items-start", className)} {...props}>
      {children}
    </form>
  );
};

export default CheckoutForm;
