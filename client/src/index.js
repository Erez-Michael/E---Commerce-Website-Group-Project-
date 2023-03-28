import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { DataProvider } from "./components/contexts/DataContext";
import { SignInProvider } from "./components/contexts/SignInContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SignInProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </SignInProvider>
  </React.StrictMode>
);
