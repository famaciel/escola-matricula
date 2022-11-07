export const formatarCelular = (str) => {
  const regex = /^\(?([0-9]{2})\)?([0-9]{4,5})-?([0-9]{4})$/gm;
  const subst = `($1)$2-$3`;

  const result = str.replace(regex, subst).replace(")", ") ");

  return result;
};
