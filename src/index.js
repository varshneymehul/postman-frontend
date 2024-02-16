import React from "react";
import "./index.css";
import App from "./components/App";
import { SearchContextProvider } from "./store/search-context";
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <SearchContextProvider>
    <App tab="home" />
  </SearchContextProvider>
);
