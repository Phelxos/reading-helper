import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Pagination,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import ForwardButton from "../../buttons/ForwardButton";
import CopyButton from "../../buttons/CopyButton";
import ReplayIcon from "@mui/icons-material/Replay";
import { textShadows } from "../../../helpers/shadows";
import buttonEffects from "../../../helpers/buttonEffects";

const { ts } = textShadows.bottom;

const LoadingNote = (props) => {
  const [note, setNote] = useState("Loading…");
  const { unhovered, hovered } = buttonEffects;
  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <IconButton
        sx={hovered}
        onClick={() => {
          setNote("Please wait…");
          props.fetchWofd();
          props.fetchQofd();
        }}
      >
        <ReplayIcon
          sx={{
            ...unhovered,
            fontSize: 24,
            color: "white",
          }}
        />
      </IconButton>
      <Typography component="p" variant="h1" sx={{ textShadow: "none" }}>
        {note}
      </Typography>
    </Box>
  );
};

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

  const fetchWofd = async () => {
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
  };

  useEffect(() => {
    fetchWofd();
    return () => {};
  }, []);
  useEffect(() => {
    fetchQofd();
    return () => {};
  }, []);

  return (
    <Card
      sx={{
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "space-between",
        alignItems: "stretch",
        padding: "2rem",
        backgroundColor: "wqofd.cardBgr",
        borderRadius: "1rem",
        color: "wqofd.font",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
        }}
      >
        <Typography component="h2" variant="h3">
          <Box
            component="span"
            sx={{
              fontSize: "4rem",
              fontWeight: 700,
              width: 90,
              display: "inline-block",
              textAlign: "center",
            }}
            color={page === 1 ? "wqofd.fontGreen" : "wqofd.fontRed"}
          >
            {page === 1 ? wofd.heading : qofd.heading}
          </Box>{" "}
          of the Day
        </Typography>
        <ForwardButton
          size="large"
          color={page === 1 ? "wqofd.fontGreen" : "wqofd.fontRed"}
          opacity={page === 1 ? 0.75 : 0.5}
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
            m: "3rem 0",
          }}
        >
          {wofd.headword !== undefined ? (
            <CopyButton
              text={page === 1 ? wofd.headword : qofd.text}
              color={"wqofd.font"}
            />
          ) : null}
          <Typography
            sx={{
              textShadow: `${page === 1 ? ts : ""}`,
            }}
            align="right"
            component={page === 1 ? "h2" : "p"}
            variant={page === 1 ? "h1" : "h4"}
          >
            {wofd.headword === undefined ? (
              <LoadingNote fetchWofd={fetchWofd} fetchQofd={fetchQofd} />
            ) : page === 1 ? (
              wofd.headword
            ) : (
              qofd.text
            )}
          </Typography>
        </Box>
        <Typography
          align="right"
          component="p"
          sx={{
            fontSize: `${page === 1 ? "2rem" : "3rem"}`,
            fontStyle: `${page === 1 ? "italic" : "normal"}`,
            textShadow: `${page === 1 ? "" : ts}`,
            wordWrap: "break-word",
          }}
          variant={page === 1 ? "subtitle1" : "h4"}
        >
          {wofd.headword === undefined
            ? null
            : page === 1
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
          <Typography
            variant="subtitle2"
            component="p"
            sx={{ opacity: 0.25, color: "black" }}
          >
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
