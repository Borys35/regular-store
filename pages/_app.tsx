import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { commerce } from "../lib/commerce";
import { MerchantProvider } from "../providers/merchant-provider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { merchant } = pageProps;
  return (
    <MerchantProvider value={{ merchant }}>
      <Component {...pageProps} />
    </MerchantProvider>
  );
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);
  const {
    data: [merchant],
  } = (await commerce.merchants.about()) as any;
  return { ...appProps, pageProps: { merchant } };
};

export default MyApp;
