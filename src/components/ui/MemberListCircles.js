import React from 'react'
import PropTypes from 'prop-types'
import { getInitials } from '../../helpers/stringHelper'

//TODO: write tests for this component
const MemberListCircles = ({
  users,
  canEdit,
  editAction,
  numberOfItemsShown
}) => {
  // the edit circle will take a spot
  if (canEdit) {
    numberOfItemsShown = numberOfItemsShown - 1
  }
  let plusCount = null
  // because we are gonna show a +number icon
  if (users.length > numberOfItemsShown) {
    numberOfItemsShown = numberOfItemsShown - 1
    plusCount = users.length - numberOfItemsShown
  }
  return (
    <div className="member-list-circles dark">
      {users.slice(0, numberOfItemsShown).map((member, index) => (
        <div className="avatar avatar-text avatar-small uppercase" key={index}>
          {getInitials(member.username)}
        </div>
      ))}
      {plusCount && (
        <div className="avatar avatar-small avatar-plus">+{plusCount}</div>
      )}
      {canEdit && (
        <a
          className="avatar avatar-small avatar-edit hide-text"
          onClick={editAction}
        >
          edit
        </a>
      )}
    </div>
  )
}

MemberListCircles.propTypes = {
  users: PropTypes.array.isRequired,
  canEdit: PropTypes.bool.isRequired,
  editAction: PropTypes.func,
  numberOfItemsShown: PropTypes.number.isRequired
}

export default MemberListCircles
