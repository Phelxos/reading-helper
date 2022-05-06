import { Box } from "@mui/material";
import { useEffect } from "react";
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

  useEffect(() => {
    if (processedList.length === 0) return;
    console.log(processedList);
    sessionStorage.setItem(
      `${processedList[processedList.length - 1].key}`,
      JSON.stringify(processedList[processedList.length - 1])
    );
    console.log(sessionStorage);
  }, [processedList.length]);

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
