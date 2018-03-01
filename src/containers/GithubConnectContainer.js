import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import qs from 'query-string'
import { getPageUrl } from '../helpers/urlHelper'
import { pages } from '../constants/pages'
import { connectGithub } from '../actions/workspaces'
import GithubConnect from '../components/GithubConnect'

function mapDispatchToProps(dispatch, { location }) {
  return {
    connectGithub: () => {
      const { code, state: workspaceId } = qs.parse(location.search)
      if (!code || !workspaceId) {
        dispatch(push('/'))
      }
      dispatch(connectGithub(workspaceId, code)).then(() => {
        dispatch(push(getPageUrl(pages.workspaceEdit, { id: workspaceId })))
      })
    }
  }
}

export default connect(undefined, mapDispatchToProps)(GithubConnect)
