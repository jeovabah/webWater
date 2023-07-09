import { Route, Routes } from "react-router-dom";
import { Home } from "../Home";

export const RoutesPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};
