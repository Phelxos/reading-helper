import { useState } from "react";
import AddBtn from "./elements/AddBtn";
import CurrentBookContent from "./elements/CurrentBookContent";
import AddCurrentBookForm from "./elements/AddCurrentBookForm";
import { Card, Box, Typography, Pagination, CardActions } from "@mui/material";
import checkIsbn from "../../../helpers/checkIsbn";
import findTotalCount from "../../../helpers/findTotalCount";

const CurrentBooks = () => {
  const [booksList, setCurrentBooksList] = useState([]);
  const [entry, setEntry] = useState({});
  const [page, setPage] = useState(0);
  const [showAddForm, setAddForm] = useState(false);
  const [submitAllowed, setSubmitAllowed] = useState(true);
  const [isbnChecked, setIsbnChecked] = useState(false);
  const [isbnFormat, setIsbnFormat] = useState(0);
  const [isbnLength, setIsbnLength] = useState(0);
  const [radioChecked, setRadioChecked] = useState({ 10: false, 13: false });

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
    if (!submitAllowed)
      return "Some entry seems wrong or incomplete. The submission is not allowed.";
    setIsbnFormat(0);
    setCurrentBooksList([...booksList, entry]);
    setAddForm((prevVal) => !prevVal);
    setEntry({});
  };

  const handleDeleteClick = (e) => {
    setCurrentBooksList(booksList.filter((entry) => entry.key !== e));
  };

  const handleIsbnChange = (e) => {
    if (e.target.value.length === 0) {
      setIsbnChecked(false);
      setSubmitAllowed(true);
    } else {
      setIsbnChecked(!checkIsbn(e.target.value, isbnFormat));
      setSubmitAllowed(checkIsbn(e.target.value, isbnFormat));
      setIsbnLength(findTotalCount(e.target.value));
    }
  };

  const handleIsbnFocus = (e) => {
    if (isbnLength === 0) {
      setIsbnChecked(false);
    } else {
      setIsbnChecked(!checkIsbn(e, isbnFormat));
    }
  };

  const handleRadioChange = (e) => {
    if (isbnLength === 0) {
      setIsbnChecked(false);
      setSubmitAllowed(true);
    } else if (isbnLength === Number(e.target.value)) {
      setIsbnChecked(false);
      setSubmitAllowed(true);
    } else {
      setIsbnChecked(true);
      setSubmitAllowed(false);
    }
  };

  const handleRadioClick = (e) => {
    if (e.target.value !== isbnFormat) {
      setRadioChecked({ [e.target.value]: true });
      handleRadioChange(e);
      setIsbnFormat(e.target.value);
    } else if (isbnFormat === 0) {
      setRadioChecked({ [e.target.value]: true });
      setIsbnFormat(e.target.value);
    } else {
      setRadioChecked({ [e.target.value]: false });
      setIsbnFormat(undefined);
      if (isbnLength === e.target.value) {
        setIsbnChecked(true);
      } else {
        setIsbnChecked(false);
      }
    }
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
          <AddBtn onAddClick={handleAddClick} displayCancelBtn={showAddForm} />
        </CardActions>
      </Box>
      {showAddForm ? (
        <AddCurrentBookForm
          onInputChange={handleInputChange}
          onFormSubmit={handleFormSubmit}
          onIsbnChange={handleIsbnChange}
          onIsbnFocus={handleIsbnFocus}
          onRadioChange={handleRadioChange}
          onRadioClick={handleRadioClick}
          isbnChecked={isbnChecked}
          radioChecked={radioChecked}
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
