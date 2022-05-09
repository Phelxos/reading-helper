import FocusModeButton from "./buttons/FocusModeButton/FocusModeButton";
import CurrentBooks from "./panels/CurrentBooks/CurrentBooks";
import DaysWQ from "./panels/DaysWQ/DaysWQ";
import Bestseller from "./panels/Bestseller/Bestseller";
import BookLists from "./panels/BookLists/BookLists";
import { Grid, ThemeProvider } from "@mui/material";
import { theme } from "../../styles/styles";

function App() {
  console.log(theme);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container spacing={4} sx={{ padding: "4rem 2rem" }}>
          <Grid item lg={6} xs={12}>
            <CurrentBooks />
          </Grid>
          <Grid item lg={6} xs={12}>
            <BookLists />
          </Grid>
          <Grid item lg={8} xs={12}>
            <Bestseller />
          </Grid>
          <Grid item lg={4} xs={12}>
            <DaysWQ />
          </Grid>
        </Grid>
        <FocusModeButton />
      </ThemeProvider>
    </>
  );
}

export default App;
