import { CardMedia } from "@mui/material";

const imgDimensions = (width = 150) => {
  return { imgWidth: width, imgHeight: width * 1.5 };
};

const CurrentBookCover = (props) => {
  const defaultCoverLink =
    "https://images.unsplash.com/photo-1528459105426-b9548367069b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=728&q=80";
  const imgSrc = props.cover || defaultCoverLink;
  const { imgWidth, imgHeight } = imgDimensions();
  return (
    <CardMedia
      component="img"
      image={imgSrc}
      sx={{
        width: imgWidth,
        height: imgHeight,
        borderRadius: "1rem",
        mr: "2rem",
      }}
    />
  );
};

export { CurrentBookCover, imgDimensions };
