import useOnHover from "../modals/useOnHover";

const HoverImage = ({
  imgUrl,
  onClick,
  description,
  maxWidth = 25,
  maxHeight = 25,
  standardGray = false,
}) => {
  const hover = useOnHover({ item: imgUrl, hoverDescription: description });
  return (
    <div {...hover.divProps}>
      <img
        src={imgUrl}
        style={{
          filter: !standardGray ? null : hover.hover ? null : "grayscale(100%)",
          objectFit: "contain",
          maxWidth: `${maxWidth}px`,
          maxHeight: `${maxHeight}px`,
        }}
        onClick={onClick}
      />
      {hover.hoverDescription}
    </div>
  );
};

export default HoverImage;
