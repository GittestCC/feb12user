import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { Link } from 'react-router-dom'

import DependencyItem from './DependencyItem'
class DependencyManagement extends Component {
  static propTypes = {
    appVersion: PropTypes.string,
    fields: PropTypes.object.isRequired,
    appDependenciesInfo: PropTypes.object.isRequired,
    onSearchKintoBlocks: PropTypes.func.isRequired,
    fetchKintoBlockDependenciesData: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    isKintoBlock: PropTypes.bool
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

  render() {
    const {
      appVersion,
      fields,
      appDependenciesInfo,
      onSearchKintoBlocks,
      disabled,
      isKintoBlock
    } = this.props

    const configUrl =
      appVersion && fields.length ? `${appVersion}/config/0` : null
    return (
      <div>
        <h3>KintoBlocks</h3>
        <h5>
          If your KintoBlock needs other KintoBlocks to work (like an auth
          KintoBlock or a database service), pick and chose them here. You can
          then configure them so they fit perfectly your use case. You can
          specify unique configuration parameters for each of the features you
          are adding. You can also decide to combine or split instances of the
          same KintoBlock to save on costs.
        </h5>
        <div className="form-body simple dependency-management">
          {!disabled ? (
            <div>
              <Select.Async
                placeholder="Search KintoBlocks"
                loadOptions={onSearchKintoBlocks}
                onChange={this.onSelectKintoBlock}
              />
              {!isKintoBlock && (
                <div className="dependency-management-buttons">
                  <div className="button-group">
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
                  </div>
                  {configUrl ? (
                    <div className="button-group">
                      <Link to={configUrl} className="button secondary">
                        Edit KintoBlocks & Services
                      </Link>
                      <Link
                        to={configUrl}
                        className="icon edit-blocks-and-services hide-text"
                      >
                        edit blocks
                      </Link>
                    </div>
                  ) : (
                    <div className="button-group">
                      <a className="button secondary disabled">
                        Edit KintoBlocks & Services
                      </a>
                      <a
                        className="icon edit-blocks-and-services hide-text"
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
                    data={fields.get(key)}
                    disabled={disabled}
                  />
                ))}
              </div>
            ) : (
              <div className="no-blocks-or-services">
                <div className="icons">
                  <div className="kinto-block" />
                  <div className="service" />
                </div>
                <div className="text">No KintoBlocks added</div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default DependencyManagement
