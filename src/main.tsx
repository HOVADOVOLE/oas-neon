import "./index.css";
import "./polyfills";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root")!;
createRoot(container).render(<App />);
