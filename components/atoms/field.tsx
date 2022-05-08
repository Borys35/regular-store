import classNames from "classnames";
import { FC } from "react";
import { ErrorOption } from "react-hook-form";

interface Props {
  label: string;
  error?: ErrorOption;
  className?: string;
}

const Field: FC<Props> = ({ children, label, error, className }) => {
  return (
    <div className={classNames("flex flex-col gap-1", className)}>
      <label className="text-lg">{label}</label>
      {children}
      {error && (
        <span className="text-red-600 bg-background">
          {`>`} {error.message}
        </span>
      )}
    </div>
  );
};

export default Field;
