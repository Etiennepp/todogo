import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Head from "next/dist/shared/lib/head";

export default function App({ Component, pageProps }: AppProps) {
     const persistor = persistStore(store);
     return (
          <Provider store={store}>
               <PersistGate loading={null} persistor={persistor}>
                    <UserProvider>
                         <Head>
                              <title>TodoGo</title>
                         </Head>
                         <Component {...pageProps} />
                    </UserProvider>
               </PersistGate>
          </Provider>
     );
}
