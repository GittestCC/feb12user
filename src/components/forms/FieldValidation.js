import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'

/**
 * a custom field used with redux form used to output a field with validation messages
 * used mainly when there is a `validate` option passed to `Field`
 */

class FieldValidation extends Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    help: PropTypes.string,
    close: PropTypes.bool,
    inputTextOverlay: PropTypes.string,
    focusHere: PropTypes.bool
  }

  state = {
    remainingCharacters: this.props.characterCount,
    warning: false
  }

  calculateRemainingCharacters = e => {
    this.props.input.onChange(e)
    let remainingCharacters = this.props.characterCount - e.target.value.length
    this.setState({ remainingCharacters: remainingCharacters })
    if (e.target.value.length > 200) {
      this.setState({ warning: true })
    } else {
      this.setState({ warning: false })
    }
  }

  render() {
    const {
      input,
      placeholder,
      label,
      type,
      help,
      close,
      id,
      disabled,
      characterCount,
      inputTextOverlay,
      focusHere,
      preFillText
    } = this.props
    const { touched, submitFailed, error } = this.props.meta
    const hasError = (touched || submitFailed) && error
    let className = this.props.className || ''
    if (hasError) {
      className += ' error'
    }

    let inputEl
    switch (type) {
      case 'textarea':
        inputEl = (
          <textarea
            {...input}
            id={id || input.name}
            placeholder={placeholder}
            className={className}
            onChange={this.calculateRemainingCharacters}
            autoFocus={!!focusHere}
          />
        )
        break
      case 'select':
        inputEl = (
          <select
            {...input}
            id={id || input.name}
            placeholder={placeholder}
            className={className}
            disabled={disabled}
          >
            {this.props.children}
          </select>
        )
        break
      default:
        inputEl = (
          <input
            {...input}
            id={id || input.name}
            type={type}
            placeholder={placeholder}
            className={`${className} ${disabled ? 'disabled' : ''}`}
            disabled={disabled}
            autoFocus={!!focusHere}
          />
        )
    }

    if (inputTextOverlay) {
      inputEl = (
        <div className="input-text-overlay-wrapper">
          {inputEl}
          <div className="input-text-overlay-message uppercase">
            {inputTextOverlay}
          </div>
        </div>
      )
    }

    return (
      <div data-test={id || input.name} className="field-wrapper">
        <div className="label-characters">
          <label htmlFor={id || input.name}>
            {label}
            {help && (
              <Tooltip placement="top" overlay={help} trigger="click">
                <span className="tooltip" />
              </Tooltip>
            )}{' '}
          </label>

          {characterCount && (
            <div
              className={`characters-remaining ${
                this.state.warning ? 'over' : ''
              }`}
            >
              {this.state.remainingCharacters}
            </div>
          )}
        </div>

        <div
          className={`field-input-wrapper ${close ? 'with-close' : ''} ${
            preFillText ? 'with-prefill' : ''
          }`}
        >
          <div className="prefill-wrapper">
            {inputEl}
            {preFillText && <span>{preFillText}</span>}
          </div>
          {close && <img src="/images/icon-red-delete.svg" alt="" />}
          {hasError && <div className="error-message">{error}</div>}
        </div>
      </div>
    )
  }
}

export default FieldValidation
