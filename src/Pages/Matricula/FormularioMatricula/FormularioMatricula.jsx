import {
  faArrowLeft,
  faArrowRight,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormularioIntegral from "./Forms/FormularioIntegral";
import FormularioParent from "./Forms/FormularioParent";
import FormularioEmergencial from "./Forms/FormularioEmergencial";
import FormularioStudent from "./Forms/FormularioStudent";
import "./FormularioMatricula.scss";
import FormularioPermissoes from "./Forms/FormularioPermissoes";
import ReactLoading from "react-loading";
import InfoDocumentos from "./Forms/InfoDocumentos";
import DownloadDocuments from "./Forms/DownloadDocuments";
import logo from "../../../Utils/logo.jpg";

const formEmptyFields = {
  mae: {
    contatoPrincipal: "",
    rg: "",
    cpf: "",
    profissao: "",
    nome: "",
    dataNascimento: "",
    cargo: "",
    email: "",
    localTrabalho: "",
    contatoCelular: "",
  },
  integral: {
    opcao: false,
    qtdeDias: 0,
  },
  dadosGerais: {
    nome: "",
    estado: "",
    dataNascimento: "",
    sexo: "",
    endereco: {
      contatoResidencial: "",
      numero: "",
      contatoRecado: "",
      bairro: "",
      rua: "",
      cep: "",
    },
    naturalDe: "",
  },
  respFinanceiro: {
    contatoPrincipal: "",
    rg: "",
    cpf: "",
    profissao: "",
    nome: "",
    dataNascimento: "",
    cargo: "",
    email: "",
    localTrabalho: "",
    contatoCelular: "",
  },
  pai: {
    contatoPrincipal: "",
    rg: "",
    cpf: "",
    profissao: "",
    nome: "",
    dataNascimento: "",
    cargo: "",
    email: "",
    localTrabalho: "",
    contatoCelular: "",
  },
  seguranca: {
    observacoes: "",
    pessoas: [
      {
        nome: "",
        parentesco: "",
      },
      {
        nome: "",
        parentesco: "",
      },
      {
        nome: "",
        parentesco: "",
      },
    ],
  },
  autorizacoes: {
    medicamentosUsoContinuo: "",
    observacoes: "",
    pessoas: [
      {
        contato: "",
        nome: "",
      },
      {
        contato: "",
        nome: "",
      },
      {
        contato: "",
        nome: "",
      },
    ],
    restricaoAlimentar: "",
    tipoSanguineo: "",
    alergias: "",
  },
};

const FormularioMatricula = () => {
  const [matricula, setMatricula] = useState(formEmptyFields);
  const [student, setStudent] = useState(null);
  const [filesToDownload, setFilesToDownload] = useState([]);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  const [step, setStep] = useState(0);

  const { studentId } = useParams();

  const getStepValidation = useCallback(
    (step) => {
      const stepFields = {
        0: {
          fields: [matricula.dadosGerais, matricula.dadosGerais.endereco],
          optionalFields: ["contatoRecado"],
        },
        2: {
          fields: [matricula.respFinanceiro],
        },
      };

      return stepFields[step];
    },
    [matricula]
  );

  const onChangeValue = useCallback(
    (value) => {
      setMatricula({
        ...matricula,
        ...value,
      });
    },
    [matricula]
  );

  const loadStudent = useCallback(async () => {
    try {
      setInitialLoading(true);

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, 3000);
      });

      let [
        { data: student },
        { data: cabecalho },
        { data: matricula },
        { data: filesToDownload },
      ] = await Promise.all([
        axios.get(
          `https://6ln1gs0gk9.execute-api.us-east-1.amazonaws.com/dev/alunosmatr/${studentId}`
        ),
        axios.get(
          `https://6ln1gs0gk9.execute-api.us-east-1.amazonaws.com/dev/matricula/cabecalho/${studentId}`
        ),
        axios.get(
          `https://6ln1gs0gk9.execute-api.us-east-1.amazonaws.com/dev/matriculas/${studentId}`
        ),
        axios.get(
          `https://6ln1gs0gk9.execute-api.us-east-1.amazonaws.com/dev/docs/aluno/${studentId}`
        ),
      ]);

      if (matricula.statusCode === 404) {
        matricula = formEmptyFields;
      }

      setStudent(student);

      setMatricula({
        ...matricula,
        cabecalho: {
          ...cabecalho,
          valorIntegral5x: cabecalho.valorIntegral,
        },
      });

      setFilesToDownload(filesToDownload);
    } catch (err) {
      console.error("ERROR: ", err);
    } finally {
      setInitialLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    loadStudent();
  }, [loadStudent]);

  const submitForm = async () => {
    try {
      setSubmitLoading(true);

      await axios.post(
        `https://6ln1gs0gk9.execute-api.us-east-1.amazonaws.com/dev/matriculas`,
        {
          id: student.id,
          idNucleo: matricula.cabecalho.idNucleo,
          ...matricula,
        }
      );

      setSubmitLoading(false);
      setSubmitSuccess(true);
    } catch (err) {
      console.log("ERROR: ", err);
    }
  };

  if (initialLoading || !matricula || !student) {
    return (
      <div className="submit-loading-container">
        <h1>Buscando matrícula...</h1>
        <ReactLoading type="bars" color="#2684ff" height={50} width={50} />
      </div>
    );
  }

  if (submitLoading) {
    return (
      <div className="submit-loading-container">
        <h1>Registrando matrícula...</h1>
        <ReactLoading type="bars" color="#2684ff" height={50} width={50} />
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="submit-loading-container">
        <h1>Cadastro enviado com sucesso!</h1>
        <h3>Atenção: para efetivação da matrícula os responsáveis deverão comparecer ao setor financeiro da escola até a data limite - 25/11/2022</h3>
        <p>A lista de material será enviada em janeiro de 2023 via e-mail</p>
        <FontAwesomeIcon icon={faCheck} color="#2684ff" size="5x" />
      </div>
    );
  }

  const scrollToTop = () => {
    document.querySelector(".matricula-form").scrollTo(0, 0);
    window.scrollTo(0, 0);
  };

  const onPreviousStep = () => {
    if (step === 6 && !matricula.cabecalho.temIntegral) {
      return setStep(step - 2);
    }

    setStep(step - 1);
    scrollToTop();
  };

  const validateFields = () => {
    console.log(matricula);
    const stepValidation = getStepValidation(step);

    if (!stepValidation) return true;

    const { fields: fieldsToValidate, optionalFields } = stepValidation;

    let invalidFields = [];

    fieldsToValidate.forEach((objField) => {
      const _invalidFields = Object.keys(objField).filter(
        (field) => !objField[field] && !(optionalFields || []).includes(field)
      );

      invalidFields = [...invalidFields, ..._invalidFields];
    });

    console.log(invalidFields);

    return invalidFields.length === 0;
  };

  const onNextStep = () => {
    const isValid = validateFields();

    if (!isValid) {
      alert("Por favor, preencha todos os campos obrigatórios (*)");
      return;
    }

    if (step === 4 && !matricula.cabecalho.temIntegral) {
      return setStep(step + 2);
    }

    setStep(step + 1);
    scrollToTop();
  };

  return (
    <div>
      <div className="matricula-form">
        <div className="matricula-form-header">
          <img src={logo} alt="logo" />
          <h2>Escola dos Sonhos</h2>
          <h3>Ficha de matrícula 2023</h3>
        </div>

        {step === 0 && (
          <FormularioStudent
            matricula={matricula}
            onChangeValue={onChangeValue}
          />
        )}

        {step === 1 && (
          <div className="matricula-form-fields">
            <FormularioParent
              parentName="Mãe"
              parent="mae"
              dadosParent={matricula.mae}
              onChangeValue={onChangeValue}
            />

            <FormularioParent
              parentName="Pai"
              parent="pai"
              dadosParent={matricula.pai}
              onChangeValue={onChangeValue}
            />
          </div>
        )}

        {step === 2 && (
          <FormularioParent
            parent="respFinanceiro"
            parentName="Responsável financeiro"
            dadosParent={matricula.respFinanceiro}
            onChangeValue={onChangeValue}
          />
        )}

        {step === 3 && (
          <FormularioEmergencial
            matricula={matricula}
            onChangeValue={onChangeValue}
          />
        )}

        {step === 4 && (
          <FormularioPermissoes
            matricula={matricula}
            onChangeValue={onChangeValue}
          />
        )}

        {step === 5 && matricula.cabecalho.temIntegral && (
          <FormularioIntegral
            matricula={matricula}
            onChangeValue={onChangeValue}
          />
        )}

        {step === 6 && <InfoDocumentos />}

        {step === 7 && <DownloadDocuments filesToDownload={filesToDownload} />}
      </div>
      <div className="formulario-matricula-buttons">
        {step > 0 && (
          <button
            onClick={onPreviousStep}
            className="round-clickable-icon previous-step-button"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="3x" />
          </button>
        )}

        {step === 7 ? (
          <button
            onClick={submitForm}
            className="round-clickable-icon next-step-button"
          >
            <FontAwesomeIcon icon={faCheck} size="3x" />
          </button>
        ) : (
          <button
            onClick={onNextStep}
            className="round-clickable-icon next-step-button"
          >
            <FontAwesomeIcon icon={faArrowRight} size="3x" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FormularioMatricula;
