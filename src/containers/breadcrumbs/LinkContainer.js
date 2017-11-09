import { connect } from 'react-redux'
import { getUrl } from '../../helpers/urlHelper'
import KintoVersionSwitcher from '../../components/breadcrumbs/Link'

function mapStateToProps(state, { url }) {
  const { pageOptions } = state
  return {
    url:
      pageOptions.selectedKintoAppId &&
      getUrl(url, {
        id: pageOptions.selectedKintoAppId,
        envId: pageOptions.selectedEnvironmentId
      })
  }
}

export default connect(mapStateToProps)(KintoVersionSwitcher)
