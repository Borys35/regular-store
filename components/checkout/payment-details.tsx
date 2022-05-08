import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
import { Price } from "@chec/commerce.js/types/price";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import * as yup from "yup";
import { commerce } from "../../lib/commerce";
import { useRetrieveCartQuery } from "../../store/apis/cart";
import Button from "../atoms/button";
import CleaveInput from "../atoms/cleave-input";
import Field from "../atoms/field";
import Heading from "../atoms/heading";
import Input from "../atoms/input";
import Radio from "../atoms/radio";

interface Props {
  onSubmit: (data: any) => void;
  state: CheckoutCapture;
  checkoutId: string | null;
  loading: boolean;
}

const schema = yup.object({
  gateway: yup.string().nullable().required("Gateway is required"),
  card: yup.object({
    number: yup.string().required("Card number is required"),
    expiry_date: yup.string().required("Expiry month is required"),
    cvc: yup
      .string()
      .required("CVC is required")
      .min(3, "CVC must be 3 digits")
      .max(4, "CVC must be 4 digits"),
    postal_zip_code: yup.string().required("Postal code is required"),
  }),
});

const PaymentDetails: FC<Props> = ({
  onSubmit,
  state,
  checkoutId,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [shippingPrice, setShippingPrice] = useState<Price>();
  const { data: cart, isLoading } = useRetrieveCartQuery();

  useEffect(() => {
    (async () => {
      if (!checkoutId) return;

      const { price } = await commerce.checkout.checkShippingOption(
        checkoutId,
        {
          shipping_option_id: state.fulfillment?.shipping_method || "",
          country: state.shipping?.country || "",
        }
      );
      setShippingPrice(price);
    })();
  }, [checkoutId, state.fulfillment, state.shipping]);

  console.log(watch("gateway"));

  return (
    <form
      className="flex flex-col gap-8 max-w-lg mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading level={2}>Payment</Heading>
      {cart && shippingPrice ? (
        <div className="flex gap-3">
          <div className="w-1 bg-secondary rounded-full"></div>
          <div className="flex flex-col gap-4 text-lg">
            <p>
              Cart subtotal:{" "}
              <strong>{cart.subtotal.formatted_with_symbol}</strong>
            </p>
            <p>
              Shipping price:{" "}
              <strong>{shippingPrice.formatted_with_symbol}</strong>
            </p>
            <p className="text-xl">
              &gt; Total:{" "}
              <strong>
                $
                {Math.round((cart.subtotal.raw + shippingPrice.raw) * 100) /
                  100}
              </strong>
            </p>
          </div>
        </div>
      ) : (
        <FaSpinner size={24} className="inline animate-spin" />
      )}
      <div className="h-4"></div>
      <Field label="Gateway" error={errors.gateway}>
        <Radio
          value="test_gateway"
          label="Test Gateway (Correct values in placeholders)"
          {...register("gateway")}
        />
      </Field>
      <div
        className={`grid grid-cols-3 gap-6 text-white bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 
                      p-8 rounded-3xl items-end`}
      >
        <Field
          label="Card Number"
          className="col-start-1 col-end-4"
          error={errors.card && errors.card.number}
        >
          <Controller
            name="card.number"
            control={control}
            render={({ field }) => (
              <CleaveInput
                options={{ creditCard: true }}
                placeholder="4242424242424242"
                {...field}
              />
            )}
          />
        </Field>
        <Field label="Expires" error={errors.card && errors.card.expiry_date}>
          <Controller
            name="card.expiry_date"
            control={control}
            render={({ field }) => (
              <CleaveInput
                options={{ date: true, datePattern: ["m", "y"] }}
                placeholder="02/24"
                {...field}
              />
            )}
          />
        </Field>
        <Field label="CVC (CVV)" error={errors.card && errors.card.cvc}>
          <Input {...register("card.cvc")} placeholder="123" />
        </Field>
        <Field
          label="Postal/Zip Code"
          error={errors.card && errors.card.postal_zip_code}
        >
          <Input {...register("card.postal_zip_code")} placeholder="94107" />
        </Field>
      </div>
      <Button variant="primary" loading={isLoading || loading}>
        Pay
      </Button>
    </form>
  );
};

export default PaymentDetails;
