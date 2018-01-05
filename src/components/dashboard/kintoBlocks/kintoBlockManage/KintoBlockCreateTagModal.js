import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, Fields, reduxForm, FormSection } from 'redux-form'
import { required } from '../../../../helpers/forms/validators'
import { number } from '../../../../helpers/forms/parsers'
import {
  Button,
  VersionInputs,
  FormError,
  FieldValidation
} from '../../../forms'

class KintoBlockCreateTagModal extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired
  }

  render() {
    const { kintoBlock, submitting, handleSubmit, onClose, error } = this.props
    return (
      <div>
        <div className="kh-modal-title">Tag This Commit</div>
        <div className="kh-modal-body">
          <form onSubmit={handleSubmit}>
            <div className="field-wrapper">
              <label className="uppercase">Branch</label>
              <input type="text" disabled value={kintoBlock.version.name} />
            </div>
            <div className="field-wrapper">
              <label className="uppercase">Latest Commit</label>
              <input
                type="text"
                disabled
                value={kintoBlock.activeBuild.commitMessage}
              />
            </div>
            <FormSection name="version">
              <Fields
                names={['major', 'minor', 'revision']}
                parse={number}
                component={VersionInputs}
              />
            </FormSection>

            <Field
              type="textarea"
              name="notes"
              label="Notes"
              component={FieldValidation}
              validate={required}
              className="tall"
            />

            <FormError error={error} />

            <div className="kh-modal-actions">
              <Button onClick={onClose} type="button" buttonType="secondary">
                Cancel
              </Button>
              <Button type="submit" buttonType="dark" disabled={submitting}>
                Tag Latest Commit
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const validate = values => {
  let version = values.version || {}
  let errors = {}
  errors.major = required(version.major)
  errors.minor = required(version.minor)
  errors.revision = required(version.revision)
  if (version.major === 0 && version.minor === 0 && version.revision === 0) {
    errors.major = 'Invalid Version'
    errors.minor = 'Invalid Version'
    errors.revision = 'Invalid Version'
  }
  return { version: errors }
}

export default reduxForm({ form: 'kintoBlockCreateTag', validate })(
  KintoBlockCreateTagModal
)
