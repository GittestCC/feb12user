import React from 'react'
import KintoBlockCreateFormContainer from '../../../containers/dashboard/kintoBlocks/kintoBlockCreate/KintoBlockCreateFormContainer'

const KintoBlockCreate = () => (
  <div>
    <h2>Create KintoBlocks</h2>
    <div className="what-is-a-kintoblock">
      <div className="text">
        <h5>What is a KintoBlock?</h5>
        <h5 className="body-copy">
          KIntoBlocks are the new standard format for microservices. They are
          self-contained, containerized, universally compatible, language
          agnostic, combineable and shareable bricks of back-end logic. We take
          off your shoulders the hassle of library configuration, deployment,
          and infrastructure so you can focus on writing exactly the features
          you need. Start building KintoBlocks below or{' '}
          <a href="">learn more here</a>.
        </h5>
      </div>
      <a href="">
        <div className="icon" />
      </a>
    </div>
    <KintoBlockCreateFormContainer />
  </div>
)

export default KintoBlockCreate
