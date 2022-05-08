import { LineItem } from "@chec/commerce.js/types/line-item";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { FaTrash } from "react-icons/fa";
import noPhoto from "../../public/no-photo.png";
import {
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "../../store/apis/cart";
import Button from "../atoms/button";
import Heading from "../atoms/heading";

interface Props {
  item: LineItem;
  extended?: boolean;
}

const CartItem: FC<Props> = ({ item, extended = false }) => {
  const { id, name, line_total, price, quantity, image, permalink, variant } =
    item;
  const [updateCart] = useUpdateCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  return (
    <div className="flex items-start gap-4">
      <Image
        src={image ? image.url : noPhoto}
        alt="Product"
        width={extended ? 96 : 64}
        height={extended ? 96 : 64}
        objectFit="cover"
      />
      <div className="flex-1 flex flex-col gap-1 text-left">
        <Heading level={extended ? 5 : 6}>
          <Link href={`/products/${permalink}`}>
            <a className="hover:underline">
              {name} {variant && "(variant)"}
            </a>
          </Link>
        </Heading>
        <p className={classNames({ "text-sm": !extended })}>
          {line_total.formatted_with_symbol} ({quantity} &#215;{" "}
          {price.formatted_with_symbol})
        </p>
        {extended && (
          <div className="flex gap-4 items-center">
            <Button
              size="xs"
              onClick={() => updateCart({ lineId: id, quantity: quantity - 1 })}
            >
              -
            </Button>
            <p>{quantity}</p>
            <Button
              size="xs"
              onClick={() => updateCart({ lineId: id, quantity: quantity + 1 })}
            >
              +
            </Button>
          </div>
        )}
      </div>
      {extended && (
        <FaTrash
          onClick={() => removeFromCart(id)}
          className="text-gray-600 self-center cursor-pointer transition-colors hover:text-red-600"
          size={16}
        />
      )}
    </div>
  );
};

export default CartItem;
