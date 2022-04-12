import { Merchant } from "@chec/commerce.js/types/merchant";
import { Product } from "@chec/commerce.js/types/product";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import Link from "next/link";
import Layout from "../components/layout";
import { commerce } from "../lib/commerce";
import { useMerchant } from "../providers/merchant-provider";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { data: products } = await commerce.products.list({
    sortBy: "created",
  });

  return {
    props: {
      products,
    },
  };
};

interface Props {
  merchant: Merchant;
  products: Product[];
}

const Home: NextPage<Props> = ({ products }) => {
  const { merchant } = useMerchant();

  return (
    <Layout>
      <h1>{merchant.name}</h1>
      <p>{merchant.description}</p>
      <div>
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.permalink}`}>
            <a>{product.name}</a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
