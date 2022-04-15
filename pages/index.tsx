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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { data: products } = await commerce.products.list({
    sortBy: "created",
  });

  const { data: categories } = await commerce.categories.list();

  return {
    props: {
      products,
      categories,
    },
  };
};

interface Props {
  merchant: Merchant;
  products: Product[];
  categories: any;
}

const Home: NextPage<Props> = ({ products, categories, merchant }) => {
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
        {JSON.stringify(categories)}
      </div>
    </Layout>
  );
};

export default Home;
