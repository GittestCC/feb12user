import React from 'react'
const TagItem = ({
  text,
  tag,
  className,
  url,
  navigateTo,
  active,
  version
}) => {
  const goToUrl = () => navigateTo(url)
  return (
    <button className={`tag-item ${active ? 'active' : ''}`} onClick={goToUrl}>
      <div className="tag-item-text">{text}</div>
      <div className={`text-highlight ${className}`}>{tag}</div>
      {version && <div className="tag-item-breadcrumb-version">{version}</div>}
    </button>
  )
}

export default TagItem
