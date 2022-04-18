import { Product } from "@chec/commerce.js/types/product";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import noImage from "../../public/no-photo.png";
import Heading from "../atoms/heading";

interface Props {
  product: Product;
  size?: "sm" | "md" | "lg";
}

const ProductCard: FC<Props> = ({ product, size = "md" }) => {
  const { name, price, permalink, image } = product;

  const dim =
    size === "sm" ? 192 : size === "md" ? 256 : size === "lg" ? 384 : 32;

  return (
    <div className="inline-block text-center">
      <Link href={`/products/${permalink}`}>
        <a>
          <Image
            src={image ? image.url : noImage}
            width={dim}
            height={dim}
            alt={permalink}
            objectFit="cover"
          />
        </a>
      </Link>
      <Link href={`/products/${permalink}`}>
        <a>
          <Heading level={4}>{name}</Heading>
        </a>
      </Link>
      <span>{price.formatted_with_symbol}</span>
    </div>
  );
};

export default ProductCard;
