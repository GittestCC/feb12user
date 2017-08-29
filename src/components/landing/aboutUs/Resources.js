import React from 'react';
import ResourceCard from './resources/ResourceCard';
import TitleWithLines from '../../ui/TitleWithLines';

const Resources = () =>
  <div className="resources bg-light-blue">
    <div className="resources content">
      <TitleWithLines text="Resources" />
      <div className="cards">
        <ResourceCard
          type="news"
          icon={require('../../../images/icon-latest-news.svg')}
          title="Latest News"
          subtitle="View our company blog"
        />
        <ResourceCard
          type="press"
          icon={require('../../../images/icon-press-kit.svg')}
          title="Press Kit"
          subtitle="Download our brand assets"
        />
        <ResourceCard
          type="info"
          icon={require('../../../images/icon-company-info.svg')}
          title="Company Info"
          subtitle="Contact us for more info"
        />
      </div>
    </div>
  </div>

export default Resources;
