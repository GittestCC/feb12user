import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { pages } from '../../constants/pages'
import { getPageUrl } from '../../helpers/urlHelper'
import { getVersionAsText, getVersionType } from '../../helpers/versionHelper'
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
      version: isKintoApp
        ? getVersionAsText(i.versions[0], true)
        : i.versions[0].name,
      type: getVersionType(i.versions[0])
    })
  }))
  return {
    disabled,
    selectedItemName: selectedItem.name,
    selectedItemUrl:
      selectedItem.id &&
      getPageUrl(editPage, {
        id: selectedItem.id,
        version: isKintoApp
          ? getVersionAsText(selectedItem.versions[0], true)
          : selectedItem.versions[0].name,
        type: getVersionType(selectedItem.versions[0])
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
