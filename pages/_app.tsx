import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { Router } from "next/router";
import NProgress from "nprogress";
import { Provider } from "react-redux";
import { commerce } from "../lib/commerce";
import { createStore } from "../store";
import "../styles/globals.css";
import "../styles/nprogress.css";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeError", NProgress.done);
Router.events.on("routeChangeComplete", NProgress.done);

function MyApp({ Component, pageProps }: AppProps) {
  const { merchant, categories } = pageProps;
  return (
    <Provider store={createStore({ merchant, categories })}>
      <Component {...pageProps} />
    </Provider>
  );
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
