import Head from "next/head";
import { FC } from "react";
import Footer from "./footer";
import Header from "./header/header";

const Layout: FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen px-4 lg:px-8 max-w-7xl mx-auto">
      <Head>
        <title>name | Good mate</title>
      </Head>
      <Header />
      <main className="flex-1 py-12">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
