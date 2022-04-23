import { FC } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import Heading from "../atoms/heading";

const Footer: FC = () => {
  const merchant = useAppSelector((state) => state.merchant);

  return (
    <footer className="relative py-6 lg:py-8 bg-secondary text-white before:absolute before:left-1/2 before:-translate-x-1/2 before:w-screen before:bottom-0 before:top-0 before:-z-10 before:bg-secondary">
      <Heading level={2}>{merchant.name}</Heading>
      <p className="text-sm mt-8 text-gray-100">
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://www.github.com/Borys35"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Borys Kaczmarek
        </a>
      </p>
    </footer>
  );
};

export default Footer;
