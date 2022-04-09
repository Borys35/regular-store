import { Product } from "@chec/commerce.js/types/product";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { commerce } from "../../lib/commerce";

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
  console.log("efdfdf", product);

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
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price.formatted_with_symbol}</p>
    </div>
  );
};

export default Product;
