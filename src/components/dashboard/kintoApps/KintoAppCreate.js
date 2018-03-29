import React from 'react'
import KintoAppFormContainer from '../../../containers/dashboard/kintoApps/KintoAppFormContainer'

const KintoAppCreate = () => (
  <div className="create-kintoapp">
    <h2>Create New Application</h2>
    <div className="what-is-a-kintoapp">
      <div className="text">
        <h5>What is an Application?</h5>
        <h5 className="body-copy">
          Applications are tailored back-end features packages, ready to be
          consumed by your clients and whose feature can scale independently to
          fit your needs. They are composed of KintoBlocks and services with
          unique configuration parameters, and either a client or a protocol to
          allow your clients to talk to the application. Start building an
          application below or{' '}
          <a
            href="https://help.kintohub.com/docs/getting-started.html/articles/creating-an-application"
            target="_blank"
            rel="noopener noreferrer"
          >
            learn more here
          </a>.
        </h5>
      </div>
      <a
        href="https://help.kintohub.com/docs/getting-started.html/articles/creating-an-application"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="icon" />
      </a>

      {/* TODO: add links for help center here when they are available */}
    </div>

    <KintoAppFormContainer isCreate={true} />
  </div>
)

export default KintoAppCreate
