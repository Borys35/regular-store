import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import CustomerDetails from "../components/checkout/customer-details";
import PaymentDetails from "../components/checkout/payment-details";
import ShippingBillingDetails from "../components/checkout/shipping-billing-details";
import Layout from "../components/common/layout";
import { commerce } from "../lib/commerce";

enum CheckoutActionTypes {
  CUSTOMER = "CUSTOMER",
  SHIPPING = "SHIPPING",
  BILLING = "BILLING",
  LINE_ITEMS = "LINE_ITEMS",
  SHIPPING_METHOD = "SHIPPING_METHOD",
  PAYMENT = "PAYMENT",
}

const reducer = (
  state: CheckoutCapture,
  action: { type: CheckoutActionTypes; payload: Partial<CheckoutCapture> }
) => {
  switch (action.type) {
    case CheckoutActionTypes.CUSTOMER:
      return { ...state, customer: action.payload } as CheckoutCapture;
    case CheckoutActionTypes.SHIPPING:
      return { ...state, shipping: action.payload } as CheckoutCapture;
    case CheckoutActionTypes.BILLING:
      return { ...state, billing: action.payload } as CheckoutCapture;
    case CheckoutActionTypes.LINE_ITEMS:
      return { ...state, line_items: action.payload } as CheckoutCapture;
    case CheckoutActionTypes.SHIPPING_METHOD:
      return {
        ...state,
        fulfillment: { shipping_method: action.payload },
      } as CheckoutCapture;
    case CheckoutActionTypes.PAYMENT:
      return { ...state, payment: action.payload } as CheckoutCapture;
    default:
      return state;
  }
};

const initialState = {} as CheckoutCapture;

type StepType = 1 | 2 | 3;

const Checkout: NextPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [step, setStep] = useState<StepType>(1);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [validating, setValidating] = useState<boolean>(true);
  const [capturing, setCapturing] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (checkoutId) return;

      toast("Validating cart items...");
      const cart = await commerce.cart.retrieve();
      const { id } = await commerce.checkout.generateTokenFrom("cart", cart.id);

      for (const lineItem of cart.line_items) {
        const { available } = await commerce.checkout.checkQuantity(
          id,
          lineItem.id,
          {
            amount: lineItem.quantity,
          }
        );
        if (!available) {
          toast(() => (
            <span>
              Sorry, we don&apos;t have enough <strong>{lineItem.name}</strong>{" "}
              in stock.
            </span>
          ));
          router.push("/cart");
          return;
        }
      }

      setValidating(false);
      setCheckoutId(id);
    })();
  }, [checkoutId, router]);

  function changeStep(step: StepType) {
    setStep(step);
  }

  const handleShippingMethodSubmit = useCallback((id: string) => {
    dispatch({ type: CheckoutActionTypes.SHIPPING_METHOD, payload: id as any });
  }, []);

  const handlePaymentSubmit = async (data: any) => {
    if (!checkoutId) return;

    setCapturing(true);
    const expiry_month = data.card.expiry_date.slice(0, 2);
    const expiry_year = "20" + data.card.expiry_date.slice(3, 5);
    const payload = { ...data };
    payload.card = { ...payload.card, expiry_month, expiry_year };
    delete payload.card.expiry_date;
    dispatch({ type: CheckoutActionTypes.PAYMENT, payload });
    try {
      const d = state.payment ? state : { ...state, payment: payload };
      await commerce.checkout.capture(checkoutId, d);
      toast(`Thank You! Now we are taking care about your order.`);
      router.replace("/thank-you");
    } catch {
      toast("Something went wrong. Please try again later.");
      router.replace("/cart");
    }
  };

  return (
    <Layout name="Checkout">
      <h1 className="mb-14 text-center">Checkout (step {step})</h1>
      <div>
        {step === 1 && (
          <CustomerDetails
            loading={validating}
            state={state}
            onSubmit={(data) => {
              dispatch({ type: CheckoutActionTypes.CUSTOMER, payload: data });
              changeStep(2);
            }}
          />
        )}
        {step === 2 && (
          <ShippingBillingDetails
            checkoutId={checkoutId}
            onSubmit={(data) => {
              dispatch({
                type: CheckoutActionTypes.SHIPPING,
                payload: data.shipping,
              });
              if (data.billing)
                dispatch({
                  type: CheckoutActionTypes.BILLING,
                  payload: data.billing,
                });
              else
                dispatch({
                  type: CheckoutActionTypes.BILLING,
                  payload: data.shipping,
                });
              changeStep(3);
            }}
            onBack={() => changeStep(1)}
            shippingMethodId={state.fulfillment?.shipping_method}
            onShippingMethodSubmit={handleShippingMethodSubmit}
          />
        )}
        {step === 3 && (
          <PaymentDetails
            checkoutId={checkoutId}
            state={state}
            onSubmit={handlePaymentSubmit}
            loading={capturing}
          />
        )}
        <p className="mt-14 text-sm text-gray-500">
          Note: At checkout no changes in cart won&apos;t affect items in
          checkout
        </p>
      </div>
    </Layout>
  );
};

export default Checkout;
