import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getClassNameForType } from '../../helpers/kintoBlocksHelper'
import { isProduction } from '../../helpers/pageHelper'
import KintoBlockVersionSelectorContainer from '../../containers/dashboard/ui/KintoBlockVersionSelectorContainer'
import { getPageUrl } from '../../helpers/urlHelper'
import { pages } from '../../constants/pages'
import {
  DEPENDENCY_MONGO,
  DEPENDENCY_BLOCK
} from '../../constants/dependenciesTypes'

class DependencyItem extends Component {
  static propTypes = {
    appVersion: PropTypes.string,
    index: PropTypes.number.isRequired,
    field: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    appDependenciesInfo: PropTypes.object.isRequired,
    data: PropTypes.object,
    disabled: PropTypes.bool,
    workspaceId: PropTypes.string
  }

  state = {
    isExpanded: false
  }

  onRemoveItem = () => {
    this.props.fields.remove(this.props.index)
  }

  toggleExpand = () => {
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded
    }))
  }

  dependencySelectFormat = item => {
    const block = this.props.appDependenciesInfo[this.props.data.blockId]
    if (!block) {
      throw new Error(
        'Dependency version formatter unable to access dependency info'
      )
    }
    return block.versions.findIndex(
      b => item.name === b.name && item.type === b.type
    )
  }

  dependencySelectParse = index => {
    const block = this.props.appDependenciesInfo[this.props.data.blockId]
    if (!block) {
      throw new Error(
        'Dependency version parser unable to access dependency info'
      )
    }
    const selectedVersion = block.versions[index]
    return {
      name: selectedVersion.name,
      type: selectedVersion.type
    }
  }

  render() {
    const {
      appVersion,
      field,
      data,
      workspaceId,
      appDependenciesInfo,
      disabled,
      isKintoBlock
    } = this.props
    const block = appDependenciesInfo[data.blockId]
    if (!block) {
      return null
    }
    const blockDependencies = block.dependencies.filter(
      d => d.type === DEPENDENCY_BLOCK
    )
    return (
      <div className="block">
        {!disabled ? (
          <a onClick={this.onRemoveItem} className="delete-block hide-text">
            delete
          </a>
        ) : null}
        <div className="icon-text-and-version">
          <div className={`main-icon ${getClassNameForType(block.type)}`} />
          <div className="text">
            <h3 className="name">{block.name}</h3>
            <h6 className="description">{block.description}</h6>
            <Link
              className="information-link-icon"
              to={getPageUrl(pages.dashboardDocumentation, {
                workspaceId,
                id: block.blockId,
                version: block.version.name,
                type: block.version.type
              })}
            />
          </div>
          <div className="version">
            <KintoBlockVersionSelectorContainer
              isKintoBlock={isKintoBlock}
              field={field}
              kintoBlock={block}
              isForm={true}
            />
            {appVersion &&
              !isProduction() && (
                <Link
                  className="pen-edit"
                  to={`${appVersion}/config/0?dependency=${data.dependencyId}`}
                />
              )}
          </div>
        </div>

        {blockDependencies.length ? (
          <div className="dependencies-exist">
            <div className="expand">
              <div className="icons">
                {blockDependencies
                  .slice(0, 4)
                  .map((dep, key) => (
                    <div
                      key={key}
                      className={`icon ${getClassNameForType(dep.type)}`}
                    />
                  ))}
                {blockDependencies.length > 4 && (
                  <div className="number">+{blockDependencies.length - 4}</div>
                )}
              </div>

              <div className="icons">
                {block.dependencies.filter(d => d.type === DEPENDENCY_MONGO)
                  .length ? (
                  <div className="mongo icon hide-text">mongo</div>
                ) : null}
              </div>
              <div
                className="expand-close-indicator"
                onClick={this.toggleExpand}
              >
                <h6>{this.state.isExpanded ? 'Collapse' : 'Expand'}</h6>
                <div
                  className={`expand-close ${
                    this.state.isExpanded ? 'expanded' : ''
                  }`}
                />
              </div>
            </div>

            {this.state.isExpanded && (
              <div className="extra-information">
                {blockDependencies.map((dep, key) => (
                  <div key={key} className="row">
                    <div className={`icon ${getClassNameForType(dep.type)}`} />
                    <div className="text">
                      <h3>{dep.name}</h3>
                      <h6>{dep.description}</h6>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    )
  }
}

export default DependencyItem
