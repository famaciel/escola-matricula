import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { formatarCelular } from "../../Utils";
import CadastroAluno from "./Form/CadastroAluno";
import "./ListaAlunos.scss";
import ReactLoading from "react-loading";
import ReactSelect from "react-select";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFilePen } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";
import whatsappLogo from "../../Utils/whatsapp.png";

const ListaAlunos = () => {

  return (
    <div>
      <div className="students-header">
        <div className="students-header-title">
          <h2>Escola dos Sonhos - módulo de cadastro de matrícula</h2>
        </div>
      </div>

      {!alunos && (
        <div className="loading-students-container">
          <ReactLoading type="bars" color="#2684ff" height={50} width={50} />
        </div>
      )}
    </div>
  );
};

export default ListaAlunos;
