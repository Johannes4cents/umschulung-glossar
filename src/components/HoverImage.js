import useOnHover from "../modals/useOnHover";

const HoverImage = ({
  imgUrl,
  onClick,
  description,
  maxWidth = 25,
  maxHeight = 25,
}) => {
  const hover = useOnHover({ item: imgUrl, hoverDescription: description });
  return (
    <div {...hover.divProps}>
      <img
        src={imgUrl}
        style={{
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
