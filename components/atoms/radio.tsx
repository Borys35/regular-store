import { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<Omit<HTMLInputElement, "type">> {
  label: string;
}

const Radio: FC<Props> = ({ label, ...props }) => {
  return (
    <label>
      <input type="radio" className="mr-2" {...props} />
      {label}
    </label>
  );
};

export default Radio;
