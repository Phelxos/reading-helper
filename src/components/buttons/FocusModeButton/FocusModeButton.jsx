import Button from "@mui/material/Button";

const FocusModeButton = () => {
  const buttonDimension = 200;
  return (
    <Button
      sx={{
        borderRadius: "50%",
        width: buttonDimension,
        height: buttonDimension,
        position: "absolute",
        bottom: (-1 * buttonDimension) / 4,
        left: (-1 * buttonDimension) / 4,
      }}
      variant="contained"
      className="focusModeButton__button"
    >
      <i className="fa-solid fa-glasses fa-10x"></i>
    </Button>
  );
};

export default FocusModeButton;
