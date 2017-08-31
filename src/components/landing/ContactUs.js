import React from 'react'
import NavBar from '../ui/NavBar'
import Footer from '../ui/Footer'
import LinkButton from './contactUs/LinkButton'

const ContactUs = () => (
  <div className="contact-us">
    <NavBar />

    <div className="content smaller-tablet">
      <h1 className="center">Get in touch.</h1>
      <h3 className="center">
        Want to know more about the upcoming microservice revolution? Drop us a
        line.
      </h3>
      <h3 className="center">
        <b>support@kintohub.com</b>
      </h3>

      <div className="top-section">
        {/* TODO add when contact form is working
          <div className="contact-form-wrapper">
            <ContactForm />
          </div>
        */}

        {/* <div className="link-button-wrapper">
          <LinkButton
            link="https://www.google.com"
            title="FAQs"
            subtitle="Find answers for questions"
            color="kinto-purple"
            icon="faqs"
          />
          <LinkButton
            link="https://www.google.com"
            title="Slack Community"
            subtitle="Get help from developers"
            color="kinto-blue"
            icon="slack"
          />
          <LinkButton
            link="https://www.google.com"
            title="Press Kit"
            subtitle="Download our brand assets"
            color="kinto-green"
            icon="press"
          />
        </div> */}
      </div>
    </div>

    <div className="map content">
      <div className="map" />
    </div>

    <div className="content address smaller-tablet">
      <h5 className="bold center">KintoHub Headquarters</h5>
      <h5 className="center">
        7/F, Yat Chau Building, 262 Des Voeux Road Central, Hong Kong
      </h5>
    </div>
    <Footer />
  </div>
)

export default ContactUs
