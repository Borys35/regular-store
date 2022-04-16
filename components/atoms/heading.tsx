import classNames from "classnames";
import { FC } from "react";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading: FC<Props> = ({ children, level, className, ...props }) => {
  const Component = `h${level}` as const;

  return (
    <Component
      className={classNames("font-bold leading-relaxed", className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Heading;
