import { connect } from 'react-redux'
import EndpointInfoSwitcher from '../../components/breadcrumbs/EndpointInfoSwitcher'
import { pages } from '../../constants/pages'
import { getPageUrl } from '../../helpers/urlHelper'

function mapStateToProps(state) {
  const { documentation, workspaces } = state
  const workspaceId = workspaces.selectedWorkspace
  const kintoBlock = documentation.selectedKintoBlock

  return {
    text: documentation.isEndpoint ? 'Endpoints' : 'Info',
    endpointUrl: kintoBlock
      ? getPageUrl(pages.dashboardDocumentation, {
          workspaceId,
          id: kintoBlock.id,
          version: kintoBlock.version.name,
          type: kintoBlock.version.type
        })
      : '',
    infoUrl: 'allthesausages' //TODO: add link when we have an info page
  }
}

export default connect(mapStateToProps)(EndpointInfoSwitcher)
