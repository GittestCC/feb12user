import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { pages } from '../../constants/pages'
import { getPageUrl } from '../../helpers/urlHelper'
import { getVersionAsText } from '../../helpers/versionHelper'
import { getAllKintoApps } from '../../selectors/kintoApps'
import { getAllKintoBlocks } from '../../selectors/kintoBlocks'

import KintoSwitcher from '../../components/breadcrumbs/KintoSwitcher'

function mapStateToProps(state, { disabled, type }) {
  const isKintoApp = type === 'kintoapp'
  const createPage = isKintoApp
    ? pages.dashboardKintoAppsCreate
    : pages.dashboardKintoBlocksCreate
  const editPage = isKintoApp
    ? pages.dashboardKintoAppsManage
    : pages.dashboardKintoBlocksManage

  const selectedItem =
    (isKintoApp
      ? state.kintoApps.byId[state.pageOptions.selectedKintoAppId]
      : state.kintoBlocks.byId[state.pageOptions.selectedKintoBlockId]) || {}

  const list = isKintoApp ? getAllKintoApps(state) : getAllKintoBlocks(state)
  const dropdownItems = list.map(i => ({
    text: i.name,
    active: selectedItem && selectedItem.id === i.id,
    url: getPageUrl(editPage, {
      id: i.id,
      version: getVersionAsText(i.versions[0], true)
    })
  }))
  return {
    disabled,
    selectedItemName: selectedItem.name,
    selectedItemUrl:
      selectedItem.id &&
      getPageUrl(editPage, {
        id: selectedItem.id,
        version: getVersionAsText(selectedItem.versions[0], true)
      }),
    createUrl: getPageUrl(createPage),
    dropdownItems
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...ownProps,
    actionHandler: () => {
      dispatchProps.push(stateProps.createUrl)
    }
  }
}

export default connect(
  mapStateToProps,
  {
    push
  },
  mergeProps
)(KintoSwitcher)
