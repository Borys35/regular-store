import { FC, forwardRef, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<Omit<HTMLInputElement, "type">> {
  label: string;
}

const Radio: FC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ label, ...props }, ref) => {
    return (
      <label>
        <input type="radio" className="mr-2" ref={ref} {...props} />
        {label}
      </label>
    );
  }
);

Radio.displayName = "Radio";

export default Radio;
