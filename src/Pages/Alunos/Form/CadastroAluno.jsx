import { useState } from "react";
import "./CadastroAluno.scss";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ReactLoading from "react-loading";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactInputMask from "react-input-mask";

const CadastroAluno = ({ closeForm, nucleos, student: studentToUpdate }) => {
  const [student, setStudent] = useState(
    studentToUpdate || {
      ano: 0,
      nomeResp01: "",
      nomeResp02: "",
      contatoResp01: "",
      contatoResp02: "",
      ehFidelidade: false,
      foiMatriculado: false,
      nome: "",
      temIrmao: false,
      idNucleo: "",
    }
  );

  const [loading, setLoading] = useState(false);

  const nucleoOptions = nucleos.map((a) => ({
    label: a.nome,
    value: a.id,
  }));

  const onChangeValue = (e) => {
    const { name } = e.target;
    let { value } = e.target;

    if (["contatoResp01", "contatoResp02"].includes(name)) {
      value = value
        .replace("(", "")
        .replace(")", "")
        .replace("(", "")
        .replace(/_/g, "")
        .replace(" ", "")
        .replace("-", "");
    }

    setStudent({
      ...student,
      [name]: value,
    });
  };

  const onSubmitForm = async () => {
    try {
      setLoading(true);

      if (student.id) {
        await axios.put(
          `https://6ln1gs0gk9.execute-api.us-east-1.amazonaws.com/dev/alunosmatr/${student.id}`,
          student
        );
      } else {
        await axios.post(
          `https://6ln1gs0gk9.execute-api.us-east-1.amazonaws.com/dev/alunosmatr`,
          student
        );
      }

      closeForm(true);
    } catch (err) {
      console.error("ERRO SUBMIT: ", err);
    } finally {
      setLoading(false);
    }
  };

  const removeStudent = () => {
    const deleteStudent = async () => {
      await axios.delete(
        `https://6ln1gs0gk9.execute-api.us-east-1.amazonaws.com/dev/alunosmatr/${student.id}`,
        student
      );

      closeForm(true);
    };

    confirmAlert({
      title: "Remover aluno",
      message: "Tem certeza que deseja remover este aluno?",
      buttons: [
        {
          label: "Sim, remover",
          onClick: deleteStudent,
        },
        {
          label: "Cancelar",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const validateFields = () => {
    const requiredFields = ["nome", "nomeResp01", "contatoResp01", "idNucleo"];
    const requiredFieldsValidation = {
      contatoResp01: (value) => value.length === 11,
    };

    const invalidFields = Object.keys(student).filter((a) => {
      if (requiredFields.includes(a)) {
        return (
          !student[a] ||
          (requiredFieldsValidation[a] &&
            !requiredFieldsValidation[a](student[a]))
        );
      }

      return false;
    });

    return invalidFields.length > 0;
  };

  return (
    <div className="student-form">
      <div className="student-form-title">
        <div>
          <button
            onClick={() => closeForm(false)}
            className="round-clickable-icon student-form-close-button"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h2>Cadastrar aluno</h2>
        </div>

        {student.id && (
          <button
            onClick={removeStudent}
            className="custom-button remove-student-button"
          >
            <FontAwesomeIcon icon={faTrash} color="red" />
            Remover aluno
          </button>
        )}
      </div>

      <div className="student-form-fields">
        <div className="student-form-col">
          <div className="student-form-field-container">
            <label>* Nome:</label>
            <input onChange={onChangeValue} name="nome" value={student.nome} />
          </div>

          <div className="student-form-field-container">
            <label>* Nome responsável #1:</label>
            <input
              onChange={onChangeValue}
              name="nomeResp01"
              value={student.nomeResp01}
            />
          </div>

          <div className="student-form-field-container">
            <label>Nome responsável #2:</label>
            <input
              onChange={onChangeValue}
              name="nomeResp02"
              value={student.nomeResp02}
            />
          </div>

          <div className="student-form-field-container checkbox">
            <label>Fidelidade</label>
            <input
              type="checkbox"
              onChange={(e) =>
                onChangeValue({
                  target: {
                    name: e.target.name,
                    value: e.target.checked,
                  },
                })
              }
              name="ehFidelidade"
              checked={student.ehFidelidade}
            />
          </div>

          <div className="student-form-field-container checkbox">
            <label>Com irmão</label>
            <input
              type="checkbox"
              onChange={(e) =>
                onChangeValue({
                  target: {
                    name: e.target.name,
                    value: e.target.checked,
                  },
                })
              }
              name="temIrmao"
              checked={student.temIrmao}
            />
          </div>
        </div>

        <div className="student-form-col">
          <div className="student-form-field-container">
            <label>* Núcleo:</label>
            <Select
              options={nucleoOptions}
              value={nucleoOptions.find((a) => a.value === student.idNucleo)}
              onChange={(e) =>
                onChangeValue({ target: { name: "idNucleo", value: e.value } })
              }
            />
          </div>

          <div className="student-form-field-container">
            <label>* Contato #1:</label>
            <ReactInputMask
              mask="(99) 99999-9999"
              onChange={onChangeValue}
              name="contatoResp01"
              value={student.contatoResp01}
            />
          </div>

          <div className="student-form-field-container">
            <label>Contato #2:</label>
            <ReactInputMask
              mask="(99) 99999-9999"
              onChange={onChangeValue}
              name="contatoResp02"
              value={student.contatoResp02}
            />
          </div>
        </div>
      </div>

      <div className="student-form-footer">
        <button
          className="custom-button"
          onClick={onSubmitForm}
          disabled={validateFields()}
        >
          {loading ? (
            <ReactLoading type="bubbles" color="white" height={50} width={50} />
          ) : (
            "CONFIRMAR"
          )}
        </button>
      </div>
    </div>
  );
};

export default CadastroAluno;
