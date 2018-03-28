import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import isEmpty from 'lodash/isEmpty'
import { Async } from 'react-select'
import { FieldValidation, FormError, ErrorOnly } from '../../../forms'
import { required, isLessThan200 } from '../../../../helpers/forms/validators'
import { kintoName } from '../../../../helpers/forms/validationFields'
import { boolean } from '../../../../helpers/forms/parsers'
import { githubConnectUrl } from '../../../../helpers/urlHelper'
import WorkspaceToolbarContainer from '../../../../containers/dashboard/ui/WorkspaceToolbarContainer'

class KintoBlockCreateForm extends Component {
  state = {
    selectedRepo: null
  }

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isNewRepository: PropTypes.bool.isRequired,
    organizations: PropTypes.array.isRequired,
    selectRepository: PropTypes.func.isRequired,
    fieldCorrection: PropTypes.func.isRequired,
    preFillText: PropTypes.string.isRequired,
    searchRepositories: PropTypes.func.isRequired,
    selectedWorkspace: PropTypes.string,
    error: PropTypes.string,
    languages: PropTypes.array.isRequired
  }

  onSelectRepo = data => {
    this.setState({ selectedRepo: data })
    this.props.selectRepository(data)
  }

  render() {
    const {
      handleSubmit,
      kintoBlock,
      isNewRepository,
      organizations,
      fieldCorrection,
      preFillText,
      searchRepositories,
      selectedWorkspace,
      languages,
      error
    } = this.props

    const hasOrganizations = !isEmpty(organizations)
    return (
      <form
        className="kintoblock-create form-container"
        onSubmit={handleSubmit}
        data-test="kb-create-form"
      >
        <div className="form-wrapper workspaces full-row">
          <WorkspaceToolbarContainer
            isKintoApp={false}
            isCreate={true}
            kintoItem={kintoBlock}
          />
        </div>
        <div className="form-wrapper basic-info">
          <h3>Basic Info</h3>
          <h5>
            Choose the name for this KintoBlock and give a a short description
            so you can easily find it back later. Let us know your preferred
            coding flavor and connect your repo.
          </h5>

          <div className="form-body">
            <Field
              name="name"
              label="KintoBlock Name"
              placeholder="Enter a name for your KintoBlock"
              component={FieldValidation}
              validate={kintoName}
              type="text"
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
            <div className="line" />
            <div className="language-protocol">
              <Field
                name="language"
                label="Language"
                component={FieldValidation}
                validate={required}
                type="select"
                className="bold"
                help="The programming language you would like to use for this project."
              >
                <option>Choose the language</option>
                {languages.map(l => <option value={l.value}>{l.label}</option>)}
              </Field>
              <Field
                name="protocol"
                label="protocol"
                component={FieldValidation}
                validate={required}
                type="select"
                className="bold"
                help="The protocol you would like to communicate with"
              >
                <option>Choose the protocol</option>
                <option value="HTTP">HTTP</option>
                <option value="GRPC">gRPC</option>
              </Field>
            </div>
            <div className="line" />

            {hasOrganizations ? (
              <div className="connect-github">
                <div className="repository-selection">
                  <Field
                    name="isNewRepository"
                    label="repository type"
                    component={FieldValidation}
                    type="select"
                    className="bold"
                    onChange={fieldCorrection}
                    parse={boolean}
                  >
                    <option value="true">Create new repository</option>
                    <option value="false">Existing Repositories</option>
                  </Field>

                  {isNewRepository ? (
                    <Field
                      name="repositoryName"
                      label="repository"
                      placeholder="Enter a name for your repository"
                      component={FieldValidation}
                      validate={required}
                      type="text"
                      preFillText={preFillText}
                    />
                  ) : (
                    <div className="select-wrapper">
                      <div className="label">Repository</div>
                      <Async
                        placeholder="Enter the repository"
                        loadOptions={searchRepositories}
                        onChange={this.onSelectRepo}
                        value={this.state.selectedRepo}
                        clearable={false}
                        backspaceRemoves={false}
                      />
                      <Field
                        name="repositoryId"
                        component={ErrorOnly}
                        validate={required}
                      />
                    </div>
                  )}
                </div>

                {isNewRepository ? (
                  <Field
                    name="organizationId"
                    label="Organization"
                    component={FieldValidation}
                    type="select"
                    className="bold full-width"
                  >
                    {organizations.map((o, i) => (
                      <option key={i} value={o.id}>
                        {o.name}
                      </option>
                    ))}
                  </Field>
                ) : (
                  <h5>
                    Admins of this workspace can link additional GitHub
                    organizations when editing the workspace.
                  </h5>
                )}
              </div>
            ) : (
              <div className="connect-github">
                <h5>
                  Linking a GitHub organization allows you to use any existing
                  repositories within and create new ones.{' '}
                  <b>
                    Please make sure every workspace member has the correct
                    access to the GitHub organization.
                  </b>{' '}
                  Once it’s been linked you cannot unlink it.
                </h5>
                <a href="/">Learn how to create a GitHub organization.</a>

                <div className="connect-button">
                  <a
                    className="button dark"
                    href={githubConnectUrl(selectedWorkspace)}
                  >
                    <span className="icon github" />
                    Link Github Organization
                  </a>
                </div>
              </div>
            )}
            <FormError error={error} />
          </div>
        </div>

        {/*
          <FormSection name="hardwareData">
          <KintoBlockHardwareData
            isDedicatedCPU={isDedicatedCPU}
            resetCPUHandler={resetCPUHandler}
          />
          </FormSection>
        */}
      </form>
    )
  }
}

export default reduxForm({ form: 'kintoBlockCreateForm' })(KintoBlockCreateForm)
