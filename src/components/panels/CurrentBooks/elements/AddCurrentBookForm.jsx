import {
  Box,
  Button,
  Input,
  Tooltip,
  TextField,
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { imgDimensions } from "./CurrentBookCover";

const textFieldWrapperStyle = { padding: "1rem" };

const AddCurrentBookForm = (props) => {
  const { imgWidth, imgHeight } = imgDimensions();
  return (
    <form
      sx={{ display: "flex", flexDirection: "column" }}
      onSubmit={props.onFormSubmit}
    >
      <Box
        sx={{
          boxSizing: "content-box",
          minWidth: "100%",
          maxWidth: "100%",
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            alignSelf: "center",
            width: imgWidth,
            height: imgHeight,
            borderRadius: "1rem",
            margin: "0 3rem",
            padding: "3rem",
            border: "1px solid",
            borderColor: "booksLists.formBlueGrey",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Input
            type="file"
            name="cover"
            onChange={props.onInputChange}
            label="Cover"
          />
        </Box>
        <Box
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
          }}
        >
          <Box sx={textFieldWrapperStyle}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              required
              onChange={props.onInputChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              ...textFieldWrapperStyle,
            }}
          >
            <TextField
              label="Authors"
              name="authors"
              helperText="Separate authors by comma"
              FormHelperTextProps={{ fontSize: "2rem" }}
              fullWidth
              required
              onChange={props.onInputChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
                ...textFieldWrapperStyle,
              }}
            >
              <TextField
                label="Edition"
                name="edition"
                type="number"
                inputProps={{ min: 1, max: 2099, step: 1 }}
                fullWidth
                onInput={props.onInputChange}
                sx={{ mb: "1rem" }}
              />
              <TextField
                label="Release year"
                name="releaseYear"
                type="number"
                inputProps={{ min: 0, max: 2050, step: 1 }}
                fullWidth
                onInput={props.onInputChange}
                sx={{ mt: "1rem" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "stretch",
                flexGrow: 1,
                ...textFieldWrapperStyle,
              }}
            >
              <FormControl>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormLabel>ISBN format</FormLabel>
                  <Tooltip
                    title="Since 2007, the new format 'ISBN-13' with 13 digits is obligatory."
                    placement="right"
                  >
                    <HelpIcon
                      sx={{
                        fontSize: "1rem",
                        ml: ".5rem",
                        color: "booksLists.formBlueGrey",
                        "&:hover": { color: "black" },
                        transition: "all .5s",
                      }}
                    />
                  </Tooltip>
                </Box>
                <RadioGroup
                  row
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    ml: ".5rem",
                  }}
                >
                  <FormControlLabel
                    value="13"
                    control={<Radio />}
                    label="ISBN-13"
                  />
                  <FormControlLabel
                    value="10"
                    control={<Radio />}
                    label="ISBN-10"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                label="ISBN"
                name="isbn"
                fullWidth
                onInput={props.onInputChange}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", margin: "0 0 2rem 0" }}
      >
        <Button
          variant="contained"
          type="submit"
          sx={{ alignSelf: "center", width: "90%" }}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default AddCurrentBookForm;
