import moment from 'moment';

export const capitalize = (value) => {
  if (!value || typeof value !== 'string') {
    return '';
  }

  return (
    value
      // ['san', 'francisco']
      .split(' ')
      .map((word) => {
        const lowerCaseWord = word.toLowerCase();
        // console.log(lowerCaseWord);
        // s => san[0]
        return (
          lowerCaseWord[0]
            // s => S
            .toUpperCase() +
          // san => an, S+an
          lowerCaseWord.slice(1)
        );
      })
      .join(' ')
  );
};

export const formatDate = (date, dateFormat = 'YYYY/MM/DD') => {
  if (!date || typeof date !== 'string') {
    return '';
  }
  return moment(date).format(dateFormat);
};
