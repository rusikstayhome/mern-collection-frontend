import React from 'react'

import './Tags.css'

const Tags = ({ isLoading, tags }) => {
    const makeUniq = (arr) => {
        const uniqSet = new Set(arr);
        return [...uniqSet];
    }

    return (

        <div className='tags sticky' >
            <h4 className='px-3'>Tags:</h4>
            <ul className='tags-list'>
                {makeUniq(tags).map((obj, index) =>
                    <li key={index}># {obj}</li>
                )}
            </ul>
        </div >
    )
}

export default Tags