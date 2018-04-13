import React, { Component } from 'react'
import Tooltip from 'rc-tooltip'
import iscroll from 'iscroll'
import ReactIScroll from 'react-iscroll'
import PropTypes from 'prop-types'

import ResponseCodeRow from './responseCodes/ResponseCodeRow'
import isEmpty from 'lodash/isEmpty'
import CollapsibleHeader from './CollapsibleHeader'
import DocumentationDisplay from '../../../components/dashboard/documentation/DocumentationDisplay'
import EndpointExamples from '../../../components/dashboard/documentation/EndpointExamples'

class KintoBlockEndpointDetails extends Component {
  static propTypes = {
    selectedEndpoint: PropTypes.object.isRequired,
    fetchKintoBlockDocumentationEndpoint: PropTypes.func.isRequired
  }

  state = {
    selectedTab: 'restful'
  }

  componentDidMount() {
    this.props.fetchKintoBlockDocumentationEndpoint(this.props.endpointId)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.endpointId !== nextProps.endpointId) {
      this.props.fetchKintoBlockDocumentationEndpoint(nextProps.endpointId)
    }
  }

  refreshScroll = () => {
    this.scrollArea.refresh()
  }

  render() {
    const { selectedEndpoint } = this.props
    if (!selectedEndpoint.id) return null

    const protocols = {
      restful: 'restful',
      grpc: 'GRPC',
      graphql: 'GRAPHQL'
    }

    const {
      headers = {},
      params = {},
      success = [],
      error = []
    } = selectedEndpoint
    return (
      <div className="endpoint-details-scroll">
        <ReactIScroll
          iScroll={iscroll}
          ref={iscroll => (this.scrollArea = iscroll)}
          options={{
            scrollbars: true,
            fadeScrollbars: true,
            shrinkScrollbars: 'scale',
            interactiveScrollbars: true,
            mouseWheel: true,
            disableMouse: true,
            disablePointer: true
          }}
        >
          <div className="endpoint-details">
            <div>
              <div className="top">
                <div className="endpoint-name">
                  <span className={`type ${selectedEndpoint.type}`}>
                    {selectedEndpoint.type}
                  </span>
                  <span className="code">{selectedEndpoint.url}</span>
                </div>
                <p>{selectedEndpoint.title}</p>
              </div>
              <div className="bottom">
                {!isEmpty(headers.session) && (
                  <CollapsibleHeader
                    refreshScroll={this.refreshScroll}
                    title="Required Session Data"
                  >
                    <DocumentationDisplay
                      response={headers.session}
                      showTitle={false}
                    />
                  </CollapsibleHeader>
                )}
                {!isEmpty(headers.exposedSession) && (
                  <CollapsibleHeader
                    refreshScroll={this.refreshScroll}
                    title="Exposed Session Data"
                  >
                    <DocumentationDisplay
                      response={headers.exposedSession}
                      showTitle={false}
                    />
                  </CollapsibleHeader>
                )}
                {!isEmpty(headers.header) && (
                  <CollapsibleHeader
                    refreshScroll={this.refreshScroll}
                    title="Headers"
                  >
                    <DocumentationDisplay
                      response={headers.header}
                      showTitle={false}
                    />
                  </CollapsibleHeader>
                )}
                {success.length || error.length ? (
                  <div>
                    <h3>
                      Response Code
                      <Tooltip
                        placement="top"
                        overlay="I dont know what these tool tips are supposed to say"
                        trigger="click"
                      >
                        <span className="tooltip" />
                      </Tooltip>
                    </h3>
                  </div>
                ) : null}
                {success.map((x, i) => (
                  <ResponseCodeRow
                    refreshScroll={this.refreshScroll}
                    response={x}
                    key={i}
                    index={i}
                  />
                ))}
                {error.map((x, i) => (
                  <ResponseCodeRow
                    refreshScroll={this.refreshScroll}
                    response={x}
                    key={i}
                    index={i}
                  />
                ))}

                {/* TAB SECTION */}

                <div className="documentation-tabs">
                  <button
                    type="button"
                    className={`tab GRPC ${
                      this.state.selectedTab === protocols.grpc ? 'active' : ''
                    }`}
                    // onClick={() => this.selectTab(protocols.grpc)} TODO: temporarily disabled
                  >
                    <h5>gRPC</h5>
                  </button>
                  <button
                    type="button"
                    className={`tab GRAPHQL ${
                      this.state.selectedTab === protocols.graphql
                        ? 'active'
                        : ''
                    }`}
                    // onClick={() => this.selectTab(protocols.graphql)} TODO: temporarily disabled
                  >
                    <h5>GraphQL</h5>
                  </button>
                  <button
                    type="button"
                    className={`tab restful ${
                      this.state.selectedTab === protocols.restful
                        ? 'active'
                        : ''
                    }`}
                    // onClick={() => this.selectTab(protocols.restful)}
                  >
                    <h5>Restful</h5>
                  </button>
                </div>
              </div>

              {/* RESTFUL TAB SECTION */}

              {this.state.selectedTab === protocols.restful && (
                <div>
                  <div className={`more-details ${this.state.selectedTab}`}>
                    <div>
                      <EndpointExamples
                        title="Endpoint Definition"
                        text={selectedEndpoint.url}
                        type={selectedEndpoint.type}
                        tooltipText="this is some tooltip text"
                        isDefinition={true}
                      />
                      <EndpointExamples
                        title="Request Example"
                        text={selectedEndpoint.title}
                        tooltipText="this is some tooltip text"
                        isDefinition={false}
                      />
                      <EndpointExamples
                        title="Response Body"
                        text={selectedEndpoint.title}
                        tooltipText="this is some tooltip text"
                        isDefinition={false}
                      />
                    </div>
                  </div>
                  <div className="more-details darker">
                    {!isEmpty(params.body) && (
                      <div className="parameter-section">
                        <h3>
                          Request Parameters
                          <Tooltip
                            placement="top"
                            overlay="I dont know what these tool tips are supposed to say"
                            trigger="click"
                          >
                            <span className="tooltip" />
                          </Tooltip>
                        </h3>
                        <DocumentationDisplay
                          response={params.body}
                          showTitle={false}
                        />
                      </div>
                    )}
                    {!isEmpty(params.url) && (
                      <div className="parameter-section">
                        <h3>
                          URL Parameters
                          <Tooltip
                            placement="top"
                            overlay="I dont know what these tool tips are supposed to say"
                            trigger="click"
                          >
                            <span className="tooltip" />
                          </Tooltip>
                        </h3>
                        <DocumentationDisplay
                          response={params.url}
                          showTitle={false}
                        />
                      </div>
                    )}
                    {!isEmpty(params.query) && (
                      <div className="parameter-section">
                        <h3>
                          Query Parameters
                          <Tooltip
                            placement="top"
                            overlay="I dont know what these tool tips are supposed to say"
                            trigger="click"
                          >
                            <span className="tooltip" />
                          </Tooltip>
                        </h3>
                        <DocumentationDisplay
                          response={params.query}
                          showTitle={false}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* GRPC AND GRAPHQL SECTION */}

              {this.state.selectedTab === protocols.grpc ||
              this.state.selectedTab === protocols.graphql ? (
                <div className={`more-details ${this.state.selectedTab}`}>
                  <h3>
                    {this.state.selectedTab === protocols.grpc
                      ? 'Proto File'
                      : 'Schema'}
                  </h3>
                  <div className="message-box">
                    <div className="code">
                      {selectedEndpoint.protocol
                        ? selectedEndpoint.protocol.message
                        : ''}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </ReactIScroll>
      </div>
    )
  }
}

export default KintoBlockEndpointDetails
