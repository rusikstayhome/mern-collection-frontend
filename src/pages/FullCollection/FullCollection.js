import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'


import { Button, Container, Card } from 'react-bootstrap'

import axios from '../../axios'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './FullCollection.css'

function FullCollection() {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();


    useEffect(() => {
        axios.get(`/collections/${id}`).then(res => {
            setData(res.data)
            setIsLoading(false)
        }).catch(err => {
            console.warn(err);
            alert(`Ошибка при получении статьи`)
        })
    }, [])


    return (
        <Container>
            <Card className="text-center mb-3 collection-card" >
                <Card.Header>{isLoading ? <Skeleton /> : data.title}</Card.Header>
                {!isLoading ?
                    <div>
                        <img src={data.imageUrl ? data.imageUrl : ''}
                            className='collection-img'
                            alt="" />
                    </div> : ''
                }
                <Card.Body>
                    <Card.Title>{isLoading ? <Skeleton /> : data.topic}</Card.Title>
                    <Card.Text>
                        {isLoading ? <Skeleton count={4} /> : data.description}
                    </Card.Text>
                    <Button variant="info"
                    >Go to collection</Button>
                </Card.Body>
                <Card.Footer className="text-muted">{isLoading ? <Skeleton /> : data.updatedAt}</Card.Footer>
            </Card >
        </Container >
    );
}

export default FullCollection;