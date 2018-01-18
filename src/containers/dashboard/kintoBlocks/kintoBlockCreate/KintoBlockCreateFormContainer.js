import { connect } from 'react-redux'
import { formValueSelector, change, untouch } from 'redux-form'
import { createKintoBlock } from '../../../../actions/kintoBlocks'
import { searchRepositories } from '../../../../actions/workspaces'
import KintoBlockCreateForm from '../../../../components/dashboard/kintoBlocks/kintoBlockCreate/KintoBlockCreateForm'

const formName = 'kintoBlockCreateForm'
const selector = formValueSelector(formName)

function mapStateToProps(state) {
  const isNewRepository = !!selector(state, 'newRepository')
  const selectedRepository = selector(state, 'repositoryId')
  const selectedOrganizationId = selector(state, 'organizationId')

  const selectedWorkspace = state.workspaces.selectedWorkspace
  const organizations =
    state.workspaces.byId[selectedWorkspace].organizations || []
  const preFillOrg = organizations.find(o => o.id === selectedOrganizationId)
  const preFillText = preFillOrg ? preFillOrg.name : ''
  return {
    selectedRepository,
    selectedOrganizationId,
    organizations,
    isNewRepository,
    preFillText: `${preFillText}/ `,
    selectedWorkspace,
    initialValues: {
      isPublic: true,
      newRepository: true,
      organizationId: organizations[0] ? organizations[0].id : '1'
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: data => dispatch(createKintoBlock(data)),
    searchRepositories: query => dispatch(searchRepositories(query)),
    selectRepository: data => {
      dispatch(change('kintoBlockCreateForm', 'organizationId', data.orgId))
      dispatch(change('kintoBlockCreateForm', 'repositoryId', data.value))
    },
    fieldCorrection: data => {
      dispatch(change('kintoBlockCreateForm', 'repositoryId', null))
      dispatch(change('kintoBlockCreateForm', 'repositoryName', null))
      dispatch(
        untouch('kintoBlockCreateForm', 'repositoryName', 'repositoryId')
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoBlockCreateForm
)
