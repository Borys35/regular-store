import classNames from "classnames";
import { FC } from "react";

interface Props {
  iconComponent: FC;
  counter?: number;
  className?: string;
}

const HeaderIcon: FC<Props> = ({ iconComponent, counter, className }) => {
  const Icon = iconComponent;
  return (
    <span className={classNames("relative block", className)}>
      {counter ? (
        <span
          className={classNames(
            "absolute top-0 right-0 translate-x-2/3 -translate-y-2/3 text-xs bg-secondary text-white rounded-full",
            { "w-4 h-4": counter <= 9 },
            { "w-5 h-5": counter > 9 }
          )}
        >
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {counter}
          </span>
        </span>
      ) : null}
      <Icon />
    </span>
  );
};

export default HeaderIcon;
