import { connect } from 'react-redux'
import KintoBlockEndpointDetails from '../../../components/dashboard/documentation/KintoBlockEndpointDetails'
import {
  fetchKintoBlockDocumentationEndpoint,
  fetchKintoBlockEndpointProtocol
} from '../../../actions/documentation'

function mapStateToProps(state, { match }) {
  let id = state.documentation.selectedKintoBlockId
  let { endpointId } = match.params
  const kintoBlock = state.documentation.selectedKintoBlock || {}
  let buildId = kintoBlock.version ? kintoBlock.version.buildId : ''

  let selectedEndpoint = state.documentation
    ? state.documentation.byId[endpointId]
    : {}

  const exposedSession =
    selectedEndpoint && selectedEndpoint.header
      ? selectedEndpoint.header.exposedSession
      : []

  const session =
    selectedEndpoint && selectedEndpoint.header
      ? selectedEndpoint.header.session
      : []
  const parameters =
    selectedEndpoint && selectedEndpoint.parameter
      ? {
          url: selectedEndpoint.parameter.url
            ? selectedEndpoint.parameter.url
            : [],
          body: selectedEndpoint.parameter.body
            ? selectedEndpoint.parameter.body
            : [],
          query: selectedEndpoint.parameter.query
            ? selectedEndpoint.parameter.query
            : []
        }
      : {}

  return {
    id,
    buildId,
    selectedEndpoint,
    endpointId,
    exposedSession,
    session,
    parameters
  }
}

export default connect(mapStateToProps, {
  fetchKintoBlockDocumentationEndpoint,
  fetchKintoBlockEndpointProtocol
})(KintoBlockEndpointDetails)
