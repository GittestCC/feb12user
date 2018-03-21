import { connect } from 'react-redux'
import KintoBlockEndpointDetails from '../../../components/dashboard/documentation/KintoBlockEndpointDetails'
import { fetchKintoBlockDocumentationEndpoint } from '../../../actions/documentation'

function mapStateToProps(state, { match }) {
  const { selectedKintoBlockId, selectedBuildId, byId } = state.documentation
  const { endpointId } = match.params

  const selectedEndpoint = byId[endpointId] || {}

  return {
    selectedKintoBlockId,
    selectedBuildId,
    selectedEndpoint,
    endpointId
  }
}

function mergeProps(stateProps, dispatchProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    fetchKintoBlockDocumentationEndpoint: endpointId =>
      dispatchProps.fetchKintoBlockDocumentationEndpoint(
        stateProps.selectedKintoBlockId,
        stateProps.selectedBuildId,
        endpointId
      )
  }
}

export default connect(
  mapStateToProps,
  {
    fetchKintoBlockDocumentationEndpoint
    // TODO fetchKintoBlockEndpointProtocol
  },
  mergeProps
)(KintoBlockEndpointDetails)
