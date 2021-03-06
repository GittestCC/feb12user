import React, { Component } from 'react'
import KintoBlockCreateFormContainer from '../../../containers/dashboard/kintoBlocks/kintoBlockCreate/KintoBlockCreateFormContainer'
import { githubConnectUrl } from '../../../helpers/urlHelper'
import { pageTypes } from '../../../constants/github'
import ComplexModal from '../ui/ComplexModal'
import ConnectGitHubModal from './kintoBlockCreate/ConnectGitHubModal'

class KintoBlockCreate extends Component {
  state = {
    isConnectModalOpen: false
  }

  componentDidMount() {
    if (!this.props.hasOrganizations) {
      this.setState({ isConnectModalOpen: true })
    }
  }

  render() {
    const { workspaceId, goToRedirectLink } = this.props
    return (
      <div>
        <h2>Create KintoBlocks</h2>
        <div className="what-is-a-kintoblock">
          <div className="text">
            <h5>What is a KintoBlock?</h5>
            <h5 className="body-copy">
              KintoBlocks make coding microservices easy for all your
              application needs. Build, combine, manage dependencies, document,
              CI/CD, host and scale across languages. Start building KintoBlocks
              below or{' '}
              <a
                href="https://docs.kintohub.com/docs/getting-started.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                learn more here
              </a>.
            </h5>
          </div>
          <a
            href="https://docs.kintohub.com/docs/creating-a-kintoblock.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="icon" />
          </a>
        </div>
        <KintoBlockCreateFormContainer />

        <ComplexModal
          className="string"
          component={ConnectGitHubModal}
          isOpen={this.state.isConnectModalOpen}
          onClose={goToRedirectLink}
          data={{
            connectGithubLink: githubConnectUrl(
              workspaceId,
              pageTypes.KB_CREATE
            )
          }}
        />
      </div>
    )
  }
}

export default KintoBlockCreate
