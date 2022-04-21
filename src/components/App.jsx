import FocusModeButton from "./buttons/FocusModeButton/FocusModeButton";
import CurrentBooks from "./panels/CurrentBooks/CurrentBooks";
import DaysWQ from "./panels/DaysWQ/DaysWQ";
import Bestseller from "./panels/Bestseller/Bestseller";
import OtherBooks from "./panels/OtherBooks/OtherBooks";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../styles/styles";

function App() {
  console.log(theme);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CurrentBooks />
        <OtherBooks />
        <Bestseller />
        <DaysWQ />
        <FocusModeButton />
      </ThemeProvider>
    </>
  );
}

export default App;
