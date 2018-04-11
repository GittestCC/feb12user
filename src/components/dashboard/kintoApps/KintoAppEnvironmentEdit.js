import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Tooltip from 'rc-tooltip'
import KintoAppEnvironmentFormContainer from '../../../containers/dashboard/kintoApps/KintoAppEnvironmentFormContainer'
import { getServerUrl } from '../../../helpers/urlHelper'

class KintoAppEnvironmentEdit extends Component {
  static propTypes = {
    kintoApp: PropTypes.object.isRequired,
    environment: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.getKintoAppEnvironments(this.props.id)
    this.props.environmentSelect(this.props.envId)
    this.props.kintoAppSelect(this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    const { id, envId } = nextProps
    if (this.props.id !== id) {
      this.props.getKintoAppEnvironments(id)
    }
    if (this.props.envId !== envId) {
      this.props.environmentSelect(envId)
    }
  }

  render() {
    const { kintoApp, environment } = this.props
    const authUrl = getServerUrl(null, '/auth')
    const genericUrl = getServerUrl('{microservice}', '')
    const helloUrl = getServerUrl('{microservice}', '/sample/hello')
    const authCurl = `curl -H "Content-Type: application/json" -X POST -d '{"clientId":"${
      environment.clientId
    }","clientSecret":"${environment.secret}"}' ${authUrl}`
    const getCurl = `curl -H "Authorization: Bearer <token>" ${helloUrl}`
    return (
      <div className="environment-edit-page">
        <div className="page-title">
          <h2>{environment.name}</h2>
        </div>

        <KintoAppEnvironmentFormContainer
          kintoApp={kintoApp}
          environment={environment}
          isCreate={false}
        />
        <div className="form-wrapper">
          <h3>API Access</h3>
          <h5>Get the Client ID and Secret Key for this environment.</h5>

          <div className="form-block">
            <div className="field-container false two-columns">
              <div className="field">
                <div className="label environment">
                  Client ID
                  <Tooltip
                    placement="top"
                    overlay="This environment's Client ID"
                    trigger="click"
                  >
                    <span className="tooltip" />
                  </Tooltip>
                </div>
                <div className="false-input disabled">
                  {environment.clientId}
                </div>
              </div>
              <div className="field">
                <div className="label environment">
                  Secret Key
                  <Tooltip
                    placement="top"
                    overlay="This environment's Secret Key"
                    trigger="click"
                  >
                    <span className="tooltip" />
                  </Tooltip>
                </div>
                <div className="false-input disabled">{environment.secret}</div>
              </div>
            </div>

            <div className="section">
              <h4>Step 1 - Authenticate to get a token</h4>
              <p>
                You need to auth first before starting to call the endpoints.
              </p>
              <p>
                To auth you need to send the{' '}
                <span className="bold">Client ID</span> and{' '}
                <span className="bold">Secret Key</span> to{' '}
                <span className="bold">{authUrl}</span> like the following:
              </p>
              <div className="message-box dark">
                <div className="left">
                  <span className="code">{authCurl}</span>
                </div>
                <div className="right">
                  <CopyToClipboard text={authCurl}>
                    <button className="button secondary">Copy</button>
                  </CopyToClipboard>
                </div>
              </div>
              <p>
                You will get a <span className="bold">token</span> back, you
                need to send it in the{' '}
                <span className="bold">Authorization</span> header when you try
                to call the apis
              </p>
            </div>

            <div className="section">
              <h4>Step 2 - Access Your API</h4>
              <div>
                <p>
                  The base url for each microservice is: <br />
                  <span className="bold">{genericUrl}</span>
                </p>
                <p>
                  To call your microservice you just need to send the token as
                  part of the <span className="bold">Authorization</span> header
                </p>
              </div>
              <div className="message-box dark">
                <div className="left">
                  <span className="code">{getCurl}</span>
                </div>
                <div className="right">
                  <CopyToClipboard text={getCurl}>
                    <button className="button secondary">Copy</button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>

            <p>
              You can{' '}
              <a
                href="https://docs.kintohub.com/docs/getting-started.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                read more about it here
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default KintoAppEnvironmentEdit
