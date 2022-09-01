const PropFieldDiv = ({ description, valueElement }) => {
  return (
    <div className="divColumn" style={{ width: "100%", marginBottom: "5px" }}>
      <div className="textWhite">{description}</div>
      {valueElement}
    </div>
  );
};

export default PropFieldDiv;
