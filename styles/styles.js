import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 768,
      lg: 1024,
      xl: 2560,
    },
  },
  palette: {
    currentBookLists: {
      cardBgr: "#C2B29A",
      cardLight: "#978974",
      cardDark: "#675C4E",
      cardLukelight: "#857A68",
      cardGrey: "#918F86",
      formBlueGrey: "#77959E",
    },
    wqofd: {
      cardBgr: "#9c9c94",
      fontGreen: "#3b8082",
      fontRed: "#890F0D",
      font: "snow",
    },
    bookLists: {
      cardBgr: "#847868",
      cardTitle: "#FFF",
      listBgr: "#665C4F",
      listItemBgr: "#9B9B93",
      listItemTitle: "#FFF",
      listItemAuthors: "#575151",
      listItemYear: "#FFF",
    },
  },
});

export { theme };
