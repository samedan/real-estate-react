export const capitalize = (value) => {
  if (!value || typeof value !== 'string') {
    return '';
  }

  return (
    value
      // ['san', 'francisco']
      .split(' ')
      .map(
        (word) =>
          // s => san[0]
          word[0]
            // s => S
            .toUpperCase() +
          // san => an, S+an
          word.slice(1)
      )
      .join(' ')
  );
};
