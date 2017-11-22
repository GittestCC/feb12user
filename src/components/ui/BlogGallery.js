import React from 'react'
import moment from 'moment'
import { posts } from '../../constants/blog'

const BlogGallery = () => (
  <div className="blog-gallery">
    {posts.map((post, key) => (
      <a href={post.url} target="_blank" rel="noopener noreferrer" key={key}>
        <div className="blog-card">
          <div className="title">
            <div className="vertical-line exec" />
            <h3>{post.title}</h3>
          </div>
          <div className="card-content">
            <div className="name-date-and-department">
              <div className="name">{post.author}</div>
              <div className="date">
                {moment(post.date).format('Do MMMM[,] YYYY')}
              </div>

              <div className="department exec">
                <h4>{post.department}</h4>
              </div>
            </div>
            <div className={`avatar ${post.avatarClass}`} />
          </div>
        </div>
      </a>
    ))}
  </div>
)

export default BlogGallery
