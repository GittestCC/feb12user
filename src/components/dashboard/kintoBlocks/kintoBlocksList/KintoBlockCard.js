import React from 'react'
import { Link } from 'react-router-dom'

export const KintoBlockCard = ({
  kintoBlock,
  isLatestVersionPending,
  latestVersion
}) => {
  return (
    <Link
      to={`/app/dashboard/kintoblocks/${kintoBlock.id}/versions/${latestVersion}`}
      className={`kintoblock ${kintoBlock.color}`}
    >
      <div className="text">
        <h3>{kintoBlock.name}</h3>
        <h4 className="version">{latestVersion}</h4>
        {isLatestVersionPending && (
          <div className="text-highlight orange">PENDING</div>
        )}
      </div>
      <div className="icons">
        <div className="applications">
          <div className="application" />
          <div className="application" />
        </div>
        <div className="menu" />
      </div>
    </Link>
  )
}

export default KintoBlockCard
