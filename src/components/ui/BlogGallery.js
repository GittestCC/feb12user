import React from 'react'
import moment from 'moment'

const BlogGallery = () => (
  <div className="blog-gallery">
    <a
      href="https://blog.kintohub.com/become-a-fan-of-the-people-you-hire-6aee7314fde5"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="blog-card">
        <div className="title">
          <div className="vertical-line exec" />
          <h3>Become a FAN of the people you hire - KintoHub</h3>
        </div>
        <div className="card-content">
          <div className="name-date-and-department">
            <div className="name">Joseph Cooper</div>
            <div className="date">
              {moment(new Date()).format('Do MMMM[,] YYYY')}
            </div>

            <div className="department exec">
              <h4>Executive Team</h4>
            </div>
          </div>
          <div className="avatar joseph" />
        </div>
      </div>
    </a>

    {/* <div className="blog-card">
      <div className="title">
        <div className="vertical-line design" />
        <h3>Laying the Groundwork for a Robust Service</h3>
      </div>
      <div className="card-content">
        <div className="name-date-and-department">
      <div className="name">Raven Yu</div>
      <div className="date">
      {moment(new Date()).format('Do MMMM[,] YYYY')}
      </div>
      <div className="department design">
      <h4>Design</h4>
      </div>
        </div>
        <div className="avatar raven" />
      </div>
      </div>

      <div className="blog-card">
      <div className="title">
        <div className="vertical-line exec" />
        <h3>Laying the Groundwork for a Robust Service</h3>
      </div>
      <div className="card-content">
        <div className="name-date-and-department">
      <div className="name">Francois Courtin</div>
      <div className="date">
      {moment(new Date()).format('Do MMMM[,] YYYY')}
      </div>

      <div className="department exec">
      <h4>Executive Team</h4>
      </div>
        </div>
        <div className="avatar francois" />
      </div>
      </div>

      <div className="blog-card">
      <div className="title">
        <div className="vertical-line development" />
        <h3>Laying the Groundwork for a Robust Service</h3>
      </div>
      <div className="card-content">
        <div className="name-date-and-department">
      <div className="name">Nadeem Khedr</div>
      <div className="date">
      {moment(new Date()).format('Do MMMM[,] YYYY')}
      </div>

      <div className="department development">
      <h4>Development</h4>
      </div>
        </div>
        <div className="avatar nadeem" />
      </div>
    </div> */}
  </div>
)

export default BlogGallery
