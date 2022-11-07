import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListaAlunos from "./Pages/Alunos/ListaAlunos";
import Menu from "./Components/Menu/Menu";
import FormularioMatricula from "./Pages/Matricula/FormularioMatricula/FormularioMatricula";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListaAlunos />,
  },
  {
    path: "/matricular/:studentId",
    element: <FormularioMatricula />,
  },
]);

root.render(
  <React.StrictMode>
    <Menu />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
