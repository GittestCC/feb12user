import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { isProduction } from '../../../../helpers/pageHelper'
import { getVersionAsText } from '../../../../helpers/versionHelper'
import DropDown from '../../../ui/DropDown'
import KintoAppTagItem from '../../ui/KintoAppTagItem'

class KintoAppCard extends Component {
  static propTypes = {
    kintoApp: PropTypes.object.isRequired,
    tagList: PropTypes.array.isRequired,
    envVersionsList: PropTypes.array.isRequired,
    dropdownId: PropTypes.string.isRequired,
    dropdownVersionId: PropTypes.string.isRequired,
    dropdownDependencyId: PropTypes.string.isRequired,
    goToDraft: PropTypes.func.isRequired,
    goToEnvironment: PropTypes.func.isRequired,
    goToDependencyManage: PropTypes.func.isRequired,
    kintoAppDependencies: PropTypes.array.isRequired
  }

  state = {
    isVerShown: false,
    areDependenciesShown: false
  }

  showVersionDropdown = () => {
    this.setState({ isVerShown: true })
  }

  hideVersionDropdown = () => {
    this.setState({ isVerShown: false })
  }

  showDependencyDropdown = e => {
    e.preventDefault()
    this.setState({ areDependenciesShown: true })
  }

  hideDependencyDropdown = () => {
    this.setState({ areDependenciesShown: false })
  }

  render() {
    const {
      kintoApp,
      tagList,
      envVersionsList,
      dropdownId,
      dropdownVersionId,
      dropdownDependencyId,
      goToDraft,
      goToDependencyManage,
      goToEnvironment,
      kintoAppDependencies,
      goToChangelog
    } = this.props
    return (
      <Link
        to={tagList[0].url}
        className="kintoapp coral"
        data-test={`ka-card-${dropdownId}`}
      >
        <div className="top">
          <div className="text">
            <div className="left">
              <img
                src={`/images/${kintoApp.iconImageName || 'app-icon-6.png'}`}
                alt=""
              />
            </div>
            <div className="right">
              {envVersionsList.slice(0, 2).map((env, key) => (
                <div className="env-item" key={key}>
                  <div className="env-item-ver">
                    {getVersionAsText(env.version)}
                  </div>
                  <div className="env-item-tag">
                    <div>{env.envName}</div>
                  </div>
                </div>
              ))}
              {envVersionsList.length > 2 ? (
                <div className="env-item">
                  <div className="env-item-ver">-</div>
                  <div className="env-item-tag">
                    <div>+{envVersionsList.length - 2}</div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="name-and-tag">
              <h3 className="name">{kintoApp.name}</h3>
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="icons">
            <div className="left">
              <DropDown
                type="dependencies"
                dropdownClass="dependencies"
                className="menu-hidden dependency-dropdown"
                id={dropdownDependencyId}
                isShown={this.state.areDependenciesShown}
                onHide={this.hideDependencyDropdown}
              >
                <h4 className="title">
                  Dependencies ({kintoApp.dependencies.length})
                </h4>

                <div className="line" />

                {kintoAppDependencies.map((k, index) => (
                  <button
                    onClick={() => goToDependencyManage(k.url)}
                    key={index}
                  >
                    <div
                      className={`dependency ${
                        k.type ? k.type.toLowerCase() : ''
                      }-dep`}
                    />
                    <h5>{k.name}</h5>
                  </button>
                ))}
              </DropDown>
              <div
                className="applications"
                onClick={this.showDependencyDropdown}
              >
                {kintoAppDependencies
                  .slice(0, 4)
                  .map((d, i) => (
                    <div
                      key={i}
                      className={`dependency ${
                        d.type ? d.type.toLowerCase() : ''
                      }-dep`}
                    />
                  ))}

                {kintoAppDependencies.length > 4 && (
                  <div className="dependency number">
                    +{kintoApp.dependencies.length - 4}
                  </div>
                )}
              </div>
            </div>

            <div className="right">
              <DropDown type="simple" dropdownClass="menu" id={dropdownId}>
                <button onClick={goToDraft}>
                  Edit Draft
                  <div className="draft-icon simple" />
                </button>

                <button onClick={this.showVersionDropdown}>
                  View All Tags
                </button>

                {!isProduction() ? (
                  <button onClick={goToChangelog}>Compare Versions</button>
                ) : null}

                <div className="dropdown line" />
                <button onClick={goToEnvironment}>View Environments</button>
              </DropDown>
              <DropDown
                id={dropdownVersionId}
                type="filter"
                className="menu-hidden"
                isShown={this.state.isVerShown}
                onHide={this.hideVersionDropdown}
                list={tagList}
                component={KintoAppTagItem}
                filterField="text"
                hideAction={true}
              />
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default KintoAppCard
