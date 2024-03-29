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
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
          <div className="flex-1 pb-12">
            <ToastContainer position="bottom-center" autoClose={1500} />
            <Component {...pageProps} />
            <SideNav />
          </div>
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
