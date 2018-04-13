import React, { Component } from 'react'

class ConnectGitHubModal extends Component {
  render() {
    const { onClose, connectGithubLink } = this.props
    return (
      <div className="github-modal">
        <div className="kh-modal-title">Link GitHub Organization</div>
        <div className="kh-modal-body">
          <h4>
            Linking a GitHub organization allows you to use any existing
            repositories within and create new ones.{' '}
            <span className="bold">
              Please make sure every workspace member has the correct access to
              the GitHub organization.
            </span>{' '}
            Once it’s been linked you cannot unlink it.
          </h4>
          <div className="kh-modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="button secondary"
            >
              Cancel
            </button>
            <a href={connectGithubLink} className="button default">
              Allow Access
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default ConnectGitHubModal
