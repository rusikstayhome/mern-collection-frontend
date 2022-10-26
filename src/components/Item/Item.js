import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Button, Card, Modal } from 'react-bootstrap';

import axios from '../../axios'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AddItemModal from '../AddItemModal/AddItemModal';

import './Item.css'
import { selectIsAuth } from '../../redux/slices/auth';
import { fetchRemoveItem, fetchLikeItem, fetchItems } from '../../redux/slices/collections'


const Item = ({ isLoading = true, name, likes, collectionId, tags, seeMore, id, userId, imageUrl }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    const [user, setUser] = useState('')
    const [authId, setAuthId] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [show, setShow] = useState(false);

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

    const onClickLike = async () => {
        await axios.post(`/items/${id}`)
        dispatch(fetchItems())
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

        <>
            <Card style={{ maxWidth: '20rem' }} className='mb-3 item-card' >
                <div>

                    <img src={imageUrl || 'https://res-console.cloudinary.com/dczl7j0b7/thumbnails/v1/image/upload/v1666638070/Q09MTEVDVElPTlMvbm8tcGhvdG8tb3ItYmxhbmstaW1hZ2UtaWNvbi1sb2FkaW5nLWltYWdlcy1vci1taXNzaW5nLWltYWdlLW1hcmstaW1hZ2Utbm90LWF2YWlsYWJsZS1vci1pbWFnZS1jb21pbmctc29vbi1zaWduLXNpbXBsZS1uYXR1cmUtc2lsaG91ZXR0ZS1pbi1mcmFtZS1pc29sYXRlZC1pbGx1c3RyYXRpb24tdmVjdG9yX3F6aXcxcw==/preview'} alt="" className='item-img' />

                </div>
                <Card.Body>
                    <Card.Title>{isLoading ? <Skeleton /> : name}
                        {(isAuth && (admin || userId === authId)) &&
                            <div className='collection-icons'>
                                <i className="bi bi-trash-fill me-2 text-danger"
                                    onClick={onClickRemove}
                                ></i>
                                <i className="bi bi-pen-fill text-warning"
                                    onClick={() => setShow(true)}
                                ></i>
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
                        <i className={`bi bi-heart-fill ${likes && likes.includes(authId) ? 'liked' : ''}`}
                            onClick={onClickLike}
                        ></i>
                        <span className='like-count'>{likes ? likes.length : '0'}</span>

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
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="add-item__modal"
                aria-labelledby="example-custom-modal-styling-title"
            // collectionId={id}
            >
                <AddItemModal isLoading={isLoading} isEditing={true} itemId={id} />
            </Modal>
        </>
    )
}

export default Item