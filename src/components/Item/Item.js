import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card, NavItem } from 'react-bootstrap'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './Item.css'

const Item = ({ isLoading = true, name, likes, parentCollection, tags }) => {
    const navigate = useNavigate()
    const navigateToCollection = () => {
        navigate(`/collections/${parentCollection}`);
    }


    return (
        <Card style={{ maxWidth: '20rem' }} className='mb-3 item-card'>
            <div>
                <img src="https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/94945631828bfdcf32a8ad0b79978913.png" alt="" className='item-img' />
            </div>
            <Card.Body>
                <Card.Title>{isLoading ? <Skeleton /> : name}</Card.Title>
                <Card.Text>
                    {isLoading ? <Skeleton count={1} /> : name}
                </Card.Text>
                <div className='item-tags'>
                    {!isLoading && tags.map(obj => {
                        return <span> #{obj.trim()}</span>
                    })}
                </div>
                <div className='mb-2'>
                    <i class="bi bi-heart-fill"></i>
                    <span className='like-count'>18</span>
                </div>
                <Button variant="info"
                    onClick={navigateToCollection}
                >Go to collection</Button>

            </Card.Body>
        </Card >
    )
}

export default Item