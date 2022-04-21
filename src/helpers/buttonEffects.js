const buttonEffects = {
  unhovered: { opacity: 0.25, transition: "all 0.25s" },
  hovered: [
    {
      "&:hover > *": {
        opacity: 1,
      },
    },
  ],
};

export default buttonEffects;
