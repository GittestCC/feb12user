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
    fetchKintoBlockDependenciesData: PropTypes.func.isRequired
  }

  onSelectKintoBlock = selectedItem => {
    this.props
      .fetchKintoBlockDependenciesData(selectedItem.id, selectedItem.version)
      .then(data => {
        this.props.fields.push(data)
      })
  }

  render() {
    const {
      appVersion,
      fields,
      appDependenciesInfo,
      onSearchKintoBlocks
    } = this.props
    return (
      <div>
        <h3>KintoBlocks & Services</h3>
        <h5>
          Choose the build and give your baby a number so they don’t get mixed
          up in a sea of babies.
        </h5>
        <div className="form-body simple dependency-management">
          <Select.Async
            placeholder="Search KintoBlocks or services"
            loadOptions={onSearchKintoBlocks}
            onChange={this.onSelectKintoBlock}
          />

          <div className="dependency-management-buttons">
            <div className="button-group">
              <Link to="" className="button secondary">
                Split All Duplicate Instances
              </Link>
              <Link to="" className="icon split-instances" />
            </div>
            <div className="button-group">
              <Link to="" className="button secondary">
                Combine All Duplicate Instances
              </Link>
              <Link to="" className="icon combine-instances" />
            </div>
            <div className="button-group">
              <Link to={`${appVersion}/config/0`} className="button secondary">
                Edit KintoBlocks & Services
              </Link>
              <Link
                to={`${appVersion}/config/0`}
                className="icon edit-blocks-and-services"
              />
            </div>
          </div>

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
