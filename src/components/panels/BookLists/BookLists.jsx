import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BookList from "./elements/BookList";
import AddBtn from "../CurrentBooks/elements/AddBtn";

const bookLists = [
  {
    name: "Read soon",
    icon: "&#x1F4DA;",
    books: [
      {
        title: "The Charterhouse of Parma",
        year: 1839,
        author: "Marie-Henri (Stendhal) Beyle",
      },
      {
        title: "Wuthering Heights",
        year: 1847,
        author: "Emilfy Bronte",
      },
      {
        title: "The Master and Magerita",
        year: 1966,
        author: "Mikhail Bulgakov",
      },
    ],
  },
  {
    name: "Favourite Sci-Fi Books",
    icon: "&#x1F680;",
    books: [
      {
        title: "The Blazing World",
        year: 1666,
        author: "Margaret Cavendish",
      },
      {
        title: "Frankenstein",
        year: 1818,
        author: "Mary Shelley",
      },
      {
        title: "Foundation",
        year: 1951,
        author: "Isaac Asimov",
      },
    ],
  },
];

const BookLists = () => {
  return (
    <Card
      sx={{
        padding: "1rem 2rem",
        backgroundColor: "currentBookLists.cardBgr",
        borderRadius: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
          alignItems: "center",
          pb: "1rem",
        }}
      >
        <Typography variant="h2" component="h2">
          Lists
        </Typography>
        <AddBtn />
      </Box>
      <Box>
        <Box>
          <BookList list={bookLists[0]} />
        </Box>
        <Box></Box>
      </Box>
    </Card>
  );
};

export default BookLists;
