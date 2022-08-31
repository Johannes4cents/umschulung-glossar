import React, { useState } from "react";
import { useEffect } from "react";

const CheckBox = ({
  item,
  includeList,
  identifier,
  otherItem,
  size = "icon20",
}) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (identifier && !includeList) {
      setSelected(item[identifier] == otherItem[identifier]);
    } else if (identifier && includeList) {
      setSelected(
        includeList.map((i) => i[identifier]).includes(item[identifier])
      );
    } else if (!identifier && !includeList) {
      setSelected(item == otherItem);
    } else if (!identifier && includeList) {
      setSelected(includeList.includes(item));
    }
  }, [item, includeList, otherItem]);
  return (
    <img
      src={
        selected
          ? "/images/drawable/checked_box.png"
          : "/images/drawable/checkbox_unchecked.png"
      }
      className={size}
    />
  );
};

export default CheckBox;
