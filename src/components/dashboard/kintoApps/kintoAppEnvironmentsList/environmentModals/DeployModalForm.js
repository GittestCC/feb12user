import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
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

  deployEnvironmentAndClose = version => {
    const id = this.props.kintoApp.id
    this.props.deployEnvironment(id, this.props.environment.name, version)
    this.props.onClose()
  }

  render() {
    const { onClose, handleSubmit, kintoApp, environment } = this.props

    return (
      <div className="add-new-environment">
        <div className="kh-modal-title">
          Deploy - {kintoApp.name} {`- ${environment && environment.name}`}
        </div>
        <div className="kh-modal-body">
          <form onSubmit={handleSubmit(this.deployEnvironmentAndClose)}>
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

DeployModalForm.propTypes = {
  kintoApp: PropTypes.object.isRequired,
  deployEnvironment: PropTypes.func.isRequired,
  environment: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({ form: 'DeployModalForm' })(DeployModalForm)
