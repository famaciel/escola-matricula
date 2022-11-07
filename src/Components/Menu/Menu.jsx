import React from "react";
import "./Menu.scss";
import logo from "../../Utils/logo.jpg";

const Menu = () => {
  const { pathname } = window.location;

  if (pathname.includes("matricular")) return;

  return (
    <div className="menu">
      <h1>
        <img src={logo} alt="logo" />
      </h1>

      {/* <div className="menu-list">
        <button>Alunos</button>
        <button>Contratos</button>
      </div> */}
    </div>
  );
};

export default Menu;
