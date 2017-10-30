import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Field } from 'redux-form'
import {
  asTextList,
  getVersionAsText,
  textToObject
} from '../../helpers/versionHelper'
import { getClassNameForType } from '../../helpers/kintoBlocksHelper'

class DependencyItem extends Component {
  static propTypes = {
    appVersion: PropTypes.string,
    index: PropTypes.number.isRequired,
    field: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    appDependenciesInfo: PropTypes.object.isRequired,
    data: PropTypes.object
  }

  onRemoveItem = () => {
    this.props.fields.remove(this.props.index)
  }

  render() {
    const { appVersion, field, data, appDependenciesInfo } = this.props
    const block = appDependenciesInfo[data.blockId]
    if (!block) {
      return null
    }
    return (
      <div className="block">
        <a onClick={this.onRemoveItem} className="delete-block hide-text">
          delete
        </a>
        <div className="icon-text-and-version">
          <div className={`main-icon ${getClassNameForType(block.type)}`} />
          <div className="text">
            <h3 className="name">{block.name}</h3>
            <h6 className="description">{block.description}</h6>
          </div>
          <div className="version">
            <Field
              name={`${field}.version`}
              component="select"
              parse={textToObject}
              format={getVersionAsText}
            >
              {asTextList(block.versions).map((v, index) => (
                <option key={index} value={v}>
                  {v}
                </option>
              ))}
            </Field>
            {appVersion && (
              <Link className="pen-edit" to={`${appVersion}/config/0`} />
            )}
          </div>
        </div>

        {block.dependencies.length ? (
          <div className="dependencies-exist">
            <div className="expand">
              <div className="icons">
                {block.dependencies
                  .slice(0, 4)
                  .map((dep, key) => (
                    <div
                      key={key}
                      className={`icon ${getClassNameForType(dep.type)}`}
                    />
                  ))}
                {block.dependencies.length > 4 && (
                  <div className="number">+{block.dependencies.length - 4}</div>
                )}
              </div>
              <div className="expand-close-indicator">
                <h6>Expand</h6>
                <div className="expand-close" />
              </div>
            </div>
            <div className="extra-information">
              {block.dependencies.map((dep, key) => (
                <div key={key} className="row">
                  <div className={`icon ${getClassNameForType(dep.type)}`} />
                  <div className="text">
                    <h3>{dep.name}</h3>
                    <h6>{dep.description}</h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default DependencyItem
