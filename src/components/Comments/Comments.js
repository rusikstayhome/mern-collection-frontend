import React from 'react'
import dateFormat from "dateformat";

import './Comments.css'

const Comments = ({ text, addedAt, user }) => {
  return (
    <>
      <div className='m-3'>
        <div>
          <h6 className='m-0'>{user.username || 'Anonim'}</h6>
          <p className='comments-date'>{dateFormat(addedAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</p>
        </div>
        <p className='comments-text'>
          {text}
        </p>
        <hr />
      </div>
    </>
  )
}

export default Comments