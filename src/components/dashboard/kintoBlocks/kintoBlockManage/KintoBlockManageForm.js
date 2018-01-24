import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, FieldArray } from 'redux-form'
import Tooltip from 'rc-tooltip'
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
    error: PropTypes.string,
    indexClass: PropTypes.func.isRequired,
    commitDate: PropTypes.func.isRequired,
    commitNo: PropTypes.func.isRequired
  }

  render() {
    const {
      kintoBlock,
      dependencies,
      handleSubmit,
      isVersionTag,
      isCreateTagErrorMessageShown,
      error,
      commitDate,
      indexClass,
      commitNo
    } = this.props

    const commitHelp = 'Only a successful commit can be tagged.'

    return (
      <form
        className="kintoblock-manage form-container"
        onSubmit={handleSubmit}
        data-test="kb-manage-form"
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
            Choose the name for this KintoBlock and give a a short description.
            If you make the KintoBlock public, they will help other people
            discover your application. Let us know your preferred coding flavor
            and connect your repo.
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
                className="tall"
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
        </div>

        <div className="form-wrapper full-row commits">
          <h3>Commits</h3>
          <h5>
            The latest successful commit and other recent commits from GitHub.
          </h5>
          <div className="form-body simple">
            <div className="section">
              <div className="field-input-wrapper">
                <div className="label">
                  latest commit
                  <Tooltip placement="top" overlay={commitHelp} trigger="click">
                    <span className="tooltip" />
                  </Tooltip>
                </div>
                <div className="commit-details main">
                  <div className="state-and-time">
                    <div className="main-with-icon">
                      <Tooltip placement="top" overlay="Commit" trigger="click">
                        <div className="commit-icon" />
                      </Tooltip>
                      {kintoBlock.activeBuild ? (
                        <div>
                          {commitNo(kintoBlock.activeBuild.commitSha)} -{' '}
                          {commitDate(kintoBlock.activeBuild.commitTimestamp)}
                          <div className="notes">
                            {kintoBlock.activeBuild.commitMessage}
                          </div>
                        </div>
                      ) : (
                        <div className="commit-details no-commit">
                          No commit has been made on GitHub
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {isCreateTagErrorMessageShown ? (
                  <div
                    data-test="create-tag-error"
                    className="errormessage-form error-message"
                  >
                    At least one successful commit must be made on GitHub in
                    order to create a tag.
                  </div>
                ) : null}
              </div>

              <div className="field-input-wrapper commit-list">
                <div className="label">recent commits</div>
                {kintoBlock.builds && kintoBlock.builds.length ? (
                  kintoBlock.builds.slice(0, 5).map((b, i) => (
                    <div
                      className={`commit-details ${
                        kintoBlock.activeBuild &&
                        b.commitSha === kintoBlock.activeBuild.commitSha
                          ? 'active'
                          : ''
                      } ${indexClass(i)}`}
                      key={i}
                    >
                      <div className="state-and-time">
                        <div>
                          {commitNo(b.commitSha)} -{' '}
                          {commitDate(b.commitTimestamp)}
                        </div>
                        <div className="build">
                          {b.state}{' '}
                          <div className={`dot ${b.state.toLowerCase()}`} />
                        </div>
                      </div>
                      <div className="notes">{b.commitMessage}</div>
                    </div>
                  ))
                ) : (
                  <div className="commit-details no-commit">
                    No commit has been made on GitHub
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="form-wrapper blocks-and-services full-row">
          <ManageDependenciesFieldContainer
            name="dependencies"
            dependencies={dependencies}
            disabled={isVersionTag}
            isKintoBlock={true}
          />
        </div>

        <div className="form-wrapper custom-paramaters full-row">
          <h3>Environmental & Custom Parameters</h3>
          <h5>
            Parameters are variables you decide to expose for your KintoBlock,
            for which you should set default values. Users can override the
            recommended values.
          </h5>

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
      </form>
    )
  }
}
export default reduxForm({
  form: 'kintoBlockManageForm',
  enableReinitialize: true
})(KintoBlockManageForm)
