import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
//import { Dashboard } from "../pages/Dashboard";
// import { Repo } from "../pages/Repo";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Repo = React.lazy(() => import("../pages/Repo"));
export const Rotas: React.FC = () => {
  return (
    <React.Suspense fallback={"Loading..."}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/repositories/:repository" element={<Repo />} />
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  );
};
