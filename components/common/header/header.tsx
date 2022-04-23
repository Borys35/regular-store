import Link from "next/link";
import { FC } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useRetrieveCartQuery } from "../../../store/apis/cart";
import Button from "../../atoms/button";
import Heading from "../../atoms/heading";
import CartItem from "../../cart/cart-item";
import HeaderIcon from "./header-icon";
import HeaderNav from "./header-nav";
import HeaderSearch from "./header-search";

const Header: FC = () => {
  const merchant = useAppSelector((state) => state.merchant);
  const { data: cart } = useRetrieveCartQuery();

  return (
    <header className="flex flex-col gap-6 pt-6">
      <div className="flex justify-between items-center">
        <Heading level={3}>
          <Link href="/">
            <a className="text-secondary">{merchant.name}</a>
          </Link>
        </Heading>
        <HeaderSearch />
        <div className="flex items-center gap-6">
          <HeaderIcon
            iconComponent={() => <FaUser size={18} className="fill-gray-600" />}
          />
          <span className="group relative">
            <HeaderIcon
              iconComponent={() => (
                <Link href="/cart">
                  <a>
                    <FaShoppingCart size={18} className="fill-gray-600" />
                  </a>
                </Link>
              )}
              counter={cart?.total_items}
            />
            {cart && (
              <div
                className={`hidden absolute top-full text-center
                            translate-y-1 px-3 pt-2 pb-4 border-1 border-accent 
                            rounded bg-white w-80 z-20
                            md:flex flex-col gap-4 transition-transform origin-top-right
                            shadow-md right-0 scale-0 group-hover:scale-100`}
              >
                <Heading level={3} className="py-4">
                  Cart
                </Heading>
                <div className="flex flex-col gap-4 mb-2">
                  {cart.line_items.length ? (
                    cart.line_items.map((lineItem) => (
                      <CartItem key={lineItem.id} item={lineItem} />
                    ))
                  ) : (
                    <p>Cart is empty 😕</p>
                  )}
                </div>
                <span className="border-t-1 border-accent"></span>
                <p className="text-left text-lg">
                  Total:{" "}
                  <span className="font-bold">
                    {cart.subtotal.formatted_with_symbol}
                  </span>
                </p>
                <Button variant="primary" to="/cart">
                  Cart
                </Button>
              </div>
            )}
          </span>
        </div>
      </div>
      <div className="border-t-1 border-accent"></div>
      <div>
        <HeaderNav />
      </div>
    </header>
  );
};

export default Header;
