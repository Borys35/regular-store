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
import ProductCard from "../components/organisms/product-card";
import ProductGrid from "../components/organisms/product-grid";
import { useAppSelector } from "../hooks/useAppSelector";
import { commerce } from "../lib/commerce";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { data: products } = await commerce.products.list();

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
}

const Home: NextPage<Props> = ({ products }) => {
  const merchant = useAppSelector((state) => state.merchant) as any;

  return (
    <Layout name="Home">
      <div className="flex flex-col gap-24">
        <section id="hero" className="relative py-4">
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
          <Heading level={1} className="mb-8 leading-relaxed">
            The best
            <br />
            <span className="text-secondary">yerba mate</span>
            <br />
            experience
          </Heading>
          <Button href="#recommended" variant="primary" size="lg">
            Dive into this
          </Button>
        </section>
        <section
          id="recommended"
          className="rounded-2xl bg-white shadow-xl px-16 py-12 grid grid-cols-3"
        >
          <Heading level={2} className="pt-16">
            We think everybody should try it!
          </Heading>
          <div className="relative col-start-2 col-end-4">
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
              <ProductCard product={products[0]} size="lg" />
            </div>
          </div>
        </section>
        <section id="new-arrivals">
          <Heading level={2} className="mb-4">
            New Arrivals
          </Heading>
          <ProductGrid products={products} />
        </section>
        <section id="discounts">
          <Heading level={2} className="mb-4">
            Discounts
          </Heading>
          <ProductGrid products={products} />
        </section>
        <section id="bestsellers">
          <Heading level={2} className="mb-4">
            Bestsellers
          </Heading>
          <ProductGrid products={products} />
        </section>
        <section
          id="newsletter"
          className="rounded-2xl bg-white shadow-xl px-16 py-12 text-center"
        >
          <Heading level={2} className="mb-4">
            Join to our <span className="text-secondary">Newsletter</span>
          </Heading>
          <p className="text-lg mb-8">
            Join to our newsletter to get the best offers first!
          </p>
          <Button variant="primary">Subscribe</Button>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
