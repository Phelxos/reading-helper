import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddBtn = (props) => {
  return (
    <IconButton aria-label="add a book" onClick={props.onAddClick}>
      <AddCircleIcon sx={{ fontSize: 36 }} />
    </IconButton>
  );
};

export default AddBtn;
