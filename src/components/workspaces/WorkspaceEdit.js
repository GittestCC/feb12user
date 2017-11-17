import React, { Component } from 'react'
import WorkspaceFormContainer from '../../containers/workspaces/WorkspaceFormContainer'

class WorkspaceEdit extends Component {
  componentDidMount() {
    this.props.fetchWorkspaces()
    this.props.workspaceBreadcrumbSelect(this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.props.workspaceBreadcrumbSelect(nextProps.id)
    }
  }

  render() {
    const { workspace } = this.props
    return (
      <div>
        <WorkspaceFormContainer workspace={workspace} isCreate={false} />
      </div>
    )
  }
}

export default WorkspaceEdit
