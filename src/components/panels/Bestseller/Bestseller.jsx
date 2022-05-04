import {
  Box,
  Card,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { useEffect, useState } from "react";

const Bestseller = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bestsellerList, setBestsellerList] = useState([]);
  const [listNameNumber, setListNameNumber] = useState(0);
  const [isItemSelected, setIsItemSelected] = useState({
    0: true,
  });
  const [prevSelectedMenuItem, setPrevSelectedMenuItem] = useState(0);
  const nytApiKey = "VGTHTRB7qDzUPZN73Z5NtZ5Mh06p68xS";
  const googleApiKey = "AIzaSyArxFW_EwixEUGj48zkoIhG6yS-8dOuGMA";
  const defaultCoverLink =
    "https://images.unsplash.com/photo-1528459105426-b9548367069b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=728&q=80";
  const nytimesApi = `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${nytApiKey}`;
  const googleApi = (query) => {
    return `https://www.googleapis.com/books/v1/volumes?q=isbn:${query}&key=${googleApiKey}`;
  };

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleMenuItemClick = (listNum) => {
    setListNameNumber(listNum);
    setIsItemSelected({
      ...isItemSelected,
      [listNum]: true,
      [prevSelectedMenuItem]: false,
    });
    setPrevSelectedMenuItem(listNum);
    setMenuOpen(false);
  };

  const fetchLinkCover = async (isbn) => {
    const res = await fetch(googleApi(isbn));
    const json = await res.json();
    if (json.items !== undefined) {
      // return the link cover if the JSON object has an "items" prop
      return json.items[0].volumeInfo.imageLinks.smallThumbnail;
    } else if (json.error.code === 429) {
      // return null if the daily fetch limit has been reached
      console.log(
        "The daily limit for Google Books' API calls has been reached. A default cover will be displayed for the cards of the bestsellers books."
      );
      return null;
    } else {
      return null;
    }
  };

  useEffect(() => {
    fetch(nytimesApi)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.results);
        const fetchedBookList = json.results.lists[listNameNumber].books;
        console.log(fetchedBookList);
        const promises = fetchedBookList.map(async (item) => {
          const linkCover = await fetchLinkCover(item.primary_isbn13);
          return {
            title: item.title,
            authors: item.author,
            ranking: item.rank,
            cover: linkCover,
          };
        });
        return Promise.all(promises);
      })
      .then((books) => setBestsellerList(books));
  }, [listNameNumber]);

  return (
    <Card
      sx={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2rem",
        backgroundColor: "booksLists.cardBgr",
        borderRadius: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography component="h2" variant="h3">
            Bestseller
          </Typography>
          <IconButton onClick={handleMenuClick}>
            <ArrowDropDownCircleIcon />
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          sx={{ display: "flex", flexFlow: "row nowrap" }}
        >
          <Typography align="center">Fiction</Typography>
          <MenuItem
            onClick={() => {
              handleMenuItemClick(0);
            }}
            selected={isItemSelected[0]}
          >
            Combined Print & E-Book Fiction
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuItemClick(2);
            }}
            selected={isItemSelected[2]}
          >
            Hardcover Fiction
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuItemClick(4);
            }}
            selected={isItemSelected[4]}
          >
            Paperback Trade Fiction
          </MenuItem>
          <Typography align="center">Nonfiction</Typography>
          <MenuItem
            onClick={() => {
              handleMenuItemClick(1);
            }}
            selected={isItemSelected[1]}
          >
            Combined Print & E-Book Fiction
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuItemClick(3);
            }}
            selected={isItemSelected[3]}
          >
            Hardcover
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuItemClick(5);
            }}
            selected={isItemSelected[5]}
          >
            Paperback
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuItemClick(6);
            }}
            selected={isItemSelected[6]}
          >
            Advice, How-To & Miscellaneous
          </MenuItem>
          <Typography align="center">Children's</Typography>
          <MenuItem
            onClick={() => {
              handleMenuItemClick(7);
            }}
            selected={isItemSelected[7]}
          >
            Middle Grade Hardcover
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuItemClick(8);
            }}
            selected={isItemSelected[8]}
          >
            Picture Books
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuItemClick(9);
            }}
            selected={isItemSelected[9]}
          >
            Series
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuItemClick(10);
            }}
            selected={isItemSelected[10]}
          >
            Young Adult Hardcover
          </MenuItem>
        </Menu>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
          alignItems: "center",
          overflowY: "hidden",
          flexGrow: 1,
          padding: "1rem",
        }}
      >
        {bestsellerList.map((book, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexFlow: "row nowrap",
                justifyContent: "space-between",
                alignItems: "stretch",
                margin: "1rem",
                padding: "1rem",
                minWidth: "fit-content",
                backgroundColor: "booksLists.cardDark",
                borderRadius: "1rem",
                color: "snow",
              }}
            >
              <Typography
                sx={{ alignSelf: "flex-end" }}
                component="p"
                variant="h2"
              >
                {book.ranking}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexFlow: "column nowrap",
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                  flexGrow: 1,
                  padding: "1rem",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 100,
                  }}
                  align="right"
                >
                  {book.title}
                </Typography>
                <Typography
                  sx={{ fontSize: "1.25rem", fontWeight: 500 }}
                  align="right"
                >
                  {book.authors}
                </Typography>
              </Box>
              <CardMedia
                component="img"
                image={book.cover || defaultCoverLink}
                sx={{ width: "50px" }}
              />
            </Box>
          );
        })}
      </Box>
    </Card>
  );
};

export default Bestseller;
