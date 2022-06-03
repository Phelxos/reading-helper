const findListsIndex = (list, listName) => {
  for (let i = 0; i < list.length; i = i + 1) {
    if (listName === list[i].list_name) {
      return i;
    }
  }
};

export default findListsIndex;
