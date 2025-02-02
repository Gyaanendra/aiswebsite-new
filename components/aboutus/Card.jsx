import React from "react";

const Card = React.forwardRef(({ id, frontSrc, frontAlt, backText }, ref) => {
  return (
    <div className="card" id={id} ref={ref}>
      <div className="card-wrapper">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={frontSrc} alt={frontAlt} />
          </div>
          <div className="flip-card-back">
            <p>{backText}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Card;