import React from 'react';

export default props =>
  <div className={`resource-card ${props.type}`}>
    <div className="icon" style={{ backgroundImage: `url(${props.icon})` }} />
    <h4 className="bold">
      {props.title}
    </h4>
    <h4>
      {props.subtitle}
    </h4>
  </div>;
