import React, { useState } from 'react'
import dateFormat from "dateformat";
import { useSelector } from 'react-redux';

import axios from '../../axios'

import './Comments.css'

const Comments = ({ text, addedAt, user, id, itemId }) => {
  const { auth } = useSelector(state => state);

  const onClickRemove = () => {
    axios.delete(`/items/${itemId}/comments/${id}`)
  }

  return (
    <>
      <div className='m-3'>
        <div>
          {(user === auth.data?.userData?._id || auth.data?.userData?.roles.includes('admin'))
            ? <i className="bi bi-trash-fill me-2 text-danger comments-icon"
              onClick={() => onClickRemove()}
            ></i>
            : null}
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