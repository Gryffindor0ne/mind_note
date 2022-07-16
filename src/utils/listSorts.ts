export const sortListDescend = <T extends { id: number }>(list: T[]) => {
  return list.sort((a, b) => {
    if (a.id > b.id) {
      return -1;
    } else if (a.id === b.id) {
      return 0;
    } else {
      return 1;
    }
  });
};
