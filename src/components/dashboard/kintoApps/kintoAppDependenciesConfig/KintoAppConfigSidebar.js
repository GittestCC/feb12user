import React, { Component } from 'react'
import PropTypes from 'prop-types'
import iscroll from 'iscroll'
import IScroll from 'react-iscroll'
import SearchInput from '../../../forms/SearchInput'
import { getClassNameForType } from '../../../../helpers/kintoBlocksHelper'

class KintoAppConfigSidebar extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    filter: PropTypes.string,
    onScrollToItem: PropTypes.func.isRequired
  }

  onScrollToItem = dependencyId => {
    this.props.onScrollToItem(dependencyId)
  }

  onChangeFilter = e => {
    this.props.onUpdateFilter(e.target.value)
  }

  render() {
    const { list, filter } = this.props
    return (
      <div>
        <SearchInput
          placeholder="Search KintoBlocks & services..."
          className="white"
          value={filter}
          onChange={this.onChangeFilter}
        />
        <div className="ka-config-scroll-container">
          <IScroll
            iScroll={iscroll}
            options={{
              scrollbars: true,
              mouseWheel: true,
              fadeScrollbars: true,
              shrinkScrollbars: 'scale',
              interactiveScrollbars: true
            }}
          >
            <div className="ka-config-blocks-list">
              <ul>
                {list &&
                  list.map((item, index) => (
                    <li className="parent" key={index}>
                      <a
                        onClick={() => this.onScrollToItem(item.dependencyId)}
                        className={`item ${item.active ? 'active' : ''}`}
                      >
                        <div
                          className={`main-icon ${getClassNameForType(
                            item.type
                          )}`}
                        />
                        <div className="text">
                          <div className="name">{item.name}</div>
                          <div className="version">{item.version.name}</div>
                        </div>
                      </a>
                      <ul>
                        {item.dependencies &&
                          item.dependencies.map((d, index) => (
                            <li key={index}>
                              <a
                                onClick={() =>
                                  this.onScrollToItem(d.dependencyId)
                                }
                                className={`item ${d.active ? 'active' : ''}`}
                              >
                                <div
                                  className={`main-icon ${getClassNameForType(
                                    d.type
                                  )}`}
                                />
                                <div className="text">
                                  <div className="name">{d.name}</div>
                                  <div className="version">
                                    {d.version.name}
                                  </div>
                                </div>
                              </a>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
              </ul>
            </div>
          </IScroll>
        </div>
      </div>
    )
  }
}

export default KintoAppConfigSidebar
