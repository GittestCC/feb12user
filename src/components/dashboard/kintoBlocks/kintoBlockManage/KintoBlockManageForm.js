import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Field, reduxForm, FieldArray } from 'redux-form'
import Tooltip from 'rc-tooltip'
import { FieldValidation, FormError, Button } from '../../../forms'
import { required, isLessThan200 } from '../../../../helpers/forms/validators'
import { isProduction } from '../../../../helpers/pageHelper'
import { timeDayMonthYearShort } from '../../../../constants/dateFormat'
import supportedLanguages from '../../../../constants/supportedLanguages'

import { kintoName } from '../../../../helpers/forms/validationFields'
import ManageDependenciesFieldContainer from '../../../../containers/dashboard/ui/ManageDependenciesFieldContainer'
import KintoBlockManageParamsField from './KintoBlockManageParamsField'
import KintoBlockManageEnvVarsField from './KintoBlockManageEnvVarsField'
import KintoBlockServiceFields from './KintoBlockServiceFields'
import WorkspaceToolbarContainer from '../../../../containers/dashboard/ui/WorkspaceToolbarContainer'

class KintoBlockManageForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    dependencies: PropTypes.array,
    kintoBlock: PropTypes.object.isRequired,
    isVersionTag: PropTypes.bool,
    isCreateTagErrorMessageShown: PropTypes.bool.isRequired,
    error: PropTypes.string,
    refreshCommits: PropTypes.func.isRequired
  }

  formatCommit(commit) {
    return commit.substring(0, 6).toUpperCase()
  }

  formatDate(date) {
    return moment(date).format(timeDayMonthYearShort)
  }

  getCommitClass(index, totalItems) {
    if (index === 0) {
      return 'first'
    }
    if (index === totalItems - 1) {
      return 'last'
    }
  }

  getLanguageLabel(lang) {
    const language = supportedLanguages.find(l => l.value === lang)
    return language ? language.label : ''
  }

  render() {
    const {
      kintoBlock,
      dependencies,
      handleSubmit,
      isVersionTag,
      isCreateTagErrorMessageShown,
      error,
      refreshCommits
    } = this.props

    const commitHelp = 'Only a successful commit can be tagged.'
    const isProd = isProduction()

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
            Choose the name for this KintoBlock and give a a short description
            so you can easily find it back later. Let us know your preferred
            coding flavor and connect your repo.
          </h5>
          <div className="form-body">
            <div className="section">
              <Field
                name="name"
                label="Kintoblock Name"
                component={FieldValidation}
                type="input"
                validate={kintoName}
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
                    <option>
                      {this.getLanguageLabel(kintoBlock.language)}
                    </option>
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
          <h5>The latest successfully built commit and other recent builds.</h5>
          <div className={`form-body simple ${isVersionTag ? 'tagged' : ''}`}>
            <div className="section">
              <div className="field-input-wrapper">
                <div className="label">
                  {isVersionTag
                    ? 'tagged commit'
                    : 'latest successfully built commit'}
                  <Tooltip placement="top" overlay={commitHelp} trigger="click">
                    <span className="tooltip" />
                  </Tooltip>
                  <span className="build-states">build status</span>
                </div>
                <div className="commit-details main">
                  <div className="state-and-time">
                    <div className="main-with-icon">
                      <Tooltip placement="top" overlay="Commit" trigger="click">
                        <div className="commit-icon" />
                      </Tooltip>
                      {kintoBlock.activeBuild ? (
                        <div>
                          {this.formatCommit(kintoBlock.activeBuild.commitSha)}{' '}
                          -{' '}
                          {this.formatDate(
                            kintoBlock.activeBuild.commitTimestamp
                          )}
                          <div className="notes">
                            {kintoBlock.activeBuild.commitMessage}
                          </div>
                        </div>
                      ) : (
                        <div className="commit-details no-commit">
                          No commit was built successfully yet.
                        </div>
                      )}
                      {!isVersionTag &&
                        !isProd && (
                          <Button
                            className="button-refresh-commits"
                            type="button"
                            buttonType="secondary"
                            onClick={refreshCommits}
                          >
                            Refresh Latest Commit
                          </Button>
                        )}
                    </div>
                  </div>
                </div>
                {isCreateTagErrorMessageShown ? (
                  <div
                    data-test="create-tag-error"
                    className="errormessage-form error-message"
                  >
                    At least one commit must be built successfully in order to
                    create a tag
                  </div>
                ) : null}
              </div>

              {!isVersionTag && (
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
                        } ${this.getCommitClass(i, kintoBlock.builds.length)}`}
                        key={i}
                      >
                        <div className="state-and-time">
                          <div>
                            {this.formatCommit(b.commitSha)} -{' '}
                            {this.formatDate(b.commitTimestamp)}
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
              )}
            </div>
          </div>
        </div>

        <div className="form-wrapper blocks-and-services full-row">
          <ManageDependenciesFieldContainer
            name="dependencies"
            dependencies={dependencies}
            disabled={isVersionTag}
            isKintoBlock={true}
            kintoBlock={kintoBlock}
          />
        </div>

        {isProd ? null : (
          <Field
            name="services"
            component={KintoBlockServiceFields}
            disabled={isVersionTag}
            updateServicesField={this.props.updateServicesField}
            services={this.props.services}
          />
        )}

        <div className="form-wrapper custom-paramaters full-row">
          <h3>Environment Variables & Custom Parameters</h3>
          <h5>
            Parameters are variables you decide to expose for your KintoBlock,
            for which you should set default values. Users can override the
            recommended values.
          </h5>

          <FieldArray
            name="environmentVariables"
            component={KintoBlockManageEnvVarsField}
            disabled={isVersionTag || isProd}
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
