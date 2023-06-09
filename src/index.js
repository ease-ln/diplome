import "react-app-polyfill/ie9"; // For IE 9-11 support
import "react-app-polyfill/ie11"; // For IE 11 support
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

const warn = console.warn;
export function logWarning(...warnings) {
  let showWarning = true;
  warnings.forEach((warning) => {
    if (warning.includes("UNSAFE_") || warning.includes("SourceMap") || warning.includes("DevTools")) showWarning = false;
  });
  if (showWarning) warn(...warnings);
}

console.warn = logWarning;
