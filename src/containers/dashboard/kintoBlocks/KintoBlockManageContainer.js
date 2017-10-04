import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { fetchKintoBlock, fetchKintoBlocks } from '../../../actions/kintoBlocks'
import { getAllKintoBlocks } from '../../../selectors/kintoBlocks'
import {
  findInArrayByText,
  asTextList,
  getVersionSelectItem,
  isVersionEqual
} from '../../../helpers/versionHelper'
import { getBreadcrumbSelectItem } from '../../../helpers/breadcrumbHelper'
import KintoBlockManage from '../../../components/dashboard/kintoBlocks/KintoBlockManage'

function mapStateToProps(state, { match }) {
  const { id, ver } = match.params
  const kintoBlock = state.kintoBlocks.byId[id] || {}
  const kintoBlocks = getAllKintoBlocks(state)
  let versionSelectItems = []
  let breadcrumbSelectItems = []

  if (kintoBlocks.length) {
    breadcrumbSelectItems = kintoBlocks.map(k =>
      getBreadcrumbSelectItem(k, id, false)
    )
  }

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
    id,
    ver,
    kintoBlock,
    version: findInArrayByText(kintoBlock.versions, ver),
    baseVersions: asTextList(kintoBlock.versions),
    versionSelectItems,
    breadcrumbSelectItems,
    KintoBlocks: getAllKintoBlocks(state)
  }
}

export default connect(mapStateToProps, {
  fetchKintoBlock,
  fetchKintoBlocks,
  push
})(KintoBlockManage)
