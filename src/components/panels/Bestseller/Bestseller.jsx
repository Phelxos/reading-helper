import { useEffect, useState } from "react";
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
import APIs from "../../../helpers/apis";
import findListsIndex from "../../../helpers/findListsIndex";

const Bestseller = () => {
  const [bestsellersCategoriesList, setBestsellersCategoriesList] = useState(
    []
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentlySelectedMenuItem, setCurrentlySelectedItem] = useState(
    "Combined Print and E-Book Fiction"
  );
  const [bestsellersList, setBestsellersList] = useState([]);

  /* EVENT HANDLERS */
  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleMenuItemClick = (e) => {
    /* I do not know why, but this is the path to select the list item's value. */
    setCurrentlySelectedItem(e.target.attributes[3].nodeValue);
    setIsMenuOpen(false);
  };

  console.log(currentlySelectedMenuItem);

  /* handles the display of the books' covers */
  const defaultCoverLink =
    "https://images.unsplash.com/photo-1528459105426-b9548367069b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=728&q=80";

  const fetchCoversLinks = async (isbn) => {
    const res = await fetch(APIs.google.link(isbn)).catch((e) => {
      console.log("fetchCoversLinks(): Something went wrong", e);
    });
    const json = await res.json();
    if (json.items !== undefined) {
      // returns the link cover if the JSON object has an "items" prop
      return json.items[0].volumeInfo.imageLinks.smallThumbnail;
    } else if (json.error.code === 429) {
      // returns null if the daily fetch limit has been reached
      console.log(
        "The daily limit for Google Books' API calls has been reached. A default cover will be displayed for the cards of the bestsellers books."
      );
      return null;
    } else {
      return null;
    }
  };

  /* fetches the data of the bestsellers books 
  form the currently select bestsellers' category list */
  useEffect(() => {
    fetch(APIs.nytimes.link())
      .then((res) => res.json())
      .then((json) => {
        setBestsellersCategoriesList(
          json.results.lists.map((list) => list.list_name)
        );
        console.log(
          "find list's index",
          findListsIndex(json.results.lists, currentlySelectedMenuItem)
        );
        const fetchedBookList =
          json.results.lists[
            findListsIndex(json.results.lists, currentlySelectedMenuItem)
          ].books;
        const promises = fetchedBookList.map(async (item) => {
          const linkCover = await fetchCoversLinks(item.primary_isbn13).catch(
            (e) => {
              console.log(
                "useEffect(), fetchCoversLinks(): Something went wrong",
                e
              );
            }
          );
          return {
            title: item.title,
            authors: item.author,
            ranking: item.rank,
            cover: linkCover,
          };
        });
        return Promise.all(promises);
      })
      .then((books) => setBestsellersList(books))
      .catch((e) => {
        console.log("useEffect(), fetch(): Something went wrong", e);
      });
  }, [currentlySelectedMenuItem]);

  return (
    <Card
      sx={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2rem",
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
          open={isMenuOpen}
          onClose={handleMenuClose}
          sx={{ display: "flex", flexFlow: "row nowrap" }}
        >
          {bestsellersCategoriesList.map((category, index) => {
            return (
              <MenuItem
                selected={category === currentlySelectedMenuItem}
                value={`${category}`}
                onClick={(e) => {
                  handleMenuItemClick(e);
                }}
                key={index}
              >
                {category}
              </MenuItem>
            );
          })}
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
        {bestsellersList.map((book, index) => {
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
                backgroundColor: "currentBookLists.cardDark",
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
