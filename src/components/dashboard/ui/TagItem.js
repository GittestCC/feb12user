import React from 'react'
import PropTypes from 'prop-types'
const TagItem = ({
  text,
  tag,
  className,
  url,
  navigateTo,
  active,
  version
}) => (
  <button
    className={`tag-item ${active ? 'active' : ''}`}
    onClick={() => navigateTo(url)}
  >
    <div className="tag-item-text">{text}</div>
    <div className={`text-highlight ${className} ${tag} `}>{tag}</div>
    {version && <div className="tag-item-breadcrumb-version">{version}</div>}
  </button>
)

TagItem.propTypes = {
  text: PropTypes.string.isRequired,
  tag: PropTypes.string,
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
  navigateTo: PropTypes.func.isRequired,
  active: PropTypes.bool,
  version: PropTypes.string
}

export default TagItem
