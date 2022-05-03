import { Category } from "@chec/commerce.js/types/category";
import { Product } from "@chec/commerce.js/types/product";
import { GetServerSideProps, NextPage } from "next";
import Heading from "../../components/atoms/heading";
import Layout from "../../components/common/layout";
import ProductGrid from "../../components/organisms/product-grid";
import { commerce } from "../../lib/commerce";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  if (typeof slug !== "string") throw Error("slug is not a string");

  const category = await commerce.categories.retrieve(slug, { type: "slug" });
  const { data: products } = await commerce.products.list({
    category_slug: [slug],
  });

  return {
    props: {
      category,
      products: products || [],
    },
  };
};

interface Props {
  category: Category;
  products: Product[];
}

const Category: NextPage<Props> = ({ category, products }) => {
  const { name, description } = category;

  return (
    <Layout name={name}>
      <Heading level={1} className="mb-4">
        {name}
      </Heading>
      <div
        className="text-lg mb-8"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      <ProductGrid products={products} />
    </Layout>
  );
};

export default Category;
