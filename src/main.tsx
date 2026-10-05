import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { initializeAuthFromRedirect } from "./api/auth";
import "./styles/index.css";

initializeAuthFromRedirect();

createRoot(document.getElementById("root")!).render(<App />);
