import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import jwt_decode from "jwt-decode";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import axios from '../../axios';
import { fetchRemoveCollection } from '../../redux/slices/collections'

import './Collection.css'
import { selectIsAuth } from '../../redux/slices/auth';

function Collection({
    isLoading = true,
    id,
    title,
    description,
    topic,
    updatedAt,
    imageUrl,
    username,
    userId
}) {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    const [authId, setAuthId] = useState(false);
    const [admin, setAdmin] = useState(false)

    const navigate = useNavigate()
    const navigateToCollection = () => {
        navigate(`/collections/${id}`);
    }

    const onClickRemove = () => {
        if (window.confirm('Are you sure that you want to delete the collection?')) {
            dispatch(fetchRemoveCollection(id));
        }

    }

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
        <Card className="text-center mb-3 collection-card" style={{ maxWidth: '40rem' }} >
            <Card.Header>{isLoading ? <Skeleton /> : title}
                {(isAuth && (admin || userId === authId)) &&
                    <div className='collection-icons'>
                        <i class="bi bi-trash-fill me-2 text-danger"
                            onClick={onClickRemove}
                        ></i>
                        <i class="bi bi-pen-fill text-warning"></i>
                    </div>
                }
            </Card.Header>
            <div>
                {imageUrl &&
                    <img src={imageUrl} alt="" className='collection-img' />
                }
            </div>
            <Card.Body>
                <Card.Title>{isLoading ? <Skeleton /> : topic}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{isLoading ? <Skeleton /> : username}</Card.Subtitle>
                <Card.Text>
                    {isLoading ? <Skeleton count={4} /> : description}
                </Card.Text>
                <Button variant="info"
                    onClick={navigateToCollection}
                >Go to collection</Button>
            </Card.Body>
            <Card.Footer className="text-muted">{isLoading ? <Skeleton /> : updatedAt}</Card.Footer>
        </Card >
    );
}

export default Collection;