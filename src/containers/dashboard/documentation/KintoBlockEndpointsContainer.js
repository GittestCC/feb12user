import { connect } from 'react-redux'
import KintoBlockEndpoints from '../../../components/dashboard/documentation/KintoBlockEndpoints'
import {
  fetchKintoBlockDocumentation,
  fetchKintoBlockDocumentationEndpoint,
  fetchKintoBlockForDocumentation
} from '../../../actions/documentation'

function mapStateToProps(state, { match }) {
  const { id, version, type } = match.params
  const { selectedBuildId, allIds, byId } = state.documentation

  const endpointList = allIds.map(id => ({
    id: byId[id].id,
    type: byId[id].type,
    url: byId[id].url
  }))

  const firstEndpointId = endpointList.length ? endpointList[0].id : ''

  return {
    id,
    version,
    type,
    selectedBuildId,
    endpointList,
    firstEndpointId
  }
}

export default connect(mapStateToProps, {
  fetchKintoBlockForDocumentation,
  fetchKintoBlockDocumentation,
  fetchKintoBlockDocumentationEndpoint
})(KintoBlockEndpoints)
