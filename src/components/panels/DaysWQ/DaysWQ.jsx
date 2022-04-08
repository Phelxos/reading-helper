import { useEffect, useState } from "react";
import { Box, Card, Pagination, Typography, Link } from "@mui/material";
import ForwardButton from "../../buttons/ForwardButton";
import CopyButton from "../../buttons/CopyButton";

const DaysWQ = () => {
  const [wofd, setWofd] = useState({});
  const [qofd, setQofd] = useState({});
  let searchString = "house";

  const fetchWofd = (searchTerm) => {
    fetch(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchTerm}?key=49a4f377-61f9-43e6-9416-aabfbe90942a`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log("Wofd", json);
        dissectFetchedWofd(json);
      });
  };

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
      headword: fetch.hwi.hw,
      shortDef: fetch.shortdef[0],
    };
    setWofd(dissectedWofd);
  };

  const dissectedFetchedQofd = (fetchedQofd) => {
    const fetch = fetchedQofd;
    const dissectedQofd = {
      text: fetch.text,
      author: fetch.author,
    };
    setQofd(dissectedQofd);
  };

  useEffect(() => fetchWofd(searchString), []);
  useEffect(fetchQofd, []);

  return (
    <Card
      sx={{
        width: "25%",
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "space-evenly",
        alignItems: "stretch",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h2">Word of the Day</Typography>
        <ForwardButton searchString={searchString} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexFlow: "column wrap",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <CopyButton text={wofd.headword} />
          <Typography variant="h3">{wofd.headword}</Typography>
        </Box>
        <Typography align="right">{wofd.shortDef}</Typography>
      </Box>
      <Box>
        <Link
          href="https://dictionaryapi.com/"
          target="_blank"
          underline="none"
        >
          <Typography>Powered by Merriam-Webster</Typography>
        </Link>
        <Pagination></Pagination>
      </Box>
    </Card>
  );
};

export default DaysWQ;
