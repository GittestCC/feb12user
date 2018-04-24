import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WorkspaceFormContainer from '../../containers/workspaces/WorkspaceFormContainer'
import { githubConnectUrl } from '../../helpers/urlHelper'

class WorkspaceEdit extends Component {
  static propTypes = {
    workspace: PropTypes.object.isRequired
  }
  render() {
    const { workspace } = this.props
    const organizations = workspace.organizations || []

    return (
      <div className="edit-workspace">
        <WorkspaceFormContainer
          workspace={workspace}
          isCreate={false}
          form="WorkspaceFormEdit"
        />
        <div className="form-wrapper github-form">
          <h3>Github Connection</h3>
          <h5>Choose a GitHub organization to link to this workspace.</h5>
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
                <br />
                Linking a GitHub organization allows you to use any of its
                already existing repositories and create new ones directly from
                KintoHub.
                <br />
                <br />
                Note that only one GitHub organization can be linked per
                workspace.
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
