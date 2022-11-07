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
  const [alunos, setAlunos] = useState(null);
  const [nucleos, setNucleos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [search, setSearch] = useState({});

  const formatStudent = (student, nucleos) => {
    return {
      ...student,
      nucleo: nucleos.find((a) => a.id === student.idNucleo)?.nome,
      contatoResp01_formatado: formatarCelular(student.contatoResp01),
      contatoResp02_formatado: formatarCelular(student.contatoResp02),
    };
  };

  const loadStudents = useCallback(async () => {
    setAlunos(null);

    const { data: alunos } = await axios.get(
      "https://6ln1gs0gk9.execute-api.us-east-1.amazonaws.com/dev/alunosmatr/busca",
      {
        params: search,
      }
    );

    const { data: nucleos } = await axios.get(
      "https://6ln1gs0gk9.execute-api.us-east-1.amazonaws.com/dev/nucleos"
    );

    setNucleos(nucleos);

    setAlunos(
      alunos
        .map((st) => formatStudent(st, nucleos))
        .sort((a, b) => a.nome.localeCompare(b.nome))
    );
  }, [search]);

  const onSelectStudent = (st) => {
    setSelectedStudent(st);
    setShowForm(true);
  };

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const nucleoOptions = nucleos.map((a) => ({
    label: a.nome,
    value: a.id,
  }));

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      setSearch({
        ...search,
        [name]: value,
      });
    },
    [search]
  );

  const debouncedChangeHandler = useCallback(debounce(handleChange, 300), [
    search,
  ]);

  const openWhatsapp = (e, student, nomeResponsavel, telefoneResponsavel) => {
    e.stopPropagation(0);

    const text = `Queridas Famílias,

    Vamos iniciar o período de rematrícula e estamos encaminhando o link via WhatsApp, para efetivação do pré-cadastro das mesmas. \n
    
    Aluno(a): ${student.nome} \n
    Link: https://main.d3uj4l1bgcf4dv.amplifyapp.com/matricular/${student.id} \n
    
    As rematrículas acontecerão no período de 09/11/2022 à 25/11/2022, das 08h00min às 11h00min e das 13h30min às 17h00min, e como nossas vagas são limitadas, pedimos que finalizem até a data limite no setor financeiro da escola.`;

    window.open(
      `https://wa.me/+55${telefoneResponsavel}?text=${text}`,
      "_blank"
    );
  };

  const openMatricula = (e, student) => {
    e.stopPropagation(0);
    window.open(`/matricular/${student.id}`, "_blank");
  };

  return (
    <div>
      <div className="students-header">
        <div className="students-header-title">
          <h2>Alunos</h2>
          <p>Lista de alunos cadastrados</p>
        </div>

        <div className="students-header-actions">
          <div className="students-header-actions-combo">
            <input
              name="nome"
              placeholder="Nome aluno"
              onChange={debouncedChangeHandler}
            />
          </div>

          <div className="students-header-actions-combo">
            <input
              name="nomeResp"
              placeholder="Nome responsável"
              onChange={debouncedChangeHandler}
            />
          </div>

          <div className="students-header-actions-combo">
            <ReactSelect
              className="nucleo-select"
              options={[{ label: "Nenhum", value: null }, ...nucleoOptions]}
              placeholder="Núcleo"
              value={nucleoOptions.find((a) => a.value === search.nucleo)}
              onChange={(e) =>
                debouncedChangeHandler({
                  target: { name: "idnucleo", value: e.value },
                })
              }
            />
          </div>

          <button
            className="custom-button add-student-button"
            onClick={() => setShowForm(true)}
          >
            + Adicionar aluno
          </button>
        </div>
      </div>

      {!alunos && (
        <div className="loading-students-container">
          <ReactLoading type="bars" color="#2684ff" height={50} width={50} />
        </div>
      )}

      {alunos && (
        <div className="students">
          <div className="students-list-header">
            <h2>Aluno</h2>
            <h2>Responsáveis</h2>
            <h2>Contatos</h2>
            <h2>Ações</h2>
          </div>
          <ul className="students-list">
            {alunos.map((st) => (
              <li
                key={st.id}
                onClick={() => onSelectStudent(st)}
                className="student-row"
              >
                <div className="student-row-cell">
                  <p className="title">{st.nome}</p>
                  <p className="opacity">{st.nucleo || "--"}</p>
                </div>

                <div className="student-row-cell">
                  <p>{st.nomeResp01}</p>
                  <p>{st.nomeResp02}</p>
                </div>

                <div className="student-row-cell">
                  <p>{st.contatoResp01_formatado}</p>
                  <p>{st.contatoResp02_formatado}</p>
                </div>

                <div className="student-row-cell">
                  <div className="action-buttons">
                    <Tooltip
                      enterDelay={100}
                      leaveDelay={0}
                      title="Visualizar matrícula"
                    >
                      <button
                        onClick={(e) => openMatricula(e, st)}
                        className="round-clickable-icon"
                        disabled={!st.foiMatriculado}
                      >
                        <FontAwesomeIcon
                          size="lg"
                          color="#2684ff"
                          icon={faFile}
                        />
                      </button>
                    </Tooltip>

                    <Tooltip
                      enterDelay={100}
                      leaveDelay={0}
                      title="Editar matricula"
                    >
                      <button
                        onClick={(e) => openMatricula(e, st)}
                        className="round-clickable-icon"
                      >
                        <FontAwesomeIcon
                          size="lg"
                          color="#2684ff"
                          icon={faFilePen}
                        />
                      </button>
                    </Tooltip>

                    <Tooltip
                      enterDelay={100}
                      leaveDelay={0}
                      title="Enviar mensagem responsável #1"
                    >
                      <button
                        onClick={(e) =>
                          openWhatsapp(e, st, st.nomeResp01, st.contatoResp01)
                        }
                        className="round-clickable-icon"
                      >
                        <img
                          className="whatsapp-icon"
                          src={whatsappLogo}
                          alt="Logo whatsapp"
                        />
                      </button>
                    </Tooltip>

                    <Tooltip
                      enterDelay={100}
                      leaveDelay={0}
                      title="Enviar mensagem responsável #2"
                    >
                      <button
                        onClick={(e) =>
                          openWhatsapp(e, st, st.nomeResp02, st.contatoResp02)
                        }
                        className="round-clickable-icon"
                      >
                        <img
                          className="whatsapp-icon"
                          src={whatsappLogo}
                          alt="Logo whatsapp"
                        />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={`animator ${showForm && "show"} student-form-container`}>
        {showForm && (
          <CadastroAluno
            closeForm={(shouldLoadStudents) => {
              setShowForm(false);
              setSelectedStudent(null);

              if (shouldLoadStudents) loadStudents();
            }}
            nucleos={nucleos}
            student={selectedStudent}
          />
        )}
      </div>
    </div>
  );
};

export default ListaAlunos;
