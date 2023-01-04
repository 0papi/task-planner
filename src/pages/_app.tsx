import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import store, { persistor } from "../store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <GeistProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </GeistProvider>
        </PersistGate>
      </Provider>
    </main>
  );
}
