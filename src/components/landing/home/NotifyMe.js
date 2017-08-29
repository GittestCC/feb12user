import React from 'react';

const NotifyMe = () =>
  <div className="notify-form">
    <div className="names-field">
      <div className="name-field">
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="name" id="firstName" placeholder="Jonathon" />
      </div>
      <div className="name-field">
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="name" id="lastName" placeholder="Snow" />
      </div>
    </div>
    <div className="email-field">
      <label htmlFor="emailAddress">Email</label>
      <input
        type="email"
        name="name"
        id="emailAddress"
        placeholder="jonathon@thewall.com"
      />
    </div>
    <div className="button default">Notify Me</div>
    <h5 className="byline bold">
      We’ll send you cool updates and notify you when we offically launch.{' '}
    </h5>
    <h5 className="byline">
      Pinky promise there won’t be any spam. Unsubscribe at any time.
    </h5>
  </div>;

export default NotifyMe;
