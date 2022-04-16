import FocusModeButton from "./buttons/FocusModeButton/FocusModeButton";
import CurrentBooks from "./panels/CurrentBooks/CurrentBooks";
import DaysWQ from "./panels/DaysWQ/DaysWQ";
import Bestseller from "./panels/Bestseller/Bestseller";
import OtherBooks from "./panels/OtherBooks/OtherBooks";

function App() {
  return (
    <>
      <CurrentBooks />
      <OtherBooks />
      <Bestseller />
      <DaysWQ />
      <FocusModeButton />
    </>
  );
}

export default App;
