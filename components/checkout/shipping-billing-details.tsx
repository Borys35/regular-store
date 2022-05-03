import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { commerce } from "../../lib/commerce";
import Button from "../atoms/button";
import Field from "../atoms/field";
import Heading from "../atoms/heading";
import Input from "../atoms/input";
import Select from "../atoms/select";
import CheckoutForm from "./checkout-form";

interface Props {
  checkoutId: string | null;
  onSubmit: (data: any) => void;
  onBack: () => void;
  onShippingMethodSubmit: (id: string) => void;
}

const formSchema = yup.object({
  name: yup.string().required("Full name is required"),
  street: yup.string().required("Street is required"),
  street2: yup.string().optional(),
  town_city: yup.string().required("Town/City is required"),
  postal_zip_code: yup.string().required("Postal/Zip code is required"),
  country: yup.string().required("Country is required"),
  county_state: yup.string().required("County/State is required"),
});

const schema = yup.object({
  shipping: formSchema,
  billing: formSchema.default(undefined),
});

const ShippingBillingDetails: FC<Props> = ({
  checkoutId,
  onSubmit,
  onBack,
  onShippingMethodSubmit,
}) => {
  const [same, setSame] = useState(true);
  const [countries, setCountries] = useState<{ [name: string]: string } | null>(
    null
  );
  const [subdivisions, setSubdivisions] = useState<{
    [name: string]: string;
  } | null>(null);
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  // #region Receiving countries and subdivisions
  const receiveCountries = useCallback(async () => {
    if (!checkoutId) return;

    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutId
    );
    setCountries(countries);
  }, [checkoutId]);

  const receiveSubdivisions = useCallback(
    async (countryCode: string) => {
      if (!checkoutId) return;

      const { subdivisions } =
        await commerce.services.localeListShippingSubdivisions(
          checkoutId,
          countryCode
        );
      setSubdivisions(subdivisions);
    },
    [checkoutId]
  );
  // #endregion

  const country = watch("shipping.country");
  const subdivision = watch("shipping.subdivision");
  useEffect(() => {
    setValue("shipping.county_state", "");
    setSubdivisions(null);
    if (!country) return;

    receiveSubdivisions(country);
  }, [country, receiveSubdivisions, setValue]);

  useEffect(() => {
    receiveCountries();
  }, [receiveCountries]);

  useEffect(() => {
    if (!checkoutId || !country) return;
    (async () => {
      const [{ id }] = await commerce.checkout.getShippingOptions(checkoutId, {
        country,
        region: subdivision,
      });
      onShippingMethodSubmit(id);
    })();
  }, [checkoutId, country, subdivision, onShippingMethodSubmit]);

  return (
    <div>
      <CheckoutForm onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-6">
            <Heading level={2}>Shipping{same && " and Billing"}</Heading>
            <Field
              label="Full name"
              error={errors.shipping && errors.shipping.name}
            >
              <Input {...register("shipping.name")} />
            </Field>
            <Field
              label="Street"
              error={errors.shipping && errors.shipping.street}
            >
              <Input {...register("shipping.street")} />
            </Field>
            <Field
              label="Street 2"
              error={errors.shipping && errors.shipping.street_2}
            >
              <Input {...register("shipping.street_2")} />
            </Field>
            <Field
              label="Town/City"
              error={errors.shipping && errors.shipping.town_city}
            >
              <Input {...register("shipping.town_city")} />
            </Field>
            <Field
              label="Postal/Zip code"
              error={errors.shipping && errors.shipping.postal_zip_code}
            >
              <Input {...register("shipping.postal_zip_code")} />
            </Field>
            <Field
              label="Country"
              error={errors.shipping && errors.shipping.country}
            >
              <Select {...register("shipping.country")}>
                <option value="">Select country</option>
                {countries &&
                  Object.keys(countries).map((country) => (
                    <option
                      key={country}
                      value={country}
                      onClick={() => {
                        setSubdivisions(null);
                        receiveSubdivisions(country);
                      }}
                    >
                      {countries[country]}
                    </option>
                  ))}
              </Select>
            </Field>
            <Field
              label="County/State"
              error={errors.shipping && errors.shipping.county_state}
            >
              <Select {...register("shipping.county_state")}>
                <option value="">Select county/state</option>
                {subdivisions &&
                  Object.keys(subdivisions).map((subdivision) => (
                    <option key={subdivision} value={subdivision}>
                      {subdivisions[subdivision]}
                    </option>
                  ))}
              </Select>
            </Field>
            <Field label="Billing address same as shipping?">
              <Input
                type="checkbox"
                checked={same}
                onChange={() => setSame(!same)}
              />
            </Field>
          </div>
          {!same && (
            <div className="flex flex-col gap-6">
              <Heading level={2}>Billing</Heading>
              <Field
                label="Full name"
                error={errors.billing && errors.billing.name}
              >
                <Input {...register("billing.name")} />
              </Field>
              <Field
                label="Street"
                error={errors.billing && errors.billing.street}
              >
                <Input {...register("billing.street")} />
              </Field>
              <Field
                label="Street 2"
                error={errors.billing && errors.billing.street_2}
              >
                <Input {...register("billing.street_2")} />
              </Field>
              <Field
                label="Town/City"
                error={errors.billing && errors.billing.town_city}
              >
                <Input {...register("billing.town_city")} />
              </Field>
              <Field
                label="Zip code"
                error={errors.billing && errors.billing.postal_zip_code}
              >
                <Input {...register("billing.postal_zip_code")} />
              </Field>
              <Field
                label="Country"
                error={errors.billing && errors.billing.country}
              >
                <Select {...register("billing.country")}>
                  {countries &&
                    Object.keys(countries).map((country) => (
                      <option
                        key={country}
                        value={country}
                        onClick={() => {
                          setSubdivisions(null);
                          receiveSubdivisions(country);
                        }}
                      >
                        {countries[country]}
                      </option>
                    ))}
                </Select>
              </Field>
              <Field
                label="County/State"
                error={errors.billing && errors.billing.county_state}
              >
                <Select {...register("billing.county_state")}>
                  {subdivisions &&
                    Object.keys(subdivisions).map((subdivision) => (
                      <option key={subdivision} value={subdivision}>
                        {subdivisions[subdivision]}
                      </option>
                    ))}
                </Select>
              </Field>
            </div>
          )}
        </div>
        <div className="flex gap-6">
          <Button
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
          >
            Back
          </Button>
          <Button variant="primary">Submit</Button>
        </div>
      </CheckoutForm>
    </div>
  );
};

export default ShippingBillingDetails;
