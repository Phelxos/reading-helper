import { CopyToClipboard } from "react-copy-to-clipboard";
import { IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import buttonEffects from "../../helpers/buttonEffects";

const CopyButton = (props) => {
  const { unhovered, hovered } = buttonEffects;
  return (
    <CopyToClipboard text={props.text}>
      <IconButton sx={hovered}>
        <ContentCopyIcon sx={{ ...unhovered, color: `${props.color}` }} />
      </IconButton>
    </CopyToClipboard>
  );
};

export default CopyButton;
