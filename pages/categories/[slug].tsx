import { Category } from "@chec/commerce.js/types/category";
import { Product } from "@chec/commerce.js/types/product";
import { GetServerSideProps, NextPage } from "next";
import Heading from "../../components/atoms/heading";
import Layout from "../../components/common/layout";
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
  return (
    <Layout>
      <Heading level={1} className="mb-4">
        {category.name}
      </Heading>
      {products.length ? (
        <section>
          {products.map((product) => (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>
          ))}
        </section>
      ) : (
        "No products"
      )}
    </Layout>
  );
};

export default Category;
