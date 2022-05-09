import {
  Card,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const BookList = (props) => {
  const { list } = props;
  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" component="p">
          {list.icon}
        </Typography>
        <Typography variant="h3" component="h3">
          {list.name}
        </Typography>
      </Box>
      <List>
        {list.books.map((book) => {
          <ListItem>
            <ListItemText>
              <Box>
                <Typography>{book.title}</Typography>
              </Box>
              <Box>
                <Typography>{book.year}</Typography>
                <Typography>{book.author}</Typography>
              </Box>
            </ListItemText>
          </ListItem>;
        })}
      </List>
    </Card>
  );
};

export default BookList;
