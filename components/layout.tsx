import { FC } from "react";
import Footer from "./footer";
import Header from "./header";

const Layout: FC = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
