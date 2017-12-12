import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { FieldValidation } from '../../../../forms'

function getIsShownClass(visibleParams, key) {
  return !visibleParams.some(p => p.key === key) ? 'hide' : ''
}

const KintoAppConfigParamsItem = ({ fields, visibleParams }) => {
  return (
    <div className="form-body">
      {fields.length && visibleParams.length ? (
        <div>
          {fields.map((field, key) => {
            const data = fields.get(key)
            return (
              <div
                className={`param-row ${getIsShownClass(
                  visibleParams,
                  data.key
                )}`}
                key={key}
              >
                <Field
                  label={data.key}
                  name={`${field}.value`}
                  type="text"
                  component={FieldValidation}
                  inputTextOverlay={data.required ? 'Required' : null}
                />
              </div>
            )
          })}
        </div>
      ) : (
        <div className="msg-empty">
          {!visibleParams.length
            ? 'No matching result found'
            : 'No custom parameters added'}
        </div>
      )}
    </div>
  )
}
KintoAppConfigParamsItem.propTypes = {
  fields: PropTypes.object.isRequired,
  visibleParams: PropTypes.array.isRequired
}

export default KintoAppConfigParamsItem
