import React from "react";
import "../../screensCss/Card.css";

const Card = React.forwardRef(
  ({ id, frontSrc, frontAlt, backLogo, members = [] }, ref) => {
    return (
      <div className="card" id={id} ref={ref}>
        <div className="card-wrapper">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={frontSrc} alt={frontAlt} className="card-image" />
            </div>
            <div className="flip-card-back" style={{ color: "white" }}>
              {backLogo && (
                <img
                  src={backLogo}
                  alt="Team Logo"
                  className="card-back-logo"
                />
              )}
              <div className="members-list">
                <ul>
                  {members.map((member, index) => (
                    <li key={index}>{member}</li>
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
