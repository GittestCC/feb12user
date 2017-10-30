import { connect } from 'react-redux'
import ManageDependenciesField from '../../../components/dashboard/ui/ManageDependenciesField'
import { getDependenciesFactory } from '../../../selectors/kintoDependencies'
import {
  searchKintoBlocks,
  fetchKintoBlockDependenciesData
} from '../../../actions/kintoBlocks'

function mapStateToProps(state, { appVersion, dependencies, name }) {
  const getDependencies = getDependenciesFactory()
  const dependenciesInfo = getDependencies(state, dependencies)
  return {
    appVersion,
    name,
    dependenciesInfo
  }
}

export default connect(mapStateToProps, {
  searchKintoBlocks,
  fetchKintoBlockDependenciesData
})(ManageDependenciesField)
