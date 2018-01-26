import React from 'react'

const Index = () => (
  <div data-test="dashboard-index-page" className="dashboard-home">
    <div className="home-logo" />
    <h1>Welcome to KintoHub.</h1>
    <h4>To get started, you can read our quick guide:</h4>
    <a
      className="button default"
      href="https://desk.zoho.com/portal/kintohub/kb"
      target="_blank"
      rel="noopener noreferrer"
    >
      Get Started
    </a>
  </div>
)

export default Index
