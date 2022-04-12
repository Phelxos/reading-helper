import { useEffect, useState } from "react";
import { Box, Card, Pagination, Typography, Link } from "@mui/material";
import ForwardButton from "../../buttons/ForwardButton";
import CopyButton from "../../buttons/CopyButton";

const DaysWQ = () => {
  const [wofd, setWofd] = useState({
    heading: "Word",
    reference: "Merriam-Webster",
    website: "https://dictionaryapi.com/",
  });
  const [qofd, setQofd] = useState({
    heading: "Quote",
    reference: "Type.fit",
    website: "https://type.fit/api/quotes",
  });
  const [page, setPage] = useState(1);

  const fetchQofd = () => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((json) => {
        const randomNum = Math.ceil(Math.random() * 1642);
        dissectedFetchedQofd(json[randomNum]);
      });
  };

  const dissectFetchedWofd = (fetchedWofd) => {
    const fetch = fetchedWofd[0];
    const dissectedWofd = {
      ...wofd,
      headword: fetch.hwi.hw.split("*").join(""),
      shortDef: fetch.shortdef[0],
    };
    setWofd(dissectedWofd);
  };

  const dissectedFetchedQofd = (fetchedQofd) => {
    const fetch = fetchedQofd;
    const dissectedQofd = {
      ...qofd,
      text: fetch.text,
      author: fetch.author,
    };
    setQofd(dissectedQofd);
  };

  const handlePageChange = (e) => {
    const value = parseInt(e.target.innerText, 10);
    setPage(value);
  };

  useEffect(() => {
    async function fetchWofd() {
      await fetch("https://random-word-api.herokuapp.com/word")
        .then((res) => res.json())
        .then((randomWord) => randomWord[0])
        .then((searchTerm) =>
          fetch(
            `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchTerm}?key=49a4f377-61f9-43e6-9416-aabfbe90942a`
          )
            .then((res) => res.json())
            .then((json) => {
              dissectFetchedWofd(json);
            })
        );
    }
    fetchWofd();
  }, []);
  useEffect(fetchQofd, []);

  return (
    <Card
      sx={{
        width: "25%",
        height: "auto",
        minHeight: "fit-content",
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "space-between",
        alignItems: "stretch",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography component="h2" variant="h4">
          {page === 1 ? wofd.heading : qofd.heading} of the Day
        </Typography>
        <ForwardButton
          size="large"
          input={
            page === 1
              ? { type: "word", searchString: wofd.headword }
              : { type: "quote", searchString: qofd.text }
          }
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexFlow: "column wrap",
          justifyContent: "center",
          alignItems: "flex-end",
          margin: "2rem 0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "flex-end",
            alignItems: "center",
            height: "fit-content",
            mb: "2rem",
          }}
        >
          <CopyButton text={page === 1 ? wofd.headword : qofd.text} />
          <Typography
            sx={{ wordBreak: "break-all" }}
            align="right"
            component={page === 1 ? "h2" : "p"}
            variant={page === 1 ? "h1" : "h5"}
          >
            {wofd.headword === undefined
              ? "Loading…"
              : page === 1
              ? wofd.headword
              : qofd.text}
          </Typography>
        </Box>
        <Typography
          align="right"
          component="p"
          variant={page === 1 ? "subtitle1" : "h4"}
        >
          {page === 1
            ? wofd.shortDef
            : qofd.author !== null
            ? qofd.author
            : "Unknown"}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Link
          href={page === 1 ? wofd.website : qofd.website}
          target="_blank"
          underline="none"
        >
          <Typography variant="subtitle2" component="p" sx={{ opacity: 0.25 }}>
            Powered by {page === 1 ? wofd.reference : qofd.reference}
          </Typography>
        </Link>
        <Pagination
          count={2}
          page={page}
          onChange={handlePageChange}
          shape="circular"
          hidePrevButton
          hideNextButton
        ></Pagination>
      </Box>
    </Card>
  );
};

export default DaysWQ;
