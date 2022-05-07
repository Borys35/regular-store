import { GetShippingOptionsResponse } from "@chec/commerce.js/features/checkout";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { commerce } from "../../lib/commerce";
import Button from "../atoms/button";
import Field from "../atoms/field";
import Heading from "../atoms/heading";
import Input from "../atoms/input";
import Radio from "../atoms/radio";
import Select from "../atoms/select";
import CheckoutForm from "./checkout-form";

interface Props {
  checkoutId: string | null;
  onSubmit: (data: any) => void;
  onBack: () => void;
  shippingMethodId?: string;
  onShippingMethodSubmit: (id: string) => void;
}

const formSchema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  street: yup.string().required("Street is required"),
  street2: yup.string().optional(),
  town_city: yup.string().required("Town/City is required"),
  postal_zip_code: yup.string().required("Postal/Zip code is required"),
  country: yup.string().required("Country is required"),
  county_state: yup.string().required("County/State is required"),
});

const schema = yup.object().shape({
  shipping: formSchema,
  billing: formSchema.default(undefined),
});

type SelectType = { [name: string]: string } | null;

const ShippingBillingDetails: FC<Props> = ({
  checkoutId,
  onSubmit,
  onBack,
  shippingMethodId,
  onShippingMethodSubmit,
}) => {
  const [same, setSame] = useState(true);
  const [shippingCountries, setShippingCountries] = useState<SelectType>(null);
  const [shippingSubdivisions, setShippingSubdivisions] =
    useState<SelectType>(null);
  const [allCountries, setAllCountries] = useState<SelectType>(null);
  const [allSubdivisions, setAllSubdivisions] = useState<SelectType>(null);
  const [shippingOptions, setShippingOptions] =
    useState<GetShippingOptionsResponse[]>();
  const {
    register,
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
    setShippingCountries(countries);
  }, [checkoutId]);

  const receiveSubdivisions = useCallback(
    async (countryCode: string) => {
      if (!checkoutId) return;

      const { subdivisions } =
        await commerce.services.localeListShippingSubdivisions(
          checkoutId,
          countryCode
        );
      setShippingSubdivisions(subdivisions);
    },
    [checkoutId]
  );
  // #endregion

  useEffect(() => {
    (async () => {
      const { countries } = await commerce.services.localeListCountries();
      setAllCountries(countries);
    })();
  }, []);

  const billingCountry = watch("billing.country");
  useEffect(() => {
    if (same) return;

    (async () => {
      setValue("billing.county_state", undefined);
      setAllSubdivisions(null);
      if (!billingCountry) return;

      const { subdivisions } = await commerce.services.localeListSubdivisions(
        billingCountry
      );
      setAllSubdivisions(subdivisions);
    })();
  }, [same, billingCountry, setValue]);

  const shippingCountry = watch("shipping.country");
  const shippingSubdivision = watch("shipping.subdivision");
  useEffect(() => {
    setValue("shipping.county_state", "");
    setShippingSubdivisions(null);
    if (!shippingCountry) return;

    receiveSubdivisions(shippingCountry);
  }, [shippingCountry, receiveSubdivisions, setValue]);

  useEffect(() => {
    receiveCountries();
  }, [receiveCountries]);

  useEffect(() => {
    setShippingOptions(undefined);
    if (!checkoutId || !shippingCountry) return;
    (async () => {
      const options = await commerce.checkout.getShippingOptions(checkoutId, {
        country: shippingCountry,
        region: shippingSubdivision,
      });
      setShippingOptions(options);
      if (options.length) onShippingMethodSubmit(options[0].id);
    })();
  }, [
    checkoutId,
    shippingCountry,
    shippingSubdivision,
    onShippingMethodSubmit,
  ]);

  function renderFormFields(
    name: string,
    countries: SelectType,
    subdivisions: SelectType
  ) {
    return (
      <>
        <Field label="Full name" error={errors[name] && errors[name].name}>
          <Input {...register(`${name}.name`)} />
        </Field>
        <Field label="Street" error={errors[name] && errors[name].street}>
          <Input {...register(`${name}.street`)} />
        </Field>
        <Field label="Street 2" error={errors[name] && errors[name].street_2}>
          <Input {...register(`${name}.street_2`)} />
        </Field>
        <Field label="Town/City" error={errors[name] && errors[name].town_city}>
          <Input {...register(`${name}.town_city`)} />
        </Field>
        <Field
          label="Postal/Zip code"
          error={errors[name] && errors[name].postal_zip_code}
        >
          <Input {...register(`${name}.postal_zip_code`)} />
        </Field>
        <Field label="Country" error={errors[name] && errors[name].country}>
          <Select {...register(`${name}.country`)}>
            <option value="">Select country</option>
            {countries &&
              Object.keys(countries).map((country) => (
                <option
                  key={country}
                  value={country}
                  onClick={() => {
                    setShippingSubdivisions(null);
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
          error={errors[name] && errors[name].county_state}
        >
          <Select {...register(`${name}.county_state`)}>
            <option value="">Select county/state</option>
            {subdivisions &&
              Object.keys(subdivisions).map((subdivision) => (
                <option key={subdivision} value={subdivision}>
                  {subdivisions[subdivision]}
                </option>
              ))}
          </Select>
        </Field>
      </>
    );
  }

  return (
    <div>
      <CheckoutForm onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-6">
            <Heading level={2}>Shipping{same && " and Billing"}</Heading>
            {renderFormFields(
              "shipping",
              shippingCountries,
              shippingSubdivisions
            )}
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
              {renderFormFields("billing", allCountries, allSubdivisions)}
            </div>
          )}
        </div>
        {shippingOptions && (
          <div>
            <Heading level={2} className="mb-4">
              Shipping method
            </Heading>
            <div className="flex flex-col gap-2">
              {shippingOptions.map(({ id, description, price }) => (
                <Radio
                  key={id}
                  value={id}
                  checked={shippingMethodId === id}
                  onChange={(e) => onShippingMethodSubmit(e.target.value)}
                  label={`${description} - ${price.formatted_with_symbol}`}
                />
              ))}
            </div>
          </div>
        )}
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
