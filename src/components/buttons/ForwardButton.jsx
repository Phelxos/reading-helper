import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { IconButton, Link } from "@mui/material";
import buttonEffects from "../../helpers/buttonEffects";

const ForwardButton = (props) => {
  const { unhovered, hovered } = buttonEffects;
  return (
    <Link
      href={`https://www.merriam-webster.com/dictionary/${props.searchString}`}
      target="_blank"
    >
      <IconButton sx={hovered}>
        <OpenInNewIcon sx={unhovered} />
      </IconButton>
    </Link>
  );
};

export default ForwardButton;
