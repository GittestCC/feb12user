import React from 'react'
import ResourceCard from './resources/ResourceCard'
import TitleWithLines from '../../ui/TitleWithLines'

const Resources = () => (
  <div className="resources bg-light-blue">
    <div className="resources content">
      <TitleWithLines text="Resources" />
      <div className="cards">
        <ResourceCard
          download="false"
          externalLink={'https://medium.com/kintohub'}
          type="news"
          icon={require('../../../images/icon-latest-news.svg')}
          title="Latest News"
          subtitle="View our company blog"
        />
        <ResourceCard
          download="true"
          externalLink="/downloads/Press Kit.zip"
          type="press"
          icon={require('../../../images/icon-press-kit.svg')}
          title="Press Kit"
          subtitle="Download our brand assets"
        />
        <ResourceCard
          download="false"
          internalLink="/contact-us"
          type="info"
          icon={require('../../../images/icon-company-info.svg')}
          title="Company Info"
          subtitle="Questions? Cookies? Get in touch"
        />
      </div>
    </div>
  </div>
)

export default Resources
