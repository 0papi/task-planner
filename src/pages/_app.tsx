import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import store from "../store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Provider store={store}>
        <GeistProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </GeistProvider>
      </Provider>
    </main>
  );
}
