import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "jotai";
import App from "./App.tsx";
import { store } from "./states";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
