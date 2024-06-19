import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {NextUIProvider} from "@nextui-org/react";




ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
    <NextUIProvider>
      <App  /> 
    </NextUIProvider>
    </BrowserRouter>
    <ToastContainer />
  </>
);
