import React from 'react'
import LandingNavBar from '../ui/LandingNavBar'
import Footer from '../ui/Footer'
import StaffCard from './aboutUs/StaffCard'
import JobOpenings from './aboutUs/JobOpenings'
import Resources from './aboutUs/Resources'
import MeetTheRebels from './aboutUs/MeetTheRebels'
import TitleWithLines from '../ui/TitleWithLines'
import StaffData from '../../constants/staffData.json'

const AboutUs = () => (
  <div>
    <LandingNavBar />
    <MeetTheRebels />
    <div className="content about-us">
      <TitleWithLines text={StaffData.coFounders.title} />

      <div className="the-co-founders card-container two">
        {StaffData.coFounders.staff.map((staff, index) => (
          <StaffCard
            key={index}
            image={`${process.env.PUBLIC_URL}${staff.image}`}
            name={staff.name}
            title={staff.title}
            byline={staff.byline}
          />
        ))}
      </div>

      <TitleWithLines text={StaffData.team.title} />
      <div className="the-team card-container four">
        {StaffData.team.staff.map((staff, index) => (
          <StaffCard
            key={index}
            image={staff.image}
            name={staff.name}
            title={staff.title}
            byline={staff.byline}
          />
        ))}
      </div>
    </div>
    <JobOpenings />
    <Resources />
    <Footer className="bg-light-blue" />
  </div>
)

export default AboutUs
