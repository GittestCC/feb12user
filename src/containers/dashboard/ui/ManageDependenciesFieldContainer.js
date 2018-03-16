import { connect } from 'react-redux'
import uniq from 'lodash/uniq'
import ManageDependenciesField from '../../../components/dashboard/ui/ManageDependenciesField'
import { getDependenciesFactory } from '../../../selectors/kintoDependencies'
import { debounceSelectAsync } from '../../../helpers/objectHelper'
import {
  searchKintoBlocks,
  fetchKintoBlockDependenciesData
} from '../../../actions/kintoBlocks'

function mapStateToProps(
  state,
  { appVersion, dependencies, name, disabled, isKintoBlock, kintoBlock }
) {
  const workspaceId = state.workspaces ? state.workspaces.selectedWorkspace : ''
  const getDependencies = getDependenciesFactory()
  const dependenciesInfo = getDependencies(state, dependencies)

  let itemsToSkip = []
  if (isKintoBlock) {
    itemsToSkip.push(kintoBlock.id)
  }
  Object.keys(dependenciesInfo).forEach(k => {
    const item = dependenciesInfo[k]
    itemsToSkip.push(item.blockId)
    if (item.dependencies && item.dependencies.length) {
      itemsToSkip = itemsToSkip.concat(item.dependencies.map(i => i.blockId))
    }
  })
  itemsToSkip = uniq(itemsToSkip)

  return {
    appVersion,
    name,
    dependenciesInfo,
    isKintoBlock,
    itemsToSkip,
    disabled,
    workspaceId
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
