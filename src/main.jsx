import "./App.css";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ServiceProvider } from "./context/service.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ServiceProvider>
      <App />
    </ServiceProvider>
  </BrowserRouter>
);
