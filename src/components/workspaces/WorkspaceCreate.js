import React from 'react'
import { Link } from 'react-router-dom'
import WorkspaceFormContainer from '../../containers/workspaces/WorkspaceFormContainer'

const WorkspaceCreate = () => {
  return (
    <div className="create-workspace">
      <h2>Create New Workspace</h2>

      <div className="what-is-a-workspace">
        <div className="text">
          <h5>What is a Workspace?</h5>
          <h5 className="body-copy">
            A workspace is like a folder where you put all your projects in.
            They can be shared with other people to collaborate on every project
            inside, or just selected projects. You can {' '}
            <Link to="/about-us">learn more here.</Link>
          </h5>
        </div>
        <div className="icon" />
      </div>

      <WorkspaceFormContainer isCreate={true} />
    </div>
  )
}

export default WorkspaceCreate
