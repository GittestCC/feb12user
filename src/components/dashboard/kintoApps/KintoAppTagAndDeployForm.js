import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Field, Fields, reduxForm, FormSection } from 'redux-form'
import {
  validateRules,
  required,
  minValue0,
  maxValue999
} from '../../../helpers/forms/validators'
import { number } from '../../../helpers/forms/parsers'
import { getVersionAsText } from '../../../helpers/versionHelper'
import { hasValues } from '../../../helpers/objectHelper'

import { Button, VersionInputs, FormError, FieldValidation } from '../../forms'

class TagAndDeployForm extends Component {
  static propTypes = {
    submitLabel: PropTypes.string.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    listEnvironmentsUrl: PropTypes.string.isRequired,
    environments: PropTypes.array.isRequired,
    submitFailed: PropTypes.bool.isRequired
  }

  render() {
    const {
      submitLabel,
      submitting,
      pristine,
      handleSubmit,
      onClose,
      error,
      environments,
      title,
      isTagged,
      listEnvironmentsUrl,
      submitFailed
    } = this.props
    return (
      <div>
        <div className="kh-modal-title">Tag & Deploy - {title}</div>
        <div className="kh-modal-body">
          <form onSubmit={handleSubmit}>
            <div className="full-width-field">
              <Field
                name="environment"
                label="environment"
                component={FieldValidation}
                validate={required}
                type="select"
                className="bold"
              >
                {environments.map((e, index) => (
                  <option value={e.id} key={e.id}>
                    {e.name}
                  </option>
                ))}
              </Field>
              <Link to={listEnvironmentsUrl}>Edit Environments</Link>
            </div>

            <FormSection name="version">
              <Fields
                names={['major', 'minor', 'revision']}
                parse={number}
                component={VersionInputs}
                isTagged={isTagged}
              />
            </FormSection>

            <div className="full-width-field">
              <Field
                className="notes"
                name="notes"
                label="notes"
                component={FieldValidation}
                type="textarea"
                placeholder="Enter notes here to decribe this deployment"
              />
            </div>

            <FormError error={error} submitFailed={submitFailed} />

            <div className="kh-modal-actions">
              <Button onClick={onClose} type="button" buttonType="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                buttonType="dark"
                disabled={submitting || pristine}
              >
                {submitLabel}
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const validate = (values, props) => {
  let version = values.version || {}
  let versionErrors = {}
  let errors = { version: versionErrors }
  versionErrors.major = validateRules(version.major, [
    required,
    maxValue999,
    minValue0
  ])
  versionErrors.minor = validateRules(version.minor, [
    required,
    maxValue999,
    minValue0
  ])
  versionErrors.revision = validateRules(version.revision, [
    required,
    maxValue999,
    minValue0
  ])
  if (version.major === 0 && version.minor === 0 && version.revision === 0) {
    versionErrors.major = 'Invalid Version'
    versionErrors.minor = 'Invalid Version'
    versionErrors.revision = 'Invalid Version'
  }
  if (
    !hasValues(versionErrors) &&
    props.kintoApp.versions.some(v => v.name === getVersionAsText(version))
  ) {
    errors._error = 'Tag with the same version is already created'
  }
  return errors
}

export default reduxForm({ form: 'versionCreate', validate })(TagAndDeployForm)
