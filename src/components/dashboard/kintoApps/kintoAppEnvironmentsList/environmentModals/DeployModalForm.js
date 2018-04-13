import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import { FieldValidation } from '../../../../forms'
import { TAG } from '../../../../../constants/version'

class DeployModalForm extends Component {
  componentDidMount() {
    this.props.initialize({
      version: this.props.kintoApp.versions.filter(v => v.type === TAG)[0].name
    })
  }

  deployEnvironmentAndClose = data => {
    const { kintoApp, environment, onClose, deployEnvironment } = this.props
    deployEnvironment(kintoApp.id, environment.id, {
      version: { name: data.version }
    }).then(onClose)
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
              <Field name="version" component={FieldValidation} type="select">
                {kintoApp.versions
                  .filter(v => v.type === TAG)
                  .map((version, index) => (
                    <option key={index} value={version.name}>
                      {version.name}
                    </option>
                  ))}
              </Field>
            </div>
            <div className="kh-modal-actions">
              <button
                type="button"
                onClick={onClose}
                className="button secondary"
              >
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
