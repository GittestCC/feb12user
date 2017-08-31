import React from 'react'
import { Link } from 'react-router-dom'

export default props => {
  console.log(props.externalLink)
  if (props.externalLink) {
    return (
      <a href={props.externalLink} target="_blank">
        <div className={`resource-card ${props.type}`}>
          <div
            className="icon"
            style={{ backgroundImage: `url(${props.icon})` }}
          />
          <h4 className="bold">{props.title}</h4>
          <h4>{props.subtitle}</h4>
        </div>
      </a>
    )
  } else if (props.externalLink && props.download === 'true') {
    return (
      <a href={props.externalLink} download>
        <div className={`resource-card ${props.type}`}>
          <div
            className="icon"
            style={{ backgroundImage: `url(${props.icon})` }}
          />
          <h4 className="bold">{props.title}</h4>
          <h4>{props.subtitle}</h4>
        </div>
      </a>
    )
  }
  if (props.internalLink) {
    return (
      <Link to={props.internalLink}>
        <div className={`resource-card ${props.type}`}>
          <div
            className="icon"
            style={{ backgroundImage: `url(${props.icon})` }}
          />
          <h4 className="bold">{props.title}</h4>
          <h4>{props.subtitle}</h4>
        </div>
      </Link>
    )
  }
}
