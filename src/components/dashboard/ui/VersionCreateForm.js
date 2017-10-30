import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, Fields, reduxForm, FormSection } from 'redux-form'
import { getVersionAsText, textToObject } from '../../../helpers/versionHelper'
import { required } from '../../../helpers/forms/validators'
import { number } from '../../../helpers/forms/parsers'
import { Button, VersionInputs, FormError } from '../../forms'

class VersionCreateForm extends Component {
  static propTypes = {
    submitLabel: PropTypes.string.isRequired,
    baseVersions: PropTypes.array.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.initialize({
      baseVersion: textToObject(this.props.baseVersions[0])
    })
  }

  render() {
    const {
      submitLabel,
      baseVersions,
      submitting,
      pristine,
      handleSubmit,
      onClose,
      error
    } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div className="full-width-field">
          <label htmlFor="baseVersion">Base Version</label>
          <Field
            name="baseVersion"
            component="select"
            parse={textToObject}
            format={getVersionAsText}
          >
            {baseVersions.map((v, index) => (
              <option key={index} value={v}>
                {v}
              </option>
            ))}
          </Field>
        </div>
        <FormSection name="version">
          <Fields
            names={['major', 'minor', 'revision']}
            parse={number}
            component={VersionInputs}
          />
        </FormSection>

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
    )
  }
}

const validate = values => {
  let version = values.version || {}
  let errors = {}
  errors.major = required(version.major)
  errors.minor = required(version.minor)
  errors.revision = required(version.revision)
  return { version: errors }
}

export default reduxForm({ form: 'versionCreate', validate })(VersionCreateForm)
