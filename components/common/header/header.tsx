import Link from "next/link";
import { FC } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Heading from "../../atoms/heading";
import HeaderNav from "./header-nav";
import HeaderSearch from "./header-search";

const Header: FC = () => {
  const merchant = useAppSelector((state) => state.merchant);

  return (
    <header className="flex flex-col gap-6 pt-6">
      <div className="flex justify-between items-center">
        <Heading level={3}>
          <Link href="/">
            <a className="text-secondary">{merchant.name}</a>
          </Link>
        </Heading>
        <HeaderSearch />
        <div className="flex gap-4">
          <FaShoppingCart size={20} />
          <FaUser size={20} />
        </div>
      </div>
      <div className="border-t-2 border-gray-400"></div>
      <div>
        <HeaderNav />
      </div>
    </header>
  );
};

export default Header;
