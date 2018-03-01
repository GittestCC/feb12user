import { connect } from 'react-redux'
import { formValueSelector, change, untouch } from 'redux-form'
import { createKintoBlock } from '../../../../actions/kintoBlocks'
import { searchRepositories } from '../../../../actions/workspaces'
import { showSpinner, hideSpinner } from '../../../../actions/pageOptions'
import { debounceSelectAsync } from '../../../../helpers/objectHelper'
import KintoBlockCreateForm from '../../../../components/dashboard/kintoBlocks/kintoBlockCreate/KintoBlockCreateForm'

const formName = 'kintoBlockCreateForm'
const selector = formValueSelector(formName)

function mapStateToProps(state) {
  let isNewRepository = selector(state, 'isNewRepository')
  isNewRepository =
    typeof isNewRepository === 'boolean' ? isNewRepository : true
  const selectedOrganizationId = selector(state, 'organizationId')

  const selectedWorkspace = state.workspaces.selectedWorkspace
  const organizations =
    state.workspaces.byId[selectedWorkspace].organizations || []
  const preFillOrg = organizations.find(o => o.id === selectedOrganizationId)
  const preFillText = preFillOrg ? preFillOrg.name : ''
  return {
    organizations,
    isNewRepository,
    preFillText: `${preFillText}/ `,
    selectedWorkspace,
    initialValues: {
      isPublic: true,
      isNewRepository: true,
      memberIds: [],
      organizationId: organizations[0] ? organizations[0].id : '1'
    }
  }
}

function mapDispatchToProps(dispatch) {
  const searchFunc = query => dispatch(searchRepositories(query))
  return {
    searchRepositories: debounceSelectAsync(searchFunc),
    onSubmit: data => {
      dispatch(showSpinner())
      dispatch(createKintoBlock(data)).then(
        () => dispatch(hideSpinner()),
        () => dispatch(hideSpinner())
      )
    },
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
