import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

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
    const navigateToCollectionEdit = () => {
        navigate(`/collections/${id}/edit`);
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
                        <i class="bi bi-pen-fill text-warning"
                            onClick={navigateToCollectionEdit}
                        ></i>
                    </div>
                }
            </Card.Header>
            <div>

                <img src={imageUrl || 'https://res-console.cloudinary.com/dczl7j0b7/thumbnails/v1/image/upload/v1666638070/Q09MTEVDVElPTlMvbm8tcGhvdG8tb3ItYmxhbmstaW1hZ2UtaWNvbi1sb2FkaW5nLWltYWdlcy1vci1taXNzaW5nLWltYWdlLW1hcmstaW1hZ2Utbm90LWF2YWlsYWJsZS1vci1pbWFnZS1jb21pbmctc29vbi1zaWduLXNpbXBsZS1uYXR1cmUtc2lsaG91ZXR0ZS1pbi1mcmFtZS1pc29sYXRlZC1pbGx1c3RyYXRpb24tdmVjdG9yX3F6aXcxcw==/preview'} alt="collection-img" className='collection-img' />

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