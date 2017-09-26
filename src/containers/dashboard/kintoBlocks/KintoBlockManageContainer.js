import { connect } from 'react-redux'

import { fetchKintoBlock } from '../../../actions/kintoBlocks'
import {
  findInArrayByText,
  asTextList,
  getVersionSelectItem,
  isVersionEqual
} from '../../../helpers/versionHelper'
import KintoBlockManage from '../../../components/dashboard/kintoBlocks/KintoBlockManage'

function mapStateToProps(state, { match }) {
  const { id, ver } = match.params
  const kintoBlock = state.kintoBlocks.byId[id] || {}
  let versionSelectItems = []
  if (kintoBlock.versions) {
    versionSelectItems = kintoBlock.versions.map(v => {
      let result = getVersionSelectItem(v, id)
      if (isVersionEqual(v, ver)) {
        result.active = true
      }
      return result
    })
  }
  return {
    ver,
    kintoBlock,
    version: findInArrayByText(kintoBlock.versions, ver),
    baseVersions: asTextList(kintoBlock.versions),
    versionSelectItems
  }
}

function mapDispatchToProps(dispatch, { match }) {
  return {
    fetchKintoBlock: ver => dispatch(fetchKintoBlock(match.params.id, ver))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KintoBlockManage)
