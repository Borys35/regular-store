import { FC } from "react";
import { useMerchant } from "../providers/merchant-provider";

const Footer: FC = () => {
  const {
    merchant: { name },
  } = useMerchant();

  return (
    <footer>
      <h1>{name}</h1>
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://www.github.com/Borys35"
          target="_blank"
          rel="noreferrer"
        >
          Borys Kaczmarek
        </a>
      </p>
    </footer>
  );
};

export default Footer;
