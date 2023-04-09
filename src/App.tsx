import React from "react";
import { Rotas } from "./routes";
import { GlobalStyle } from "./global";

const App: React.FC = () => {
  return (
    <>
      <Rotas />
      <GlobalStyle />
    </>
  );
};

export default App;
