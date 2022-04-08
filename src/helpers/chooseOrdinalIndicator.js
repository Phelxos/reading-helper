const chooseOrdinalIndicator = (num) => {
  const tempArr = Array.from(String(num), (num) => Number(num));
  let lastDigit = 0;
  if (tempArr[tempArr.length - 1] != NaN) {
    lastDigit = tempArr[tempArr.length - 1];
  }
  let ordinalIndicator = "";
  if (lastDigit > 3 || lastDigit === 0) {
    ordinalIndicator = "th";
  } else {
    switch (tempArr[tempArr.length - 1]) {
      case 1:
        ordinalIndicator = "st";
        break;
      case 2:
        ordinalIndicator = "nd";
        break;
      case 3:
        ordinalIndicator = "rd";
        break;
      default:
        ordinalIndicator = "th";
    }
  }
  return ordinalIndicator;
};

export default chooseOrdinalIndicator;
