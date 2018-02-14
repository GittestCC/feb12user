import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import moment from 'moment'
import get from 'lodash/get'
import { getUrl } from '../../helpers/urlHelper'
import KintoBlockTagAndBranchDropDown from '../../components/breadcrumbs/KintoBlockTagAndBranchDropDown'
import { getVersionType } from '../../helpers/versionHelper'

function mapStateToProps(
  state,
  { url, kintoBlock, noHighlight, isDocumentation }
) {
  let selectedKintoBlock = {}

  if (kintoBlock) {
    selectedKintoBlock = kintoBlock
  } else {
    selectedKintoBlock =
      state.kintoBlocks.byId[state.pageOptions.selectedKintoBlockId] || {}
  }

  if (isDocumentation) {
    selectedKintoBlock = state.documentation.selectedKintoBlock
      ? state.documentation.selectedKintoBlock
      : {}
  }

  const id = get(selectedKintoBlock, 'id', '')
  const type =
    get(selectedKintoBlock, 'version.type', '').toLowerCase() || 'branch'

  const itemUrl = x => {
    return getUrl(url, {
      id: id,
      version: x.name,
      type: getVersionType(x),
      workspaceId: state.workspaces.selectedWorkspace
    })
  }

  const getArray = query => {
    let arr = []
    get(selectedKintoBlock, 'versions', [])
      .filter(item => item.type === query)
      .forEach(x => {
        if (query === 'BRANCH') {
          arr.push({
            name: x.name,
            url: itemUrl(x)
          })
        } else {
          arr.push({
            name: x.name,
            commitSha:
              get(x, 'commitSha', '')
                .substring(0, 4)
                .toUpperCase() || '',
            notes: x.note,
            url: itemUrl(x),
            lastUpdated: x.lastUpdated
              ? moment(x.lastUpdated).format('h:mmA, DD MMM YYYY')
              : ''
          })
        }
      })
    return arr
  }

  return {
    kintoBlock: selectedKintoBlock,
    kintoBlockType: type,
    branchArray: getArray('BRANCH'),
    tagArray: getArray('TAG'),
    dropdownText: get(selectedKintoBlock, 'version.name', ''),
    id: `ID${id}`,
    noHighlight
  }
}

export default connect(mapStateToProps, { push })(
  KintoBlockTagAndBranchDropDown
)
