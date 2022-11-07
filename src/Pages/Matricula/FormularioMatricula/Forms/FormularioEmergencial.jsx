import { useCallback } from "react";
import ReactInputMask from "react-input-mask";

const FormularioEmergencial = ({
  matricula: { autorizacoes },
  onChangeValue,
}) => {
  const onChange = useCallback(
    ({ target: { name, value } }) => {
      onChangeValue({
        autorizacoes: {
          ...autorizacoes,
          [name]: value,
        },
      });
    },
    [onChangeValue, autorizacoes]
  );

  const onChangePermissaoPessoa = useCallback(
    ({ target: { name, value } }, index) => {
      const newPessoas = autorizacoes.pessoas;

      if (!newPessoas[index]) newPessoas.push({});

      newPessoas[index][name] = value;

      onChangeValue({
        autorizacoes: {
          ...autorizacoes,
          pessoas: [...newPessoas],
        },
      });
    },
    [onChangeValue, autorizacoes]
  );

  return (
    <div className="matricula-form-fields">
      <h4>Autorização e Emergência</h4>
      <div className="student-form-field-container multiple">
        <label>Pessoas que podem ser procuradas em caso de emergência:</label>

        <div className="double-input-labels">
          <label>Nome</label>
          <label>Telefone</label>
        </div>
        <div className="double-input-container">
          <input
            name="nome"
            onChange={(e) => onChangePermissaoPessoa(e, 0)}
            value={autorizacoes.pessoas[0]?.nome}
          />
          <ReactInputMask
            mask="(99) 99999-9999"
            name="contato"
            placeholder="( ) _____-____"
            onChange={(e) => onChangePermissaoPessoa(e, 0)}
            value={autorizacoes.pessoas[0]?.contato}
          />
        </div>
        <div className="double-input-container">
          <input
            name="nome"
            onChange={(e) => onChangePermissaoPessoa(e, 1)}
            value={autorizacoes.pessoas[1]?.nome}
          />
          <ReactInputMask
            mask="(99) 99999-9999"
            name="contato"
            placeholder="( ) _____-____"
            onChange={(e) => onChangePermissaoPessoa(e, 1)}
            value={autorizacoes.pessoas[1]?.contato}
          />
        </div>
        <div className="double-input-container">
          <ReactInputMask
            mask="(99) 99999-9999"
            name="nome"
            onChange={(e) => onChangePermissaoPessoa(e, 2)}
            value={autorizacoes.pessoas[2]?.nome}
          />
          <input
            name="contato"
            placeholder="( ) _____-____"
            onChange={(e) => onChangePermissaoPessoa(e, 2)}
            value={autorizacoes.pessoas[2]?.contato}
          />
        </div>
      </div>
      <div className="student-form-field-container">
        <label>Tipo Sanguíneo:</label>
        <input
          name="tipoSanguineo"
          onChange={onChange}
          value={autorizacoes.tipoSanguineo}
        />
      </div>
      <div className="student-form-field-container">
        <label>Alergias:</label>
        <input
          name="alergias"
          onChange={onChange}
          value={autorizacoes.alergias}
        />
      </div>
      <div className="student-form-field-container">
        <label>Restrição medica/alimentar:</label>
        <input
          name="restricaoAlimentar"
          onChange={onChange}
          value={autorizacoes.restricaoAlimentar}
        />
      </div>
      <div className="student-form-field-container">
        <label>Medicamentos de uso contínuo:</label>
        <input
          name="medicamentosUsoContinuo"
          onChange={onChange}
          value={autorizacoes.medicamentosUsoContinuo}
        />
      </div>
      <div className="student-form-field-container">
        <label>Observações adicionais:</label>
        <textarea
          name="observacoes"
          onChange={onChange}
          value={autorizacoes.observacoes}
        />
      </div>
    </div>
  );
};

export default FormularioEmergencial;
