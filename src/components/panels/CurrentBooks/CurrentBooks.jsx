import { useState } from "react";
import AddBtn from "./elements/AddBtn";
import CurrentBookContent from "./elements/CurrentBookContent";
import AddCurrentBookForm from "./elements/AddCurrentBookForm";
import { Card, Box, Typography, Pagination, CardActions } from "@mui/material";

const CurrentBooks = () => {
  const [booksList, setCurrentBooksList] = useState([]);
  const [entry, setEntry] = useState({});
  const [page, setPage] = useState(0);
  const [showAddForm, setAddForm] = useState(false);

  const handlePageChange = (e) => {
    const value = parseInt(e.target.innerText, 10);
    setPage(value);
    document
      .querySelector(`.current-book-${value}`)
      .scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const handleAddClick = () => {
    setAddForm((prevVal) => !prevVal);
  };

  const handleInputChange = (e) => {
    const prop = e.target.name;
    const val = e.target.value;
    const key = Date.now();
    setEntry({ ...entry, [prop]: val, key: key });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCurrentBooksList([...booksList, entry]);
    setAddForm((prevVal) => !prevVal);
    setEntry({});
  };

  const handleDeleteClick = (e) => {
    setCurrentBooksList(booksList.filter((entry) => entry.key !== e));
  };

  return (
    <Card
      sx={{
        padding: "1rem 2rem",
        backgroundColor: "booksLists.cardBgr",
        display: "flex",
        flexDirection: "column",
        "::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        borderRadius: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "1rem",
          scrollbarWidth: "none",
        }}
      >
        <Typography variant="h2" component="h2">
          Current Book{booksList.length > 1 ? "s" : null}
        </Typography>
        <CardActions>
          <AddBtn onAddClick={handleAddClick} />
        </CardActions>
      </Box>
      {showAddForm ? (
        <AddCurrentBookForm
          onInputChange={handleInputChange}
          onFormSubmit={handleFormSubmit}
        />
      ) : (
        <>
          <CurrentBookContent
            sx={{ scrollbarWidth: "none" }}
            list={booksList}
            handleDeleteClick={handleDeleteClick}
          />
          <Pagination
            count={booksList.length}
            page={page}
            onChange={handlePageChange}
            sx={{ alignSelf: "center", mt: "2rem" }}
            hidePrevButton // hid the prev and next button because they don't change the page
            hideNextButton // " "
          />
        </>
      )}
    </Card>
  );
};

export default CurrentBooks;
