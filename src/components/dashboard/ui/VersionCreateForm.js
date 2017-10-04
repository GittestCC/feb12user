import React, { Component } from 'react'
import { Field, Fields, reduxForm, FormSection } from 'redux-form'
import { getVersionAsText, textToObject } from '../../../helpers/versionHelper'
import { required } from '../../../helpers/forms/validators'
import { number } from '../../../helpers/forms/parsers'
import { Button, VersionInputs, FormError } from '../../forms'

class VersionCreateForm extends Component {
  componentDidMount() {
    this.props.initialize({
      baseVersion: textToObject(this.props.baseVersions[0])
    })
  }

  render() {
    const {
      submitLabel,
      handleSubmit,
      onClose,
      baseVersions,
      submitting,
      pristine,
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
        <FormSection name="versionData">
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
  let versionData = values.versionData || {}
  let errors = {}
  errors.major = required(versionData.major)
  errors.minor = required(versionData.minor)
  errors.revision = required(versionData.revision)
  return { versionData: errors }
}

export default reduxForm({ form: 'versionCreate', validate })(VersionCreateForm)
