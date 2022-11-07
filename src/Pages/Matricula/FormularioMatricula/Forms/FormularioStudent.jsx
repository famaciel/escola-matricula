import ReactInputMask from "react-input-mask";
import CurrencyInput from "react-currency-input-field";
import { useCallback } from "react";

const FormularioStudent = ({
  matricula: { integral, cabecalho, dadosGerais },
  onChangeValue,
}) => {
  const onChangeDadosGerais = useCallback(
    ({ target: { name, value } }) => {
      onChangeValue({
        dadosGerais: {
          ...dadosGerais,
          [name]: value,
        },
      });
    },
    [onChangeValue, dadosGerais]
  );

  const onChangeEndereco = useCallback(
    ({ target: { name, value } }) => {
      onChangeValue({
        dadosGerais: {
          ...dadosGerais,
          endereco: {
            ...dadosGerais.endereco,
            [name]: value,
          },
        },
      });
    },
    [onChangeValue, dadosGerais]
  );

  const buildAnuidade = () => {
    if (cabecalho.temIntegral && integral.opcao) {
      return cabecalho[`valorIntegral${integral.qtdeDias}x`];
    }

    return cabecalho.valorAnuidade;
  };

  return (
    <div className="matricula-form-fields">
      <div className="student-form-row">
        <div className="student-form-field-container">
          <label>Nome:</label>
          <input disabled name="nome" value={cabecalho.nomeAluno} />
        </div>
        <div className="student-form-field-container">
          <label>Núcleo:</label>
          <input disabled name="nucleo" value={cabecalho.nomeNucleo} />
        </div>
      </div>

      <div className="student-form-row">
        <div className="student-form-field-container">
          <label>Anuidade:</label>
          <CurrencyInput
            disabled
            decimalsLimit={2}
            prefix="R$ "
            name="anuidade"
            value={buildAnuidade()}
          />
        </div>

        <div className="student-form-field-container">
          <label>Taxas:</label>
          <CurrencyInput
            disabled
            decimalsLimit={2}
            prefix="R$ "
            name="taxas"
            value={cabecalho.valorTaxas}
          />
        </div>
      </div>

      <h4>Dados do(a) estudante</h4>

      <div className="student-form-row">
        <div className="student-form-field-container">
          <label>* Nome:</label>
          <input
            name="nome"
            onChange={onChangeDadosGerais}
            value={dadosGerais.nome}
          />
        </div>

        <div className="student-form-field-container">
          <label>* Data de nascimento:</label>
          <ReactInputMask
            placeholder="__/__/_____"
            mask="99/99/9999"
            name="dataNascimento"
            onChange={onChangeDadosGerais}
            value={dadosGerais.dataNascimento}
          />
        </div>

        <div className="student-form-field-container">
          <label>* Sexo</label>
          <div>
            <input
              onChange={onChangeDadosGerais}
              type="radio"
              value="M"
              name="sexo"
              checked={dadosGerais.sexo === "M"}
            />
            Masculino
            <input
              onChange={onChangeDadosGerais}
              type="radio"
              value="F"
              name="sexo"
              checked={dadosGerais.sexo === "F"}
            />{" "}
            Feminino
          </div>
        </div>
      </div>

      <div className="student-form-row">
        <div className="student-form-field-container">
          <label>* Natural de:</label>
          <input
            name="naturalDe"
            onChange={onChangeDadosGerais}
            value={dadosGerais.naturalDe}
          />
        </div>

        <div className="student-form-field-container">
          <label>* Estado:</label>
          <input
            name="estado"
            onChange={onChangeDadosGerais}
            value={dadosGerais.estado}
          />
        </div>
      </div>

      <div className="student-form-row">
        <div className="student-form-field-container">
          <label>* Endereço residencial:</label>
          <input
            name="rua"
            onChange={onChangeEndereco}
            value={dadosGerais.endereco.rua}
          />
        </div>

        <div className="student-form-field-container">
          <label>* Numero:</label>
          <input
            type="number"
            name="numero"
            onChange={onChangeEndereco}
            value={dadosGerais.endereco.numero}
          />
        </div>
      </div>

      <div className="student-form-row">
        <div className="student-form-field-container">
          <label>* Bairro:</label>
          <input
            name="bairro"
            onChange={onChangeEndereco}
            value={dadosGerais.endereco.bairro}
          />
        </div>

        <div className="student-form-field-container">
          <label>* CEP:</label>
          <input
            name="cep"
            onChange={onChangeEndereco}
            value={dadosGerais.endereco.cep}
          />
        </div>
      </div>

      <div className="student-form-row">
        <div className="student-form-field-container">
          <label>* Telefone Residencial:</label>
          <ReactInputMask
            mask="(99) 99999-9999"
            name="contatoResidencial"
            onChange={onChangeEndereco}
            value={dadosGerais.endereco.contatoResidencial}
          />
        </div>

        <div className="student-form-field-container">
          <label>Telefone recado:</label>
          <ReactInputMask
            mask="(99) 99999-9999"
            name="contatoRecado"
            onChange={onChangeEndereco}
            value={dadosGerais.endereco.contatoRecado}
          />
        </div>
      </div>
    </div>
  );
};

export default FormularioStudent;
