import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

import axios from '../../axios'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './Item.css'
import { selectIsAuth } from '../../redux/slices/auth';
import { fetchRemoveItem } from '../../redux/slices/collections'


const Item = ({ isLoading = true, name, likes, collectionId, tags, seeMore, id, userId, imageUrl }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    const [user, setUser] = useState('')

    const [authId, setAuthId] = useState(false);
    const [admin, setAdmin] = useState(false)

    const navigateToCollection = () => {
        navigate(`/collections/${collectionId}`);
    }

    const navigateToItem = () => {
        navigate(`/collections/${collectionId}/item/${id}`);
    }

    const onClickRemove = () => {
        if (window.confirm('Are you sure that you want to delete the item?')) {


            dispatch(fetchRemoveItem(id));
        }

    }

    console.log(collectionId, id)

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

    useEffect(() => {
        axios.get('auth/me').then(res => {
            const data = res.data.userData
            setAdmin(Boolean(data.roles.includes('admin')));
            setAuthId(data._id)
        }
        ).catch(err => {
            console.warn(err);
        })
    }, [isAuth])

    return (
        <Card style={{ maxWidth: '20rem' }} className='mb-3 item-card' >
            <div>
                {imageUrl &&
                    <img src={imageUrl} alt="" className='item-img' />
                }
            </div>
            <Card.Body>
                <Card.Title>{isLoading ? <Skeleton /> : name}
                    {(isAuth && (admin || userId === authId)) &&
                        <div className='collection-icons'>
                            <i class="bi bi-trash-fill me-2 text-danger"
                                onClick={onClickRemove}
                            ></i>
                            <i class="bi bi-pen-fill text-warning"></i>
                        </div>
                    }
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted fs-6">{isLoading ? <Skeleton /> : user.username}</Card.Subtitle>
                <Card.Text>
                    {isLoading ? <Skeleton count={1} /> : name}
                </Card.Text>
                <div className='item-tags'>
                    {!isLoading && tags.map((obj, index) => {
                        return <span key={index}> #{obj.trim()}</span>
                    })}
                </div>
                <div className='mb-2'>
                    <i className="bi bi-heart-fill"></i>
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