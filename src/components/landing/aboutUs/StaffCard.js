import React from 'react';

const StaffCard = (props) => (
  <div className="staff-card">
    <img src={props.image} alt="" />

    <div>
      <h3>
        {props.name}
      </h3>
      <h4>
        {props.title}
      </h4>
      <h5>
        {props.byline}
      </h5>
    </div>
  </div>
)

export default StaffCard;
