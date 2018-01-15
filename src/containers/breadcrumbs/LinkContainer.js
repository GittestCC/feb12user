import { connect } from 'react-redux'
import { getUrl } from '../../helpers/urlHelper'
import KintoVersionSwitcher from '../../components/breadcrumbs/Link'

function mapStateToProps(state, { url }) {
  const { pageOptions, workspaces } = state
  return {
    url:
      pageOptions.selectedKintoAppId &&
      getUrl(url, {
        id: pageOptions.selectedKintoAppId,
        envId: pageOptions.selectedEnvironmentId,
        workspaceId: workspaces.selectedWorkspace
      })
  }
}

export default connect(mapStateToProps)(KintoVersionSwitcher)
