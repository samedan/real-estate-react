export const sameAs = (passwordValue, getValues) => (value) => {
  const compareTo = getValues()[passwordValue];
  return compareTo === value;
};
