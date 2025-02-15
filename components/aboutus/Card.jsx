import React from "react";

const Card = React.forwardRef(({ id, frontSrc, frontAlt, backSrc }, ref) => {
  return (
    <div className="card" id={id} ref={ref}>
      <div className="card-wrapper">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={frontSrc} alt={frontAlt} />
          </div>
          <div className="flip-card-back">
            <img
              src={backSrc}
              alt="Card Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Card;