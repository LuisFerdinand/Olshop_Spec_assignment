// eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import App from "./App"; // Import the App component
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router> {/* Wrap your entire app in BrowserRouter */}
    <App />
  </Router>
);

