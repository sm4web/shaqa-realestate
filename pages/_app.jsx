import "../styles/globals.css";
import "../styles/googleMaps.scss";

import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";
import { store, persistor } from "../app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import NonAuthNav from "../components/General/Navbar";
import SideNav from "../components/General/Drawer";
import Footer from "../components/General/Footer";

const progress = new ProgressBar({
  size: 5,
  color: "#2C4CC9",
  className: "z-99",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <div className="flex flex-col min-h-screen h-screen">
          <NonAuthNav />
          <div className="flex-1 mt-[64px] xl:mt-[62px]">
            <Component {...pageProps} />
            <SideNav />
            <Footer />
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
