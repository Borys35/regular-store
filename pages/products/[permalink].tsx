import { Product } from "@chec/commerce.js/types/product";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Image from "next/image";
import Button from "../../components/atoms/button";
import Heading from "../../components/atoms/heading";
import Layout from "../../components/common/layout";
import ProductGrid from "../../components/organisms/product-grid";
import { commerce } from "../../lib/commerce";
import noImage from "../../public/no-photo.png";

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
  console.log(product);
  const { name, description, price, assets, related_products } = product;

  return (
    <Layout>
      <div className="flex flex-col gap-16">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex">
            {assets.length ? (
              <>
                <div className="flex flex-col">
                  {assets.map((asset) => (
                    <Image
                      key={asset.id}
                      src={asset.url}
                      width={96}
                      height={96}
                      alt="Product image"
                    />
                  ))}
                </div>
                <Image
                  src={assets[0].url}
                  width={256}
                  height={256}
                  alt="Product image"
                />
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
            <p className="mb-4 text-xl font-bold">
              {price.formatted_with_symbol}
            </p>
            <div className="flex gap-4">
              <Button>Add to Cart</Button>
              <Button variant="primary">Buy now</Button>
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
