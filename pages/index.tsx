import { Merchant } from "@chec/commerce.js/types/merchant";
import { Product } from "@chec/commerce.js/types/product";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import Link from "next/link";
import { commerce } from "../lib/commerce";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { data: products } = await commerce.products.list({
    sortBy: "created",
  });
  const {
    data: [merchant],
  } = (await commerce.merchants.about()) as any;

  return {
    props: {
      merchant,
      products,
    },
  };
};

interface Props {
  merchant: Merchant;
  products: Product[];
}

const Home: NextPage<Props> = ({ merchant, products }) => {
  return (
    <div>
      <h1>{merchant.name}</h1>
      <p>{merchant.description}</p>
      <div>
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.permalink}`}>
            <a>{product.name}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
