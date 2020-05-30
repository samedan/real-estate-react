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

export const blobToFile = (blob) => {
  return new File([blob], blob.name, {
    type: blob.type,
  });
};

export const getCroppedImg = (image, crop, fileName) => {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width * scaleX;
  canvas.height = crop.height * scaleY;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');
  // return base64Image;

  // As a blob
  // return new Promise((resolve, reject) => {
  //   canvas.toBlob(blob => {
  //     blob.name = fileName;
  //     resolve(blob);
  //   }, 'image/jpeg', 1);
  // });
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject('Canvas is empty');
        // console.error('Canvas is empty');
        return;
      }
      blob.name = fileName;
      const fileUrl = window.URL.createObjectURL(blob);
      blob.url = fileUrl;
      resolve(blob);
    }, 'image/jpeg');
  });
};
