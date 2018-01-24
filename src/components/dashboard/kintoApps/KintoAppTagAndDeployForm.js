import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Field, Fields, reduxForm, FormSection } from 'redux-form'
import { required } from '../../../helpers/forms/validators'
import { number } from '../../../helpers/forms/parsers'
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
    environments: PropTypes.array.isRequired
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
      listEnvironmentsUrl
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
                  <option value={e.name} key={e.id}>
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

            <FormError error={error} />

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

export default reduxForm({ form: 'versionCreate', validate })(TagAndDeployForm)
