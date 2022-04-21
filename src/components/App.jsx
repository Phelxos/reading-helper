import FocusModeButton from "./buttons/FocusModeButton/FocusModeButton";
import CurrentBooks from "./panels/CurrentBooks/CurrentBooks";
import DaysWQ from "./panels/DaysWQ/DaysWQ";
import Bestseller from "./panels/Bestseller/Bestseller";
import OtherBooks from "./panels/OtherBooks/OtherBooks";
import { Grid, ThemeProvider } from "@mui/material";
import { theme } from "../../styles/styles";

function App() {
  console.log(theme);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container spacing={4} sx={{ padding: "2rem" }}>
          <Grid item lg={8} xs={12}>
            <CurrentBooks />
          </Grid>
          <Grid item lg={4} xs={12}>
            <DaysWQ />
          </Grid>
          <Grid item lg={8} xs={12}>
            <Bestseller />
          </Grid>
        </Grid>
        <FocusModeButton />
      </ThemeProvider>
    </>
  );
}

export default App;
