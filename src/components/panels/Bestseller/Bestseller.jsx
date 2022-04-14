import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { useEffect, useState } from "react";

const Bestseller = () => {
  const [bestsellerList, setBestsellerList] = useState([]);
  const googleApiKey = "AIzaSyArxFW_EwixEUGj48zkoIhG6yS-8dOuGMA";
  const defaultCoverLink =
    "https://images.unsplash.com/photo-1528459105426-b9548367069b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=728&q=80";
  const nytimesApi =
    "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=VGTHTRB7qDzUPZN73Z5NtZ5Mh06p68xS";
  const googleApi = (query) => {
    return `https://www.googleapis.com/books/v1/volumes?q=isbn:${query}&key=${googleApiKey}`;
  };

  fetchLinkCover = async (isbn) => {
    const res = await fetch(googleApi(isbn));
    const json = await res.json();
    console.log(json);
    return json;
  };

  useEffect(() => {
    fetch(nytimesApi)
      .then((res) => res.json())
      .then((json) => {
        const fetchedBookList = json.results.books;
        console.log(fetchedBookList);
        setBestsellerList(
          fetchedBookList.map((item) => {
            console.log(item.isbns[0].isbn13);
            const linkCover = fetchLinkCover(item.isbns[0].isbn13);
            console.log("link cover", linkCover);
            return {
              title: item.title,
              authors: item.author,
              ranking: item.rank,
            };
          })
        );
      });
  }, []);

  console.log(bestsellerList);

  return (
    <Card
      sx={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-between",
        alignItems: "center",
        width: 0.5,
        padding: "2rem",
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
        <Typography component="h2" variant="h3">
          Bestseller
        </Typography>
        <IconButton>
          <ArrowDropDownCircleIcon />
        </IconButton>
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
                minWidth: 0.3,
                backgroundColor: "lightblue",
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
                <Typography align="right">{book.title}</Typography>
                <Typography align="right">{book.authors}</Typography>
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
