import { Product } from "@chec/commerce.js/types/product";
import { Variant } from "@chec/commerce.js/types/variant";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import Button from "../../components/atoms/button";
import Field from "../../components/atoms/field";
import Heading from "../../components/atoms/heading";
import Input from "../../components/atoms/input";
import Select from "../../components/atoms/select";
import Layout from "../../components/common/layout";
import ProductGrid from "../../components/organisms/product-grid";
import { commerce } from "../../lib/commerce";
import noImage from "../../public/no-photo.png";
import { useAddProductMutation } from "../../store/apis/cart";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (!context.params) {
    throw Error("No params");
  }
  const { permalink } = context.params;
  if (typeof permalink !== "string") {
    throw Error("Permalink is not a string");
  }

  const product = await commerce.products.retrieve(permalink, {
    type: "permalink",
  });

  return {
    props: {
      product,
    },
  };
};

interface Props {
  product: Product;
}

const Product: NextPage<Props> = ({ product }) => {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [assetIndex, setAssetIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const {
    id,
    name,
    description,
    price,
    assets,
    related_products,
    inventory: { managed, available },
    checkout_url,
    variant_groups,
  } = product;
  const [addProduct] = useAddProductMutation();
  const hasVariants = variant_groups.length > 0;

  async function handleAddToCart() {
    if (!hasVariants) await addProduct({ id, quantity });
    else if (variant)
      await addProduct({ id, quantity, variantData: variant.id });
  }

  function handleChangeQuantity(e: any) {
    const { value } = e.target;
    const q = parseInt(value, 10);
    setQuantity(q);
  }

  function handleBlur(e: any) {
    const { value } = e.target;
    let q = parseInt(value, 10);
    if (isNaN(q) || q <= 0) q = 1;
    if (managed && q > available) return setQuantity(available);
    setQuantity(q);
  }

  async function handleChangeOption(e: any) {
    const { value } = e.target;
    if (!value) return setVariant(null);

    const {
      data: [variant],
    } = await commerce.products.getVariants(id, { option_ids: [value] });
    setVariant(variant);
  }

  return (
    <Layout name={name}>
      <div className="flex flex-col gap-16">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex">
            {assets.length ? (
              <>
                <div className="flex flex-col">
                  {assets.map((asset, i) => (
                    <Image
                      key={asset.id}
                      src={asset.url}
                      width={96}
                      height={96}
                      objectFit="cover"
                      alt="Product image"
                      onClick={() => setAssetIndex(i)}
                      className="cursor-pointer opacity-50 transition-opacity hover:opacity-75"
                    />
                  ))}
                </div>
                <div className="relative flex-1 aspect-square">
                  <Image
                    src={assets[assetIndex].url}
                    alt="Product image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </>
            ) : (
              <Image src={noImage} width={256} height={256} alt="No image" />
            )}
          </div>
          <div>
            <Heading level={2} className="mb-8">
              {name}
            </Heading>
            <div className="border-t-1 border-accent mb-8"></div>
            <div className="flex flex-col gap-4">
              {hasVariants && (
                <div className="mb-4">
                  {variant_groups.map(({ id, name, options }) => (
                    <Field key={id} label={name}>
                      <Select onChange={handleChangeOption}>
                        <option value="">Select {name}</option>
                        {options.map(({ id, name, price }) => (
                          <option key={id} value={id}>
                            {name} (+{price.formatted_with_symbol})
                          </option>
                        ))}
                      </Select>
                    </Field>
                  ))}
                </div>
              )}
              {managed && (
                <p>
                  <span className="font-bold">{available}</span> items available
                </p>
              )}
              <p>
                <span className="text-xl font-bold">
                  {quantity > 1
                    ? price.raw * quantity
                    : price.formatted_with_symbol}
                </span>
                {quantity > 1 &&
                  ` (${quantity} × ${price.formatted_with_symbol})`}
              </p>
              <div className="flex gap-4">
                <Input
                  type="number"
                  className="w-20"
                  value={quantity}
                  onChange={handleChangeQuantity}
                  onBlur={handleBlur}
                />
                <Button
                  onClick={handleAddToCart}
                  disabled={hasVariants && !variant}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="primary"
                  disabled={hasVariants && !variant}
                  href={checkout_url.checkout}
                >
                  Buy now
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section>
          <Heading level={2} className="mb-4">
            Description
          </Heading>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </section>
        {!!related_products.length && (
          <section>
            <Heading level={2} className="mb-4">
              Related Products
            </Heading>
            <ProductGrid products={related_products} size="sm" />
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Product;
