import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./App.css"; // 确保引入了包含 Tailwind CSS 的样式文件

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
