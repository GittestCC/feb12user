import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import iscroll from 'iscroll'
import IScroll from 'react-iscroll'
import Tooltip from 'rc-tooltip'
import isEmpty from 'lodash/isEmpty'
import { filterArray } from '../../../helpers/arrayHelper'

class KintoBlockTagAndBranchDropDown extends Component {
  static propTypes = {
    kintoBlock: PropTypes.object.isRequired,
    kintoBlockType: PropTypes.string.isRequired,
    branchArray: PropTypes.array.isRequired,
    tagArray: PropTypes.array.isRequired,
    dropdownText: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func.isRequired,
    isForm: PropTypes.bool
  }

  state = {
    isShown: false,
    noClose: false,
    filterText: null,
    selectedTab: this.props.kintoBlockType
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutside, false)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutside, false)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isShown && !this.state.isShown) {
      this.setState({ isShown: true, noClose: true })
      setTimeout(() => {
        if (this.filterInput) {
          this.filterInput.focus()
        }
      })
    }

    if (nextProps.kintoBlockType !== this.props.kintoBlockType) {
      this.setState({ selectedTab: nextProps.kintoBlockType })
    }
  }

  onClickOutside = e => {
    if (this.state.noClose) {
      this.setState({ noClose: false })
      return
    }
    if (this.props.id) {
      const selector = `#${this.props.id}`
      if (
        document.querySelector(selector).contains(e.target) &&
        !e.target.matches('.dropdown-content-items button')
      ) {
        return
      }
    }

    if (this.state.isShown) {
      if (this.props.onHide) {
        this.props.onHide()
      }
      if (this.filterInput) {
        this.filterInput.value = ''
      }
      this.setState({ isShown: false, filterText: null })
      if (this.filterInput) {
        this.filterInput.value = ''
      }
    }
  }

  onToggle = () => {
    let toggledState = !this.state.isShown
    this.setState({
      isShown: toggledState,
      selectedTab: this.props.kintoBlockType
    })
    if (!toggledState && this.props.onHide) {
      this.props.onHide()
    }
  }

  onUpdateFilter = e => {
    this.setState({ filterText: e.target.value })
  }

  onPreventDefault(e) {
    e.preventDefault()
  }

  toggleTab = tabName => {
    this.setState({ selectedTab: tabName })
  }

  getFilteredList = array => {
    return filterArray(array, 'name', this.state.filterText)
  }

  isActive = name => {
    return !this.props.noHighlight && this.props.dropdownText === name
  }

  render() {
    const { isShown, selectedTab } = this.state
    const {
      id,
      branchArray,
      tagArray,
      dropdownText,
      kintoBlockType,
      className,
      onClickHandler,
      isForm
    } = this.props

    return (
      <div
        id={id}
        className={`dropdown dropdown-filter ${className ? className : ''}`}
        onClick={this.onPreventDefault}
      >
        {isForm ? (
          <div className="tag-and-branch-input">
            <input
              data-test="dropdown-filter"
              className="dropdown-filter-input tag-and-branch-dropdown"
              onKeyUp={this.onUpdateFilter}
              placeholder={dropdownText}
              onClick={this.onToggle}
              ref={input => {
                this.filterInput = input
              }}
            />
            <span className={`icon ${isShown ? 'search' : ''}`} />
          </div>
        ) : (
          <div className="breadcrumb-with-icon">
            <Tooltip
              placement="top"
              overlay={selectedTab === 'tag' ? 'Tag' : 'Branch'}
              trigger="click"
            >
              {kintoBlockType === 'tag' ? (
                <div className="tag icon small" />
              ) : (
                <div className="branch icon small" />
              )}
            </Tooltip>
            <h4 data-test="breadcrumb-text">{dropdownText}</h4>
            <button
              type="button"
              onClick={this.onToggle}
              className="dropdown-button breadcrumb-icon"
              data-test="breadcrumb-toggle-tag-and-branch"
            />
          </div>
        )}

        <div
          className={`dropdown-content tag-branch ${isShown ? 'isShown' : ''} ${
            isForm ? 'form-dropdown' : ''
          }`}
        >
          <div className="dropdown-tabs">
            <div
              className={`tab branches ${
                selectedTab === 'branch' ? 'active' : ''
              }`}
              onClick={() => this.toggleTab('branch')}
              data-test="branch-tab"
            >
              <div className="branch icon" />
              <h3>branches</h3>
            </div>

            <div
              className={`tab tags ${selectedTab === 'tag' ? 'active' : ''}`}
              onClick={() => this.toggleTab('tag')}
              data-test="tag-tab"
            >
              <h3>tags</h3>
              <div className="tag icon" />
            </div>
          </div>

          {!isForm && (
            <div className="dropdown-content-filter tags-and-branches">
              <input
                data-test="dropdown-filter"
                className="dropdown-filter-input"
                onKeyUp={this.onUpdateFilter}
                ref={input => {
                  this.filterInput = input
                }}
              />
            </div>
          )}

          <div className="dropdown-content-items dropdown-content-items-scroll">
            <IScroll
              iScroll={iscroll}
              options={{
                scrollbars: true,
                mouseWheel: true,
                fadeScrollbars: true,
                shrinkScrollbars: 'scale',
                interactiveScrollbars: true
              }}
            >
              <div
                className={`dropdown-scroll-container ${
                  isForm ? 'form-scroll-container' : ''
                }`}
              >
                {this.state.selectedTab === 'tag' ? (
                  <div className="tag-list" data-test="tag-list">
                    {this.getFilteredList(tagArray).map((item, index) => (
                      <button
                        key={index}
                        className={`tag-item tag-button ${
                          this.isActive(item.name) ? 'active' : ''
                        }`}
                        onClick={() => onClickHandler(item)}
                      >
                        <div className="tag-and-commit">
                          <div className="tag-item-text">{item.name}</div>
                          <div className="tag-item-text">{item.commitSha}</div>
                        </div>
                        <div className="date">Tag time: {item.lastUpdated}</div>
                        <div className="notes">{item.notes}</div>
                      </button>
                    ))}

                    {isEmpty(tagArray) && (
                      <div className="no-tags">No tags added.</div>
                    )}
                  </div>
                ) : (
                  <div className="branch-list" data-test="branch-list">
                    {this.getFilteredList(branchArray).map((item, index) => (
                      <button
                        key={index}
                        className={`tag-item ${
                          this.isActive(item.name) ? 'active' : ''
                        }`}
                        onClick={() => onClickHandler(item)}
                      >
                        <div className="tag-item-text">{item.name}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </IScroll>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(KintoBlockTagAndBranchDropDown)
