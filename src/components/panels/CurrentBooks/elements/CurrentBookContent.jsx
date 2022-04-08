import { Box } from "@mui/material";
import { CurrentBookCover } from "./CurrentBookCover";
import CurrentBookDetails from "./CurrentBookDetails";

const CurrentBookContent = (props) => {
  const processedList = [];
  props.list.forEach((entry) => {
    processedList.push({
      title: entry.title,
      authors: entry.authors.split(","),
      isbn: parseInt(entry.isbn),
      edition: parseInt(entry.edition),
      releaseYear: parseInt(entry.releaseYear),
      key: entry.key,
    });
  });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {processedList.map((book, index) => {
        return (
          <Box
            sx={{
              boxSizing: "content-box",
              minWidth: "100%",
              maxWidth: "100%",
              display: "flex",
              flexWrap: "nowrap",
              justifyContent: "space-between",
            }}
            className={`current-book-${index + 1}`}
            key={index}
          >
            <CurrentBookCover cover={book.cover} />
            <CurrentBookDetails
              book={book}
              id={book.key}
              handleDeleteClick={props.handleDeleteClick}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default CurrentBookContent;
