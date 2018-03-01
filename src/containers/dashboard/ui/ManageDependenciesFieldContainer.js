import { connect } from 'react-redux'
import ManageDependenciesField from '../../../components/dashboard/ui/ManageDependenciesField'
import { getDependenciesFactory } from '../../../selectors/kintoDependencies'
import { debounceSelectAsync } from '../../../helpers/objectHelper'
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

function mapDispatchToProps(dispatch) {
  const searchFunc = query => dispatch(searchKintoBlocks(query))
  return {
    searchKintoBlocks: debounceSelectAsync(searchFunc),
    fetchKintoBlockDependenciesData: (id, ver, type) =>
      dispatch(fetchKintoBlockDependenciesData(id, ver, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ManageDependenciesField
)
