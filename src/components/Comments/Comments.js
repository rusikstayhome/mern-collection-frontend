import React, { useState } from 'react'
import dateFormat from "dateformat";

import axios from '../../axios'

import './Comments.css'

const Comments = ({ text, addedAt, user, id, itemId }) => {

  const [deleting, setDeleting] = useState(false)

  const onClickRemove = () => {
    axios.delete(`/items/${itemId}/comments/${id}`)
  }

  return (
    <>
      <div className='m-3'>
        <div>
          <i className="bi bi-trash-fill me-2 text-danger comments-icon"
            onClick={() => onClickRemove()}
          ></i>
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