import { NextPage } from "next";
import Link from "next/link";
import Button from "../components/atoms/button";
import Heading from "../components/atoms/heading";
import CartItem from "../components/cart/cart-item";
import Layout from "../components/common/layout";
import { useEmptyCartMutation, useRetrieveCartQuery } from "../store/apis/cart";

const Cart: NextPage = () => {
  const { data: cart } = useRetrieveCartQuery();
  const [emptyCart] = useEmptyCartMutation();

  const isCartEmpty = cart?.line_items.length === 0;

  return (
    <Layout name="Cart">
      {cart ? (
        <div className="grid grid-cols-4 gap-4 items-start">
          <div className="bg-white rounded p-6 col-start-1 col-end-4 flex flex-col gap-6 mb-2 shadow-xl">
            <Heading level={3} className="mb-4">
              Cart ({cart.total_items})
            </Heading>
            {cart.line_items.map((lineItem) => (
              <CartItem key={lineItem.id} item={lineItem} extended={true} />
            ))}
            {isCartEmpty ? (
              <p>
                Cart is empty.{" "}
                <Link href="/">
                  <a className="underline">Go back home</a>
                </Link>
              </p>
            ) : (
              <button
                onClick={() => emptyCart()}
                className="self-start text-sm text-gray-600 underline"
              >
                Empty the cart
              </button>
            )}
          </div>
          <div className="flex flex-col gap-4 bg-white rounded p-6 shadow-xl">
            <Heading level={3} className="pb-4">
              Checkout
            </Heading>
            <p>
              Total:{" "}
              <span className="font-bold">
                {cart.subtotal.formatted_with_symbol}
              </span>
            </p>
            <Button variant="primary" disabled={isCartEmpty} to="/checkout">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      ) : (
        "Loading cart..."
      )}
    </Layout>
  );
};

export default Cart;
