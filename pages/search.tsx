import { Product } from "@chec/commerce.js/types/product";
import { GetServerSideProps, NextPage } from "next";
import Heading from "../components/atoms/heading";
import Layout from "../components/common/layout";
import ProductGrid from "../components/organisms/product-grid";
import { commerce } from "../lib/commerce";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { q } = context.query;

  const { data: products } = await commerce.products.list({
    query: q || false,
  });

  return {
    props: {
      q,
      products: products || [],
    },
  };
};

interface Props {
  q?: string;
  products: Product[];
}

const Search: NextPage<Props> = ({ q, products }) => {
  return (
    <Layout name={`Searching "q"`}>
      <Heading level={1} className="mb-4">
        Searching for <span className="text-secondary">&quot;{q}&quot;</span>
      </Heading>
      <ProductGrid products={products} />
    </Layout>
  );
};

export default Search;
