import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import iscroll from 'iscroll'
import IScroll from 'react-iscroll'

import { Button } from '../forms'

class DropDown extends Component {
  state = {
    isShown: false,
    filterText: null,
    // this is a workaround for when opening a dropdown externally we don't
    // want the onexit to fire for the first time
    noClose: false
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
  }

  onClickOutside = e => {
    if (this.state.noClose) {
      this.setState({ noClose: false })
      return
    }
    if (this.props.id) {
      const selector = `#${this.props.id}`
      if (document.querySelector(selector).contains(e.target)) {
        return
      }
    } else if (e.target.matches('.dropdown-button')) {
      return
    }
    if (this.state.isShown) {
      this.setState({ isShown: false, filterText: null })
      if (this.filterInput) {
        this.filterInput.value = ''
      }
    }
  }

  onToggle = () => {
    this.setState(previousState => ({
      isShown: !previousState.isShown
    }))
  }

  onUpdateFilter = e => {
    this.setState({ filterText: e.target.value })
  }

  onPreventDefault(e) {
    e.preventDefault()
  }

  getFilteredList() {
    const filter = this.state.filterText
    return this.props.list.filter(item => {
      if (!filter) return true
      return item[this.props.filterField].startsWith(filter)
    })
  }

  render() {
    const { isShown } = this.state
    const {
      id,
      dropdownText,
      dropdownClass,
      className,
      children,
      type,
      actionText,
      actionHandler,
      history
    } = this.props
    const ItemComponent = this.props.component
    const isFilter = type === 'filter'
    const filterClass = isFilter ? 'dropdown-filter' : ''
    return (
      <div
        onClick={this.onPreventDefault}
        className={`dropdown ${filterClass} ${className || ''}`}
        id={id}
      >
        <button
          type="button"
          onClick={this.onToggle}
          className={`dropdown-button ${dropdownClass || ''}`}
        >
          {dropdownText}
        </button>
        <div className={`dropdown-content ${isShown ? 'isShown' : ''}`}>
          {isFilter && (
            <div className="dropdown-content-filter">
              <input
                className="dropdown-filter-input"
                onKeyUp={this.onUpdateFilter}
                ref={input => {
                  this.filterInput = input
                }}
              />
            </div>
          )}

          <div
            className={`dropdown-content-items ${isFilter
              ? 'dropdown-content-items-scroll'
              : ''}`}
          >
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
              <div className="dropdown-scroll-container">
                {isFilter ? (
                  this.getFilteredList().map((item, index) => (
                    <ItemComponent
                      {...item}
                      navigateTo={history.push}
                      key={index}
                    />
                  ))
                ) : (
                  children
                )}
              </div>
            </IScroll>
          </div>

          {isFilter && (
            <div className="dropdown-content-action">
              <Button buttonType="dark" onClick={actionHandler}>
                {actionText}
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(DropDown)
