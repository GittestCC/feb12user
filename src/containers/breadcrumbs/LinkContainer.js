import { connect } from 'react-redux'
import { getUrl } from '../../helpers/urlHelper'
import Link from '../../components/breadcrumbs/Link'

function mapStateToProps(state, { url }) {
  const { pageOptions, workspaces } = state
  return {
    url: getUrl(
      url,
      {
        id: pageOptions.selectedKintoAppId,
        envId: pageOptions.selectedEnvironmentId,
        workspaceId: workspaces.selectedWorkspace
      },
      true
    )
  }
}

export default connect(mapStateToProps)(Link)
