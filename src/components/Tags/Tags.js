import React from 'react'

import './Tags.css'

const Tags = ({ isLoading, tags }) => {
    return (
        <div className='tags sticky'>
            <h4 className='px-3'>Tags:</h4>
            <ul className='tags-list'>
                {tags.map((obj, index) =>
                    <li key={index}># {obj}</li>
                )}
            </ul>
        </div>
    )
}

export default Tags