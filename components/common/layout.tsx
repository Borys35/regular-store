import Head from "next/head";
import { FC } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import Footer from "./footer";
import Header from "./header/header";

interface Props {
  name: string;
}

const Layout: FC<Props> = ({ children, name }) => {
  const merchant = useAppSelector((state) => state.merchant);

  return (
    <div className="flex flex-col min-h-screen px-4 lg:px-8 max-w-7xl mx-auto">
      <Head>
        <title>
          {name} - {merchant.name}
        </title>
      </Head>
      <Header />
      <main className="flex-1 py-12">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
