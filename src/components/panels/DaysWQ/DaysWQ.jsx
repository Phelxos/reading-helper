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
import APIs from "../../../helpers/apis";
import useFetch from "../../../hooks/useFetch";

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
          props.fetchwordOfTheDay();
          props.fetchQuoteOfTheDay();
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
  const [page, setPage] = useState(1);
  // general information on the 'Word' and the 'Quote of the Day', respectively
  const [wordOfTheDay, setWordOfTheDay] = useState({
    heading: "Word",
    reference: "Merriam-Webster",
    website: "https://dictionaryapi.com/",
  });
  const [quoteOfTheDay, setQuoteOfTheDay] = useState({
    heading: "Quote",
    reference: "Type.fit",
    website: "https://type.fit/api/quotes",
  });
  // interim state to save the random word, which is fetched via one API, for the use of another API to fetch the word's defintion
  const [fetchedRandomWord, setFetchedRandomWord] = useState("");
  const { get: getRandomWord } = useFetch(
    "https://random-word-api.herokuapp.com/"
  );
  const { get: getRandomWordsDefinition } = useFetch(
    "https://www.dictionaryapi.com/api/v3/references/collegiate/json/"
  );
  const { get: getRandomQuote } = useFetch("https://type.fit/api/");

  const beginFetchingWordOfTheDay = () => {
    getRandomWord("word")
      .then((randomWordsArray) => setFetchedRandomWord(randomWordsArray[0]))
      .catch((e) => console.log("Error: "));
  };

  const fetchQuoteOfTheDay = () => {
    getRandomQuote("quotes").then((listOfRandomQuotes) => {
      const randomNum = Math.ceil(Math.random() * 1642);
      dissect.quoteOfTheDay(listOfRandomQuotes[randomNum]);
    });
  };

  const dissect = {
    wordOfTheDay: (fetchedWord) => {
      if (fetchedWord.hwi === undefined) return; // patches an error regarding the property 'hwi', which sometimes contains 'undefined' causing the code to break
      const dissectedWordOfTheDay = {
        ...wordOfTheDay,
        headword: fetchedWord.hwi.hw.split("*").join(""),
        shortDef: fetchedWord.shortdef[0],
      };
      setWordOfTheDay(dissectedWordOfTheDay);
    },
    quoteOfTheDay: (fetchedQuote) => {
      const dissectedQuoteOfTheDay = {
        ...quoteOfTheDay,
        text: fetchedQuote.text,
        author: fetchedQuote.author,
      };
      setQuoteOfTheDay(dissectedQuoteOfTheDay);
    },
  };

  const handlePageChange = (e) => {
    const value = parseInt(e.target.innerText, 10);
    setPage(value);
  };

  // 1. step of fetching:
  // initialise the fetching of the 'Word of the Day'
  // and fetch the 'Quote of the Day'
  useEffect(() => {
    beginFetchingWordOfTheDay();
    fetchQuoteOfTheDay();
  }, []);

  // 2. step of fetching: once the random word for the 'Word of the Day' has been fetched,
  // fetch the dictionary's entry for the 'Word of the Day'
  useEffect(() => {
    if (fetchedRandomWord === "") return;
    getRandomWordsDefinition(
      `${fetchedRandomWord}?key=${APIs.dictionary.key}`
    ).then((randomWordsEntry) => dissect.wordOfTheDay(randomWordsEntry[0]));
  }, [fetchedRandomWord]);

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
            {page === 1 ? wordOfTheDay.heading : quoteOfTheDay.heading}
          </Box>{" "}
          of the Day
        </Typography>
        <ForwardButton
          size="large"
          color={page === 1 ? "wqofd.fontGreen" : "wqofd.fontRed"}
          opacity={page === 1 ? 0.75 : 0.5}
          input={
            page === 1
              ? { type: "word", searchString: wordOfTheDay.headword }
              : { type: "quote", searchString: quoteOfTheDay.text }
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
          {wordOfTheDay.headword !== undefined ? (
            <CopyButton
              text={page === 1 ? wordOfTheDay.headword : quoteOfTheDay.text}
              color={"wqofd.font"}
            />
          ) : null}
          <Typography
            sx={{
              textShadow: `${page === 1 ? textShadows.bottom.ts : ""}`,
            }}
            align="right"
            component={page === 1 ? "h2" : "p"}
            variant={page === 1 ? "h1" : "h4"}
          >
            {wordOfTheDay.headword === undefined ? (
              <LoadingNote
                fetchwordOfTheDay={beginFetchingWordOfTheDay}
                fetchQuoteOfTheDay={fetchQuoteOfTheDay}
              />
            ) : page === 1 ? (
              wordOfTheDay.headword
            ) : (
              quoteOfTheDay.text
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
          {wordOfTheDay.headword === undefined
            ? null
            : page === 1
            ? wordOfTheDay.shortDef
            : quoteOfTheDay.author !== null
            ? quoteOfTheDay.author
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
          href={page === 1 ? wordOfTheDay.website : quoteOfTheDay.website}
          target="_blank"
          underline="none"
        >
          <Typography
            variant="subtitle2"
            component="p"
            sx={{ opacity: 0.25, color: "black" }}
          >
            Powered by{" "}
            {page === 1 ? wordOfTheDay.reference : quoteOfTheDay.reference}
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
