import { Product } from "@chec/commerce.js/types/product";
import Link from "next/link";
import { FC } from "react";
import ProductCard from "./product-card";

interface Props {
  products: Product[];
  size?: "sm" | "md" | "lg";
}

const ProductGrid: FC<Props> = ({ products, size }) => {
  return (
    <>
      {products.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} size={size} />
          ))}
        </div>
      ) : (
        <p className="text-lg text-red-600">
          No products found.{" "}
          <Link href="/">
            <a className="underline">Go back home</a>
          </Link>
        </p>
      )}
    </>
  );
};

export default ProductGrid;
