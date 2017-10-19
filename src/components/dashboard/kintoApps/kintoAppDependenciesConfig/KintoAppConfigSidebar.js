import React, { Component } from 'react'
import iscroll from 'iscroll'
import IScroll from 'react-iscroll'
import SearchInput from '../../../forms/SearchInput'
import { getClassNameForType } from '../../../../helpers/kintoBlocksHelper'
import { getVersionAsText } from '../../../../helpers/versionHelper'

class KintoAppConfigSidebar extends Component {
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
                      <a className="item">
                        <div
                          className={`main-icon ${getClassNameForType(
                            item.type
                          )}`}
                        />
                        <div className="text">
                          <div className="name">{item.name}</div>
                          <div className="version">
                            {getVersionAsText(item.version)}
                          </div>
                        </div>
                      </a>
                      <ul>
                        {item.dependencies &&
                          item.dependencies.map((d, index) => (
                            <li key={index}>
                              <a className="item">
                                <div
                                  className={`main-icon ${getClassNameForType(
                                    d.type
                                  )}`}
                                />
                                <div className="text">
                                  <div className="name">{d.name}</div>
                                  <div className="version">
                                    {getVersionAsText(d.version)}
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
