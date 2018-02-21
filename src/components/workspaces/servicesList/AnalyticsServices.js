import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ServiceCard from './ServiceCard'
import { analyticsServices } from '../../../constants/serviceInfo'

class AnalyticsServices extends Component {
  static propTypes = {
    toggleService: PropTypes.func.isRequired,
    services: PropTypes.object.isRequired
  }

  state = {
    activeCard: ''
  }

  selectCard = type => {
    this.setState(state => {
      const selectedCard = state.activeCard === type ? '' : type
      return {
        activeCard: selectedCard
      }
    })
  }

  getServiceStatus = type => {
    return this.props.services[type] ? this.props.services[type].isActive : null
  }

  getServiceUrl = type => {
    return this.props.services[type] ? this.props.services[type].url : null
  }

  render() {
    const { kibana, prometheus, zipkin } = analyticsServices
    return (
      <div className="analytics-services">
        <h2>Analytics Services</h2>
        <div className="cards">
          <div onClick={() => this.selectCard(kibana.type)}>
            <ServiceCard
              title={kibana.title}
              description={kibana.description}
              type={kibana.type}
              isAnalytics={true}
              isActive={this.getServiceStatus(kibana.type)}
              isSelected={this.state.activeCard === kibana.type}
              serviceUrl={this.getServiceUrl(kibana.type)}
            />
          </div>
          <div onClick={() => this.selectCard(prometheus.type)}>
            <ServiceCard
              title={prometheus.title}
              description={prometheus.description}
              type={prometheus.type}
              isAnalytics={true}
              isActive={this.getServiceStatus(prometheus.type)}
              isSelected={this.state.activeCard === prometheus.type}
              serviceUrl={this.getServiceUrl(prometheus.type)}
            />
          </div>
          <div onClick={() => this.selectCard(zipkin.type)}>
            <ServiceCard
              title={zipkin.title}
              description={zipkin.description}
              type={zipkin.type}
              isAnalytics={true}
              isActive={this.getServiceStatus(zipkin.type)}
              isSelected={this.state.activeCard === zipkin.type}
              serviceUrl={this.getServiceUrl(zipkin.type)}
            />
          </div>
        </div>
        {this.state.activeCard === kibana.type && (
          <div className={`extended-information ${kibana.type}`}>
            <div className="information-area">
              <div className="main-image">
                <div className={`main-service-icon ${kibana.type}`} />
              </div>
              <div className="information-text">
                <h2>{kibana.title}</h2>
                <h5>{kibana.longDescription}</h5>
                <ul>
                  <li>
                    <h5>
                      I am thou, thou art I... Thou hast acquired a new vow.
                    </h5>
                  </li>
                  <li>
                    <h5>
                      It shall become the wings of rebellion that breaketh thy
                      chains of captivity.
                    </h5>
                  </li>
                  <li>
                    <h5>
                      With the birth of the Chariot Persona, I have obtained the
                      winds of blessing
                    </h5>
                  </li>
                  <li>
                    <h5>that shall lead to freedom and new power...</h5>
                  </li>
                </ul>
              </div>
            </div>
            <div className="action-area">
              {this.getServiceStatus(kibana.type) ? (
                <button
                  className="button destructive"
                  onClick={() =>
                    this.props.toggleService(
                      kibana.type,
                      !this.getServiceStatus(kibana.type)
                    )
                  }
                >
                  Disable This Service
                </button>
              ) : (
                <button
                  className="button default"
                  onClick={() =>
                    this.props.toggleService(
                      kibana.type,
                      !this.getServiceStatus(kibana.type)
                    )
                  }
                >
                  Enable This Service
                </button>
              )}
              <h5>
                This service is free to use during private alpha period. After
                that, a subscription or pay-as-you-go fee will be required. You
                will be notified before any charge is incurred.
              </h5>
            </div>
          </div>
        )}
        {this.state.activeCard === prometheus.type && (
          <div className={`extended-information ${prometheus.type}`}>
            <div className="information-area">
              <div className="main-image">
                <div className={`main-service-icon ${prometheus.type}`} />
              </div>
              <div className="information-text">
                <h2>{prometheus.title}</h2>
                <h5>{prometheus.longDescription}</h5>
                <ul>
                  <li>
                    <h5>
                      I am thou, thou art I... Thou hast acquired a new vow.
                    </h5>
                  </li>
                  <li>
                    <h5>
                      It shall become the wings of rebellion that breaketh thy
                      chains of captivity.
                    </h5>
                  </li>
                  <li>
                    <h5>
                      With the birth of the Chariot Persona, I have obtained the
                      winds of blessing
                    </h5>
                  </li>
                  <li>
                    <h5>that shall lead to freedom and new power...</h5>
                  </li>
                </ul>
              </div>
            </div>
            <div className="action-area">
              {this.getServiceStatus(prometheus.type) ? (
                <button
                  className="button destructive"
                  onClick={() =>
                    this.props.toggleService(
                      prometheus.type,
                      !this.getServiceStatus(prometheus.type)
                    )
                  }
                >
                  Disable This Service
                </button>
              ) : (
                <button
                  className="button default"
                  onClick={() =>
                    this.props.toggleService(
                      prometheus.type,
                      !this.getServiceStatus(prometheus.type)
                    )
                  }
                >
                  Enable This Service
                </button>
              )}
              <h5>
                This service is free to use during private alpha period. After
                that, a subscription or pay-as-you-go fee will be required. You
                will be notified before any charge is incurred.
              </h5>
            </div>
          </div>
        )}
        {this.state.activeCard === zipkin.type && (
          <div className={`extended-information ${zipkin.type}`}>
            <div className="information-area">
              <div className="main-image">
                <div className={`main-service-icon ${zipkin.type}`} />
              </div>
              <div className="information-text">
                <h2>{zipkin.title}</h2>
                <h5>{zipkin.longDescription}</h5>
                <ul>
                  <li>
                    <h5>
                      I am thou, thou art I... Thou hast acquired a new vow.
                    </h5>
                  </li>
                  <li>
                    <h5>
                      It shall become the wings of rebellion that breaketh thy
                      chains of captivity.
                    </h5>
                  </li>
                  <li>
                    <h5>
                      With the birth of the Chariot Persona, I have obtained the
                      winds of blessing
                    </h5>
                  </li>
                  <li>
                    <h5>that shall lead to freedom and new power...</h5>
                  </li>
                </ul>
              </div>
            </div>
            <div className="action-area">
              {this.getServiceStatus(zipkin.type) ? (
                <button
                  className="button destructive"
                  onClick={() =>
                    this.props.toggleService(
                      zipkin.type,
                      !this.getServiceStatus(zipkin.type)
                    )
                  }
                >
                  Disable This Service
                </button>
              ) : (
                <button
                  className="button default"
                  onClick={() =>
                    this.props.toggleService(
                      zipkin.type,
                      !this.getServiceStatus(zipkin.type)
                    )
                  }
                >
                  Enable This Service
                </button>
              )}

              <h5>
                This service is free to use during private alpha period. After
                that, a subscription or pay-as-you-go fee will be required. You
                will be notified before any charge is incurred.
              </h5>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnalyticsServices
