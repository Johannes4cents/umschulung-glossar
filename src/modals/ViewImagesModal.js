import React, { useEffect, useState } from "react";
import { useTransition, animated } from "react-spring";
import HoverImage from "../components/HoverImage";

const ViewImagesModal = ({ images }) => {
  const [displayedImages, setDisplayedImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images != null) {
      console.log("images are - ", images);
      setDisplayedImages(images);
    }
  }, [images]);

  function switchImage(direction) {
    setIndex((state) => state.length + (direction % state.length));
  }

  const transitions = useTransition(index, {
    from: { opacity: 0, transform: "scale(1.1)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.9)" },
  });
  return (
    <div className="divRow">
      <HoverImage
        onClick={() => {
          switchImage(-1);
        }}
        rotate={-90}
        imgUrl={"/images/icons/icon_upvote.png"}
        standardGray={true}
      />
      {transitions(({ index, props, key }) => (
        <animated.img
          src={displayedImages[index]}
          key={key}
          style={{
            ...props,
            objectFit: "contain",
            width: "400px",
            height: "400px",
          }}
        />
      ))}
      <HoverImage
        rotate={90}
        onClick={() => {
          switchImage(1);
        }}
        imgUrl={"/images/icons/icon_upvote.png"}
        standardGray={true}
      />
    </div>
  );

  return <animated.div></animated.div>;
};
export default ViewImagesModal;
