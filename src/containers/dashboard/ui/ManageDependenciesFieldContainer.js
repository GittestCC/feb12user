import { connect } from 'react-redux'
import ManageDependenciesField from '../../../components/dashboard/ui/ManageDependenciesField'
import { getDependenciesFactory } from '../../../selectors/kintoDependencies'
import {
  searchKintoBlocks,
  fetchKintoBlockDependenciesData
} from '../../../actions/kintoBlocks'

function mapStateToProps(
  state,
  { appVersion, dependencies, name, disabled, isKintoBlock }
) {
  const workspaceId = state.workspaces ? state.workspaces.selectedWorkspace : ''
  const getDependencies = getDependenciesFactory()
  const dependenciesInfo = getDependencies(state, dependencies)
  return {
    workspaceId,
    appVersion,
    name,
    dependenciesInfo,
    disabled,
    isKintoBlock
  }
}

export default connect(mapStateToProps, {
  searchKintoBlocks,
  fetchKintoBlockDependenciesData
})(ManageDependenciesField)
