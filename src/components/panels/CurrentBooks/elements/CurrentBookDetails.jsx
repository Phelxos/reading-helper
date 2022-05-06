import { useState } from "react";
import {
  Typography,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import buttonEffects from "../../../../helpers/buttonEffects";
import chooseOrdinalIndicator from "../../../../helpers/chooseOrdinalIndicator";
import CopyButton from "../../../buttons/CopyButton";
import DeleteButton from "../../../buttons/DeleteButton";

const CurrentBookDetails = (props) => {
  return (
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "stretch",
        padding: "2rem",
        "&:last-child": {
          paddingBottom: "2rem",
        },
        flexGrow: 1,
        ml: "1rem",
        backgroundColor: "booksLists.cardLight",
        borderRadius: "1rem",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <DeleteButton onDeleteClick={props.handleDeleteClick} id={props.id} />
        </Box>
        <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
          <CopyButton text={props.book.title} />
          <Typography
            sx={{ pl: 0.8 }}
            variant="h3"
            component="h3"
            textAlign="right"
          >
            {props.book.title}
          </Typography>
        </Box>
      </Box>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {props.book.authors.map((author, index) => {
          return (
            <ListItem
              sx={{ textAlign: "right", width: "auto", alignItems: "center" }}
              disableGutters
              dense
              disablePadding
              key={index}
            >
              <CopyButton text={author} />
              <ListItemText
                sx={{ pl: 0.8 }}
                primaryTypographyProps={{ fontSize: "1.5rem" }}
              >
                {author}
              </ListItemText>
              <CircleIcon sx={{ fontSize: 8, ml: 0.5 }} />
            </ListItem>
          );
        })}
      </List>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h5" component="p" sx={{ fontSize: "1rem" }}>
            {Number.isNaN(props.book.edition) ? 1 : props.book.edition}
            {chooseOrdinalIndicator(props.book.edition)} Edition
          </Typography>
          <Typography variant="h1" component="p">
            {Number.isNaN(props.book.releaseYear)
              ? 1000
              : props.book.releaseYear}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <CopyButton text={props.book.isbn} />
          <Typography variant="h5" component="p">
            {props.book.isbn || 1234567890}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  );
};

export default CurrentBookDetails;
