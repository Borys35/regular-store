import { FC } from "react";
import { useMerchant } from "../providers/merchant-provider";

const Header: FC = () => {
  const {
    merchant: { name, logo },
  } = useMerchant();

  return (
    <header>
      <h1>Name: {name}</h1>
    </header>
  );
};

export default Header;
