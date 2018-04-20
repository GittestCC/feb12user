import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import { isProduction } from '../../helpers/pageHelper'
import DependencyItem from './DependencyItem'

class DependencyManagement extends Component {
  static propTypes = {
    appVersion: PropTypes.string,
    fields: PropTypes.object.isRequired,
    appDependenciesInfo: PropTypes.object.isRequired,
    onSearchKintoBlocks: PropTypes.func.isRequired,
    fetchKintoBlockDependenciesData: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    isKintoBlock: PropTypes.bool,
    workspaceId: PropTypes.string,
    itemsToSkip: PropTypes.array.isRequired
  }

  onSelectKintoBlock = selectedItem => {
    this.props
      .fetchKintoBlockDependenciesData(
        selectedItem.id,
        selectedItem.version.name,
        selectedItem.version.type
      )
      .then(data => {
        this.props.fields.push(data)
      })
  }

  filterDependencies = (options, filter) => {
    return options.filter(i => {
      return (
        i.name.toUpperCase().startsWith(filter.toUpperCase()) &&
        !this.props.itemsToSkip.some(s => s === i.id)
      )
    })
  }

  render() {
    const {
      appVersion,
      fields,
      appDependenciesInfo,
      workspaceId,
      onSearchKintoBlocks,
      disabled,
      isKintoBlock
    } = this.props

    const configUrl =
      appVersion && fields.length ? `${appVersion}/config/0` : null
    return (
      <div>
        <h3>Dependencies</h3>
        <h5>
          If your KintoBlock needs other KintoBlocks to work (like an Auth
          KintoBlock or a Leaderboard KintoBlock), pick and choose them here.
          You can then configure each of them when building your application.
        </h5>
        <div className="form-body simple dependency-management">
          {!disabled ? (
            <div
              className={`search-and-buttons ${
                isKintoBlock ? 'kintoblock' : 'kintoapp'
              }`}
            >
              <Select.Async
                placeholder="Search KintoBlocks"
                loadOptions={onSearchKintoBlocks}
                onChange={this.onSelectKintoBlock}
                filterOptions={this.filterDependencies}
              />

              {!isKintoBlock &&
                !isProduction() && (
                  <div className="dependency-management-buttons">
                    {/* <div className="button-group">
                      <a to="" className="button secondary disabled">
                      Split All Duplicate Instances
                      </a>
                      <a className="icon split-instances hide-text disabled">
                      split
                      </a>
                      </div>
                      <div className="button-group">
                      <a className="button secondary disabled">
                      Merge All Duplicate Instances
                      </a>
                      <a className="icon combine-instances hide-text disabled">
                      combine
                      </a>
                  </div> */}

                    {configUrl ? (
                      <div className="button-group">
                        <Link to={configUrl} className="button secondary">
                          Edit Dependencies
                        </Link>
                        <Link
                          to={configUrl}
                          className="icon edit-blocks-and-services glyph hide-text"
                        >
                          edit blocks
                        </Link>
                      </div>
                    ) : (
                      <div className="button-group">
                        <a className="button secondary disabled">
                          Edit Dependencies
                        </a>
                        <a
                          className="icon edit-blocks-and-services glyph hide-text"
                          disabled
                        >
                          edit blocks
                        </a>
                      </div>
                    )}
                  </div>
                )}
            </div>
          ) : null}

          <div>
            {fields.length ? (
              <div className="blocks-or-services">
                {fields.map((field, key, fields) => (
                  <DependencyItem
                    appVersion={appVersion}
                    key={key}
                    index={key}
                    field={field}
                    fields={fields}
                    appDependenciesInfo={appDependenciesInfo}
                    workspaceId={workspaceId}
                    data={fields.get(key)}
                    disabled={disabled}
                    isKintoBlock={isKintoBlock}
                  />
                ))}
              </div>
            ) : (
              <div className="no-blocks-or-services">
                <div className="icons">
                  <div className="kinto-block" />
                </div>
                <div className="text">No Dependencies added</div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default DependencyManagement
