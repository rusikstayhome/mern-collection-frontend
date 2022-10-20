import React from 'react'

import './Comments.css'

const Comments = () => {
  return (
    <>
      <div className='m-3'>
        <div>
          <h6 className='m-0'>Ruslan Orlov</h6>
          <p className='comments-date'>5 days ago</p>
        </div>
        <p className='comments-text'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit dolorem alias, soluta perspiciatis sapiente enim at illum non? Aliquam, voluptatem!
        </p>
        <hr />
      </div>
    </>
  )
}

export default Comments