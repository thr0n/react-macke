import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Firebase, { FirebaseContext } from "./firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
registerServiceWorker();
