import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../atoms/button";
import Field from "../atoms/field";
import Heading from "../atoms/heading";
import Input from "../atoms/input";
import CheckoutForm from "./checkout-form";

interface Props {
  loading: boolean;
  state: CheckoutCapture;
  onSubmit: (data: any) => void;
}

const schema = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Check spelling of e-mail")
    .required("E-mail is required"),
});

const CustomerDetails: FC<Props> = ({ loading, state, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!state.customer) return;

    setValue("firstname", state.customer.firstname);
    setValue("lastname", state.customer.lastname);
    setValue("email", state.customer.email);
  });

  return (
    <CheckoutForm onSubmit={handleSubmit(onSubmit)}>
      <Heading level={2}>Customer</Heading>
      <Field label="First name" error={errors.firstname}>
        <Input {...register("firstname")} />
      </Field>
      <Field label="Last name" error={errors.lastname}>
        <Input {...register("lastname")} />
      </Field>
      <Field label="Your e-mail" error={errors.email}>
        <Input {...register("email")} />
      </Field>
      <Button variant="primary" loading={loading}>
        Submit
      </Button>
    </CheckoutForm>
  );
};

export default CustomerDetails;
