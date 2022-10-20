import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap'

import axios from '../../axios'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './Item.css'

const Item = ({ isLoading = true, name, likes, parentCollection, tags, seeMore, id, userId }) => {
    const navigate = useNavigate()

    const [user, setUser] = useState('')

    const navigateToCollection = () => {
        navigate(`/collections/${parentCollection}`);
    }

    const navigateToItem = () => {
        navigate(`/collections/${parentCollection}/item/${id}`);
    }

    useEffect(() => {
        if (!isLoading) {
            axios.get(`/users/${userId}`).then(res => {
                setUser(res.data.user)
            }).catch(err => {
                console.warn(err);
                alert(`Error getting user`)
            })
        }
    }, [])

    return (
        <Card style={{ maxWidth: '20rem' }} className='mb-3 item-card' >
            <div>
                <img src="https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/94945631828bfdcf32a8ad0b79978913.png" alt="" className='item-img' />
            </div>
            <Card.Body>
                <Card.Title>{isLoading ? <Skeleton /> : name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted fs-6">{isLoading ? <Skeleton /> : user.username}</Card.Subtitle>
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
                    <span className='like-count'>{likes}</span>
                </div>
                {seeMore ?
                    <Button variant="info"
                        onClick={navigateToItem}
                    >{isLoading ? 'Loading...' : 'See more'}
                    </Button>
                    :
                    <Button variant="info"
                        onClick={navigateToCollection}
                    >{isLoading ? 'Loading...' : 'Go to collection'}</Button>
                }



            </Card.Body>
        </Card >
    )
}

export default Item