import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { FieldValidation, FormError } from '../../../forms'
import { required, isLessThan200 } from '../../../../helpers/forms/validators'
import ManageDependenciesFieldContainer from '../../../../containers/dashboard/ui/ManageDependenciesFieldContainer'
import KintoBlockManageParamsField from './KintoBlockManageParamsField'
import KintoBlockManageEnvVarsField from './KintoBlockManageEnvVarsField'
import WorkspaceToolbarContainer from '../../../../containers/dashboard/ui/WorkspaceToolbarContainer'

class KintoBlockManageForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    dependencies: PropTypes.array,
    kintoBlock: PropTypes.object.isRequired,
    isVersionTag: PropTypes.bool,
    isCreateTagErrorMessageShown: PropTypes.bool.isRequired,
    error: PropTypes.string
  }

  render() {
    const {
      kintoBlock,
      dependencies,
      handleSubmit,
      isVersionTag,
      isCreateTagErrorMessageShown,
      error
    } = this.props
    return (
      <form
        className="kintoblock-manage form-container"
        onSubmit={handleSubmit}
      >
        <div className="form-wrapper workspaces full-row">
          <WorkspaceToolbarContainer
            isKintoApp={false}
            kintoItem={kintoBlock}
          />
        </div>
        <div className="form-wrapper full-row basic-info">
          <FormError error={error} />

          <h3>Basic Info</h3>
          <h5>
            Choose the build and give your baby a number so they don’t get mixed
            up in a sea of babies.
          </h5>
          <div className="form-body">
            <div className="section">
              <Field
                name="name"
                label="Kintoblock Name"
                component={FieldValidation}
                type="input"
                validate={required}
              />
              <Field
                characterCount="200"
                name="shortDescription"
                label="Description"
                placeholder="Enter a short description of your KintoBlock"
                component={FieldValidation}
                validate={[required, isLessThan200]}
                type="textarea"
              />
            </div>
            <div className="line" />
            <div className="section section-info">
              <div className="field-wrapper">
                <label>Language</label>
                <div className="field-input-wrapper">
                  <select data-test="language" name="language" disabled>
                    <option>{kintoBlock.language}</option>
                  </select>
                </div>
              </div>
              <div className="field-wrapper">
                <label>Protocol</label>
                <div className="field-input-wrapper">
                  <select data-test="protocol" name="protocol" disabled>
                    <option>{kintoBlock.protocol}</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="line" />
            <div className="section">
              <div className="field-wrapper">
                <label>Repository</label>
                <div className="field-input-wrapper">
                  <input
                    type="text"
                    disabled
                    value={kintoBlock.repositoryName || ''}
                  />
                </div>
              </div>
            </div>
          </div>
          {isCreateTagErrorMessageShown ? (
            <div className="errormessage-form error-message">
              At least one successful commit must be made on GitHub in order to
              create a tag.
            </div>
          ) : null}
        </div>

        <div className="form-wrapper blocks-and-services full-row">
          <ManageDependenciesFieldContainer
            name="dependencies"
            dependencies={dependencies}
            disabled={isVersionTag}
          />
        </div>

        <div className="form-wrapper custom-paramaters full-row">
          <h3>Environmental & Custom Parameters</h3>
          <h5>Something here.</h5>

          <FieldArray
            name="environmentVariables"
            component={KintoBlockManageEnvVarsField}
            disabled={isVersionTag}
          />
          <FieldArray
            name="configParameters"
            component={KintoBlockManageParamsField}
            disabled={isVersionTag}
          />
        </div>

        <div className="form-wrapper availibility">
          <h3>Availability</h3>
          <h5>
            Keep your baby close to you, or share your proud creation with the
            world.
          </h5>

          <div className="form-body simple">
            <div className="radio">
              <Field
                name="private"
                type="radio"
                component={FieldValidation}
                label="Private (only I can use it)"
                value="private"
              />
            </div>
            <div className="radio">
              <Field
                name="public"
                type="radio"
                component={FieldValidation}
                label="Public (anyone can get it in the KintoHub Market)"
                value="public"
              />
            </div>
          </div>
        </div>
      </form>
    )
  }
}
export default reduxForm({
  form: 'kintoBlockManageForm',
  enableReinitialize: true
})(KintoBlockManageForm)
