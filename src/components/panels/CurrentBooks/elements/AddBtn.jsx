import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const AddBtn = (props) => {
  return (
    <IconButton aria-label="add a book" onClick={props.onAddClick}>
      {props.displayCancelBtn ? (
        <CancelIcon sx={{ fontSize: 36 }} />
      ) : (
        <AddCircleIcon sx={{ fontSize: 36 }} />
      )}
    </IconButton>
  );
};

export default AddBtn;
