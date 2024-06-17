import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./pages/auth/Main.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {NextUIProvider} from "@nextui-org/react";




ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
    <NextUIProvider>
      <Main /> 
    </NextUIProvider>
    </BrowserRouter>
    <ToastContainer />
  </>
);
