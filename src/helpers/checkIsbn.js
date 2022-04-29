const checkIsbn = (isbn, format) => {
  format = Number(format);
  const re = /^\d+(?:-?\d+)+$/g;
  const findTotalCount = (str) => {
    let count = 0;

    for (let ch of str) {
      if (ch >= "0" && ch <= "9") {
        count++;
      }
    }
    return count;
  };
  if (isbn.match(re)) {
    if (format) {
      if (findTotalCount(isbn) === 10 || findTotalCount(isbn) === 13) {
        if (findTotalCount(isbn) === format) {
          return true;
        } else {
          console.log(
            `The format of the entered ISBN does not fit the format you have chosen. The entered ISBN is ${findTotalCount(
              isbn
            )} digits long, while according to your chosen format it should be ${format} digits long.`
          );
          return false;
        }
      } else {
        console.log(
          `The entered ISBN is ${findTotalCount(
            isbn
          )} long. Its length must be either 10 or 13 digits.`
        );
        return false;
      }
    } else {
      if (findTotalCount(isbn) === 10 || findTotalCount(isbn) === 13) {
        return true;
      } else {
        console.log(
          `The entered ISBN is ${findTotalCount(
            isbn
          )} long. Its length must be either 10 or 13 digits.`
        );
        return false;
      }
    }
  } else {
    console.log(
      "The entered ISBN does not match the requirements of the ISBN format."
    );
    return false;
  }
};

export default checkIsbn;
