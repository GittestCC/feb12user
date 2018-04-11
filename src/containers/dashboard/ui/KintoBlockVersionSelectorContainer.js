import { connect } from 'react-redux'
import { change } from 'redux-form'
import moment from 'moment'
import get from 'lodash/get'

import KintoBlockTagAndBranchDropDown from '../../../components/dashboard/ui/KintoBlockTagAndBranchDropDown'
import { timeDayMonthYearShort } from '../../../constants/dateFormat'

function mapStateToProps(state, { kintoBlock, isForm }) {
  const id = get(kintoBlock, 'blockId', '')
  const type = get(kintoBlock, 'version.type', '').toLowerCase() || 'branch'

  const getArray = query => {
    let array = []
    get(kintoBlock, 'versions', [])
      .filter(item => item.type === query)
      .forEach(x => {
        if (query === 'BRANCH') {
          array.push({
            name: x.name,
            type: 'BRANCH'
          })
        } else {
          array.push({
            name: x.name,
            type: 'TAG',
            notes: x.note,
            lastUpdated: x.lastUpdated
              ? moment(x.lastUpdated).format(timeDayMonthYearShort)
              : ''
          })
        }
      })
    return array
  }

  return {
    id: `ID${id}`,
    kintoBlock,
    isForm,
    kintoBlockType: type,
    branchArray: getArray('BRANCH'),
    tagArray: getArray('TAG'),
    dropdownText: get(kintoBlock, 'version.name', '')
  }
}

function mapDispatchToProps(dispatch, { isKintoBlock, field }) {
  return {
    onClickHandler: item => {
      const formName = isKintoBlock ? 'kintoBlockManageForm' : 'kintoAppForm'

      dispatch(
        change(formName, `${field}.version`, {
          name: item.name,
          type: item.type
        })
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoBlockTagAndBranchDropDown
)
