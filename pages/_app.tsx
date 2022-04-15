import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { commerce } from "../lib/commerce";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { merchant, categories } = pageProps;
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);
  const {
    data: [merchant],
  } = (await commerce.merchants.about()) as any;
  const { data: categories } = await commerce.categories.list();

  return { ...appProps, pageProps: { merchant, categories } };
};

export default MyApp;
