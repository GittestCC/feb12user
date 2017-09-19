import React from 'react'
const TagItem = ({ text, tag, className, url, navigateTo, active }) => {
  const goToUrl = () => navigateTo(url)
  return (
    <button className={`tag-item ${active ? 'active' : ''}`} onClick={goToUrl}>
      <div className="tag-item-text">{text}</div>
      <div className={`text-highlight ${className}`}>{tag}</div>
    </button>
  )
}

export default TagItem
