import React from "react";
import { RoutesPage } from "./routes";
import { PixProvider } from "./Contexts/Pix";

const App: React.FC = () => {
  return (
    <PixProvider>
      <RoutesPage />
    </PixProvider>
  );
};

export default App;
