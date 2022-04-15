import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer>
      <h1>Name</h1>
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
