import React from 'react';

const TitleWithLines = ({ text }) => (
  <div className="title-with-lines">
    <div className="line" />
    <h2 className="gallery">
      {text}
    </h2>
    <div className="line" />
  </div>
)

export default TitleWithLines;
