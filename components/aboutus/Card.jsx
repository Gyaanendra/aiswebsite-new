import React from "react";
import "../../screensCss/Card.css";

const Card = React.forwardRef(
  ({ id, frontSrc, frontAlt, backSrc, memberNames = [] }, ref) => {
    return (
      <div className="card" id={id} ref={ref}>
        <div className="card-wrapper">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={frontSrc} alt={frontAlt} className="card-front-img" />
            </div>
            <div className="flip-card-back">
              <img src={backSrc} alt="Card Logo" className="card-logo" />
              <div className="member-names">
                <ul>
                  {memberNames.map((name, idx) => (
                    <li key={idx}>{name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Card;
