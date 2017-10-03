import React, { Component } from 'react'
import { Field } from 'redux-form'
import {
  asTextList,
  getVersionAsText,
  textToObject
} from '../../helpers/versionHelper'
import { getClassNameForType } from '../../helpers/kintoBlocksHelper'

class DependencyItem extends Component {
  render() {
    const { field, data, appDependenciesInfo } = this.props
    const block = appDependenciesInfo[data.id]
    return (
      <div className="block">
        <div className="delete-block" />
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
