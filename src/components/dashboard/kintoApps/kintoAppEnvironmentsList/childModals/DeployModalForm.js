import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { FieldValidation } from '../../../../forms'
import {
  textToObject,
  getVersionAsText,
  asTextList
} from '../../../../../helpers/versionHelper'

class DeployModalForm extends Component {
  componentDidMount() {
    this.props.initialize({
      version: this.props.kintoApp.versions[0]
    })
  }

  render() {
    const deployEnvironmentAndClose = result => {
      const id = kintoApp.id
      deployEnvironment(id, result, environment.name)
      onClose()
    }

    const {
      onClose,
      handleSubmit,
      kintoApp,
      deployEnvironment,
      environment
    } = this.props

    return (
      <div className="add-new-environment">
        <div className="kh-modal-title">
          Deploy - {kintoApp.name} {`- ${environment && environment.name}`}
        </div>
        <div className="kh-modal-body">
          <form onSubmit={handleSubmit(deployEnvironmentAndClose)}>
            <div className="full-width-field">
              <Field
                name="version"
                component={FieldValidation}
                parse={textToObject}
                format={getVersionAsText}
                type="select"
              >
                {asTextList(kintoApp.versions).map((version, index) => (
                  <option key={index} value={version}>
                    {version}
                  </option>
                ))}
              </Field>
            </div>
            <div className="kh-modal-actions">
              <button onClick={onClose} className="button secondary">
                Cancel
              </button>
              <button type="submit" className="button default">
                Deploy Now
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default reduxForm({ form: 'DeployModalForm' })(DeployModalForm)
