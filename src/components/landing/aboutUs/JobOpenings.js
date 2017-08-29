import React from 'react';
import TitleWithLines from '../../ui/TitleWithLines';

const JobOpenings = () =>
  <div className="job-openings bg-light-blue">
    <div className="content">
      <TitleWithLines text="Job Openings" />
    </div>
    <div className="job-announcements content">
      <h3>We’re always looking for talented people to join our team.</h3>
      <h4>
        <span>Contact us</span> with your details if you’re interested.
      </h4>
    </div>
  </div>;

export default JobOpenings;
