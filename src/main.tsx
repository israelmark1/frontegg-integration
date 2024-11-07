// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FronteggProvider } from "@frontegg/react";

const contextOptions = {
  baseUrl: import.meta.env.VITE_FRONTEGG_BASE_URL as string,
  clientId: import.meta.env.VITE_FRONTEGG_CLIENT_ID as string,
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <FronteggProvider contextOptions={contextOptions} hostedLoginBox={false}>
      <App />
    </FronteggProvider>
);
