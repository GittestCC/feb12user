import React, { Component } from 'react'
import WorkspaceFormContainer from '../../containers/workspaces/WorkspaceFormContainer'
import { githubConnectUrl } from '../../helpers/urlHelper'

class WorkspaceEdit extends Component {
  componentDidMount() {
    this.props.workspaceBreadcrumbSelect(this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.props.workspaceBreadcrumbSelect(nextProps.id)
    }
  }

  render() {
    const { workspace } = this.props
    const organizations = workspace.organizations || []

    return (
      <div className="edit-workspace">
        <WorkspaceFormContainer workspace={workspace} isCreate={false} />
        <div className="form-wrapper github-form">
          <h3>Github Connection</h3>
          <h5>Configure your GitHub organization to work with KintoHub.</h5>
          <div className="form-block">
            <ul className="organization-list">
              {organizations.map((organization, i) => (
                <li key={i}>
                  <img
                    src="/images/avatar-organization.jpg"
                    alt="organization logo"
                  />
                  <div className="text">{organization.name}</div>
                </li>
              ))}
            </ul>
            <div className="github-connect">
              <div className="intro">
                {!organizations.length &&
                  'Linking a GitHub organization allows you to use any existing repositories within and create new ones.'}
                <br />
                <b>
                  Please make sure every workspace member has the correct access
                  to the GitHub organization.
                </b>
                <br />
                Once it’s been linked you cannot unlink it.
              </div>
              {!organizations.length && (
                <div className="connect-button">
                  <a
                    className="button dark"
                    href={githubConnectUrl(workspace && workspace.id)}
                  >
                    <span className="icon github" />
                    Link Github Organization
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WorkspaceEdit
