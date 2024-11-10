// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FronteggProvider } from "@frontegg/react";

const contextOptions = {
  baseUrl: import.meta.env.VITE_FRONTEGG_BASE_URL || "",
  clientId: import.meta.env.VITE_FRONTEGG_CLIENT_ID || "",
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
      <App />
    </FronteggProvider>
);
