import React from 'react';
import NavBar from '../ui/NavBar';
import Footer from '../ui/Footer';
import ContactForm from './contactUs/ContactForm';
import LinkButton from './contactUs/LinkButton';

const ContactUs = () =>
  <div className="contact-us">
    <NavBar />

    <div className="content">
      <h1 className="center">Get in touch.</h1>
      <h3 className="center">Contact us for support and inquiries</h3>

      <div className="top-section">
        <div className="contact-form-wrapper">
          <ContactForm />
        </div>

        <div className="link-button-wrapper">
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
        </div>
      </div>
    </div>

    <div className="map content">
      <div className="map" />
    </div>

    <div className="content address">
      <h5 className="bold center">KintoHub Headquarters</h5>
      <h5 className="center">
        7/F, Yat Chau Building, 262 Des Voeux Road Central, Hong Kong
      </h5>
    </div>
    <Footer />
  </div>;

export default ContactUs;
