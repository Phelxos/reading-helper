import FocusModeButton from "./buttons/FocusModeButton/FocusModeButton";
import CurrentBooks from "./panels/CurrentBooks/CurrentBooks";
import DaysWQ from "./panels/DaysWQ/DaysWQ";
import Bestseller from "./panels/Bestseller/Bestseller";

function App() {
  return (
    <>
      <CurrentBooks />
      <Bestseller />
      <DaysWQ />
      <FocusModeButton />
    </>
  );
}

export default App;
