import React, { Component } from 'react'
import KintoBlockCreateFormContainer from '../../../containers/dashboard/kintoBlocks/kintoBlockCreate/KintoBlockCreateFormContainer'
import { githubConnectUrl } from '../../../helpers/urlHelper'
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
              KIntoBlocks are the new standard format for microservices. They
              are self-contained, containerized, universally compatible,
              language agnostic, combineable and shareable bricks of back-end
              logic. We take off your shoulders the hassle of library
              configuration, deployment, and infrastructure so you can focus on
              writing exactly the features you need. Start building KintoBlocks
              below or{' '}
              <a
                href="https://help.kintohub.com/docs/getting-started.html/articles/creating-a-kintoblock"
                target="_blank"
                rel="noopener noreferrer"
              >
                learn more here
              </a>.
            </h5>
          </div>
          <a
            href="https://help.kintohub.com/docs/getting-started.html/articles/creating-a-kintoblock"
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
            connectGithubLink: githubConnectUrl(workspaceId)
          }}
        />
      </div>
    )
  }
}

export default KintoBlockCreate
