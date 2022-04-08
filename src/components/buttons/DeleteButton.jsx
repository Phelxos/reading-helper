import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import buttonEffects from "../../helpers/buttonEffects";

const DeleteButton = (props) => {
  const { unhovered, hovered } = buttonEffects;
  return (
    <IconButton sx={hovered} onClick={() => props.onDeleteClick(props.id)}>
      <DeleteIcon sx={{ ...unhovered, opacity: 0.5 }} />
    </IconButton>
  );
};

export default DeleteButton;
