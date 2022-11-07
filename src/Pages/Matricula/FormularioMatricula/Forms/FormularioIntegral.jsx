import { useCallback, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import ReactSelect from "react-select";

const integralOptions = [
  { label: "2 vezes", value: 2 },
  { label: "3 vezes", value: 3 },
  { label: "5 vezes", value: 5 },
];

const FormularioIntegral = ({
  matricula: { cabecalho, integral },
  onChangeValue,
}) => {
  const onSelectIntegralDays = useCallback(
    (e) => {
      onChangeValue({
        integral: {
          ...integral,
          qtdeDias: e.value,
          anuidade: cabecalho[`valorIntegral${e.value}x`],
        },
      });
    },
    [cabecalho, integral, onChangeValue]
  );

  useEffect(() => {
    onSelectIntegralDays({ value: integral.qtdeDias });
  }, [onSelectIntegralDays, integral.qtdeDias]);

  const onChangeIntegralOpcao = (e) => {
    const newValue = {
      ...integral,
      opcao: e.target.checked,
    };

    if (!e.target.checked) {
      newValue.qtdeDias = undefined;
      newValue.anuidade = undefined;
    }

    onChangeValue({
      integral: newValue,
    });
  };

  return (
    <div className="matricula-form-fields">
      <h4>Integral</h4>

      <div className="student-form-row">
        <div className="student-form-field-container checkbox">
          <label>Quero incluir estudo em tempo integral</label>
          <input
            type="checkbox"
            onChange={onChangeIntegralOpcao}
            name="temIrmao"
            checked={integral.opcao}
          />
        </div>

        {integral.opcao && (
          <div className="student-form-field-container">
            <label>Quantos dias:</label>
            <ReactSelect
              options={integralOptions}
              onChange={onSelectIntegralDays}
              value={integralOptions.find((a) => a.value === integral.qtdeDias)}
            />
          </div>
        )}
      </div>

      {integral.qtdeDias ? (
        <div className="student-form-field-container">
          <label>Anuidade:</label>
          <CurrencyInput
            decimalsLimit={2}
            prefix="R$ "
            disabled
            name="anuidade"
            value={integral.anuidade}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FormularioIntegral;
