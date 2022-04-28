const findTotalCount = (str) => {
  let count = 0;

  for (let ch of str) {
    if (ch >= "0" && ch <= "9") {
      count++;
    }
  }
  return count;
};

export default findTotalCount;
