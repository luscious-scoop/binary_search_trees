export const RandomNumberArrayGenarator = (length) => {
  const randomArray = [];

  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * (100 - 1) + 1);
    randomArray.push(randomNum);
  }

  return randomArray;
};
