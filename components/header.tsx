import { FC } from "react";
import { useAppSelector } from "../hooks/useAppSelector";

const Header: FC = () => {
  const merchant = useAppSelector((state) => state.merchant);

  return (
    <header>
      <h1>Name: {merchant.name}</h1>
    </header>
  );
};

export default Header;
