import React from 'react'

const Index = () => (
  <div data-test="dashboard-index-page" className="dashboard-home">
    <img src="/images/logo-neon-light.gif" className="home-logo" alt="" />
    <h1>Welcome to KintoHub.</h1>
    <h4>
      The coding adventure awaits! You can start exploring right away or read
      our quick guide:
    </h4>
    <a
      className="button default"
      href="https://docs.kintohub.com/docs/getting-started.html"
      target="_blank"
      rel="noopener noreferrer"
    >
      Get Started
    </a>
    <a
      href="https://github.com/kintohub"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="icon github" />
      Visit Our GitHub
    </a>
    <a
      href="https://join.slack.com/t/kintohub/shared_invite/enQtMzIxNDU2OTE4NTYyLWJmNWM1ZTQ3YTFlMzJkYWUzMWE2ZTlmZjk3ZGQ1NWFlMDRkYzhhODNmNDZlMDZmNjhlMzBhNWRiYWIxMTVjMmU"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="icon slack" />
      Join Our Slack Community
    </a>
  </div>
)

export default Index
