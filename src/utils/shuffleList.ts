export const shuffleList = (list: string[]) => {
  list.forEach((item, index) => {
    const randomIndex = Math.floor(Math.random() * list.length);
    const temp = list[index];

    list[index] = list[randomIndex];
    list[randomIndex] = temp;
  });

  return list;
};
