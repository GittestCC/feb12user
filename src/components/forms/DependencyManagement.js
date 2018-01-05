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
    disabled: PropTypes.bool
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
      disabled
    } = this.props

    const configUrl =
      appVersion && fields.length ? `${appVersion}/config/0` : null
    return (
      <div>
        <h3>KintoBlocks & Services</h3>
        <h5>
          This is where the magic happens: add KintoBlocks and services to
          deliver the features you need in your client - we make them all work
          together. Because we know your application is special, you can specify
          unique configuration parameters for each of the features you are
          adding. You can also decide to combine or split instances of the same
          KintoBlock or service to save on costs.
        </h5>
        <div className="form-body simple dependency-management">
          {!disabled ? (
            <div>
              <Select.Async
                placeholder="Search KintoBlocks or services"
                loadOptions={onSearchKintoBlocks}
                onChange={this.onSelectKintoBlock}
              />

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
                    Combine All Duplicate Instances
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
                <div className="text">No KintoBlocks or services added</div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default DependencyManagement
