import { Merchant } from "@chec/commerce.js/types/merchant";
import { Product } from "@chec/commerce.js/types/product";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import Button from "../components/atoms/button";
import Heading from "../components/atoms/heading";
import Layout from "../components/common/layout";
import { useAppSelector } from "../hooks/useAppSelector";
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

const Home: NextPage<Props> = ({ products }) => {
  const merchant = useAppSelector((state) => state.merchant);
  const categories = useAppSelector((state) => state.categories);

  return (
    <Layout>
      <Heading level={1}>{merchant.name}</Heading>
      <p>{merchant.description}</p>
      <div>
        <div>
          {products.map((product) => (
            <Button key={product.id} to={`/products/${product.permalink}`}>
              {product.name}
            </Button>
          ))}
        </div>
        <div>
          {categories.map((category) => (
            <Button key={category.id} to={`/categories/${category.slug}`}>
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
