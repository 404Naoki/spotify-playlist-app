import "./App.css";
import React, { useState, useEffect } from "react";
import { getTokenFromUrl } from "./spotify";
import LoggedIn from "./components/home";
import Login from "./components/login";

const App: React.VFC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const hash = getTokenFromUrl();
    const token = hash.access_token;

    if (token) {
      setAccessToken(token);
    }
  }, []);

  return (
    <div className="App">
      {accessToken ? <LoggedIn accessToken={accessToken} /> : <Login />}
    </div>
  );
};

export default App;
