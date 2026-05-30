import { useState } from "react";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import "./index.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  if (!token) {
    return <Auth setToken={setToken} />;
  }

  return <Dashboard setToken={setToken} />;
}

export default App;