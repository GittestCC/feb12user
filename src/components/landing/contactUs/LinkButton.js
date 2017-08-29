import React from 'react';
import { Link } from 'react-router-dom';

export default props =>
  <Link to={props.link} className={`link-button ${props.color}`}>
    <div className="text">
      <div className="link-button-inner">
        <h4 className="bold larger">
          {props.title}
        </h4>
        <h4>
          {props.subtitle}
        </h4>
      </div>
    </div>
    <div className="icon-wrapper">
      <div className={`icon ${props.icon}`} />
    </div>
  </Link>;
