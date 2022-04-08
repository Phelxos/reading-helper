import FocusModeButton from "./buttons/FocusModeButton/FocusModeButton";
import CurrentBooks from "./panels/CurrentBooks/CurrentBooks";
import DaysWQ from "./panels/DaysWQ/DaysWQ";

function App() {
  return (
    <>
      <CurrentBooks />
      <DaysWQ />
      <FocusModeButton />
    </>
  );
}

export default App;
