import { Merchant } from "@chec/commerce.js/types/merchant";
import { Product } from "@chec/commerce.js/types/product";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import Image from "next/image";
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
  const merchant = useAppSelector((state) => state.merchant) as any;
  const categories = useAppSelector((state) => state.categories);

  return (
    <Layout>
      <div className="relative py-4">
        {merchant.has.cover && (
          <div className="absolute top-0 bottom-0 left-1/3 right-0 -z-10">
            <Image
              src={merchant.images.cover.url}
              alt="Cover"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-radial from-transparent to-background"></div>
          </div>
        )}
        <Heading level={1} className="mb-8">
          The best
          <br />
          <span className="text-secondary">yerba mate</span>
          <br />
          experience
        </Heading>
        {/* <div
        dangerouslySetInnerHTML={{ __html: merchant.description }}
        className="mb-8 text-lg"
      ></div> */}
        <Button href="#discounts">Check out</Button>
      </div>
      <div id="discounts">
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
