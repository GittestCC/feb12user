import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import isEmpty from 'lodash/isEmpty'
import Select from 'react-select'
import { FieldValidation, FormError } from '../../../forms'
import { required, isLessThan200 } from '../../../../helpers/forms/validators'
import WorkspaceToolbarContainer from '../../../../containers/dashboard/ui/WorkspaceToolbarContainer'

// change to class so that i can use state for the number countdown

// research how to change the color of characters after a certain number has passed

class KintoBlockCreateForm extends Component {
  static propTypes = {
    // isDedicatedCPU: PropTypes.bool.isRequired, TODO: removed these variables because they are not being used at the moment
    // resetCPUHandler: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isNewRepository: PropTypes.bool.isRequired,
    organizations: PropTypes.array.isRequired,
    selectRepository: PropTypes.func.isRequired,
    fieldCorrection: PropTypes.func.isRequired,
    reactSelectValue: PropTypes.string.isRequired,
    preFillText: PropTypes.string.isRequired,
    organizationIds: PropTypes.array.isRequired
  }

  searchRepositories = query => {
    // return axios.get(
    //   `/${this.props.workspaceId}/repositories?name=${query}&orgId=${
    //     this.props.organizationIds.join(",")
    //   }`
    // ) TODO: use when API is ready

    return Promise.resolve({
      data: [
        {
          orgName: 'weyland-yutani',
          orgId: '1',
          repoName: 'bioweapons-division',
          repoId: '1'
        },
        {
          orgName: 'tyrell-corporation',
          orgId: '2',
          repoName: 'replicant-program',
          repoId: '2'
        },
        {
          orgName: 'wallace',
          orgId: '3',
          repoName: 'bladerunner-prototype',
          repoId: '3'
        }
      ]
    }).then(response => {
      return {
        options: response.data.map(r => ({
          label: `${r.orgName} / ${r.repoName}`,
          value: r.repoId,
          orgId: r.orgId
        }))
      }
    })
  }

  render() {
    const {
      handleSubmit,
      error,
      kintoBlock,
      isNewRepository,
      organizations,
      selectRepository,
      fieldCorrection,
      selectedRepository,
      preFillText
    } = this.props
    // const { isDedicatedCPU, handleSubmit, resetCPUHandler, error } = this.props TODO: removed these variables because they are not used at the moment
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
            Give your baby a name, choose which language they will speak, and
            where they will live.
          </h5>

          <div className="form-body">
            <Field
              name="name"
              label="KintoBlock Name"
              placeholder="Enter a name for your KintoBlock"
              component={FieldValidation}
              validate={required}
              type="text"
              help="Choose a name for your KintoBlock"
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
                help="Choose the programming language you would like to use for this project"
              >
                <option>Choose the language</option>
                <option value="CSHARP">C#.net</option>
                <option value="NODEJS">Node.js</option>
                <option value="JAVA8">Java 8</option>
                <option value="RUBY">Ruby</option>
                <option value="PYTHON3">Python</option>
              </Field>
              <Field
                name="protocol"
                label="protocol"
                component={FieldValidation}
                validate={required}
                type="select"
                className="bold"
                help="Choose the protocol you would like to communicate with"
              >
                <option>Choose the protocol</option>
                <option value="HTTP">HTTP</option>
                <option value="GRPC">gRPC</option>
                <option value="GRAPHQL">GraphQL</option>
              </Field>
            </div>
            <div className="line" />

            {hasOrganizations ? (
              <div className="connect-github">
                <div className="repository-selection">
                  <Field
                    name="newRepository"
                    label="repository type"
                    component={FieldValidation}
                    type="select"
                    className="bold"
                    onChange={fieldCorrection}
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
                      <Select.Async
                        placeholder="Enter the repository"
                        loadOptions={this.searchRepositories}
                        onChange={selectRepository}
                        value={selectedRepository}
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

                <button className="button dark">
                  <span className="github-icon" />Link GitHub Organization
                </button>
              </div>
            )}
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
        <FormError error={error} />
      </form>
    )
  }
}

export default reduxForm({ form: 'kintoBlockCreateForm' })(KintoBlockCreateForm)
