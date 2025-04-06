export const validateNumber = (value) => {
  const numberRegex = /^[0-9]+$/;
  return numberRegex.test(value);
};
