import React from 'react'

// TODO need optimization, alot of nested defined functions
const VersionInputs = fields => {
  const getError = fieldKey => {
    const field = fields[fieldKey]
    const { touched, submitFailed, error } = field.meta
    const hasError = (touched || submitFailed) && error
    return hasError ? error : null
  }

  const getFieldClassName = fieldKey => {
    const hasError = getError(fieldKey)
    let className = fields[fieldKey].input.className || ''
    if (hasError) {
      className += ' error'
    }
    return className
  }

  const formError =
    getError('major') || getError('minor') || getError('revision')

  const majorInput = fields.major.input
  const minorInput = fields.minor.input
  const revisionInput = fields.revision.input

  return (
    <div>
      <div className="input-group version-inputs">
        <div>
          <label className="uppercase" htmlFor={majorInput.name}>
            Major Version
          </label>
          <input
            {...majorInput}
            type="number"
            className={getFieldClassName('major')}
            disabled={fields.isTagged}
          />
        </div>
        <div className="dot">.</div>
        <div>
          <label className="uppercase" htmlFor={minorInput.name}>
            Minor Version
          </label>
          <input
            {...minorInput}
            type="number"
            className={getFieldClassName('minor')}
            disabled={fields.isTagged}
          />
        </div>
        <div className="dot">.</div>
        <div>
          <label className="uppercase" htmlFor={revisionInput.name}>
            Revision
          </label>
          <input
            {...revisionInput}
            type="number"
            className={getFieldClassName('revision')}
            disabled={fields.isTagged}
          />
        </div>
      </div>

      {formError && <div className="error-message">{formError}</div>}
    </div>
  )
}

export default VersionInputs
