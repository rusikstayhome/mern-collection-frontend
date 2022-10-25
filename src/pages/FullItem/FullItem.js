import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'


import { Container, Card, FloatingLabel, Button, Form } from "react-bootstrap";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import axios from '../../axios'

import Comments from "../../components/Comments/Comments";

import './FullItem.css'

const FullItem = () => {

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { itemId } = useParams()


  useEffect(() => {
    axios.get(`/collections/${id}/items/${itemId}`).then(res => {
      setData(res.data)
      setIsLoading(false)
    }).catch(err => {
      console.warn(err);
      alert(`Error getting collection`)
    })
  }, [])


  return (
    <Container>

      <Card className='mb-3 full-item__card' >
        <div>
          {!isLoading && <img src={data.imageUrl || 'https://res-console.cloudinary.com/dczl7j0b7/thumbnails/v1/image/upload/v1666638070/Q09MTEVDVElPTlMvbm8tcGhvdG8tb3ItYmxhbmstaW1hZ2UtaWNvbi1sb2FkaW5nLWltYWdlcy1vci1taXNzaW5nLWltYWdlLW1hcmstaW1hZ2Utbm90LWF2YWlsYWJsZS1vci1pbWFnZS1jb21pbmctc29vbi1zaWduLXNpbXBsZS1uYXR1cmUtc2lsaG91ZXR0ZS1pbi1mcmFtZS1pc29sYXRlZC1pbGx1c3RyYXRpb24tdmVjdG9yX3F6aXcxcw==/preview'} alt="item-img" className='full-item__img' />}
        </div>
        <Card.Body>
          <Card.Title className="text-center">{isLoading ? <Skeleton /> : data.name}</Card.Title>
          <Card.Text>
            {isLoading ? <Skeleton count={1} /> : data.name}
          </Card.Text>
          <div className='item-tags'>
            {!isLoading && data.tags.map((obj, index) => {
              return <span key={index}> #{obj.trim()}</span>
            })}
          </div>
          <div className='mb-2'>
            <i className="bi bi-heart-fill"></i>
            <span className='like-count'>18</span>
          </div>
        </Card.Body>
        <hr />
        <h5 className='ms-3'>Comments:</h5>
        <Comments />
        <Comments />
        <Form className="comments-form">
          <div className="comments-textarea">
            <FloatingLabel
              controlId="floatingTextarea"
              label="Comment"
              className="mb-3"
            >
              <Form.Control style={{ minHeight: '5rem' }} as="textarea" placeholder="Leave a comment here" className="w-100" />
            </FloatingLabel>
          </div>
          <div className='d-flex justify-content-end me-4 mb-2'>
            <Button variant="primary" className="px-5">Send</Button>
          </div>

        </Form>
      </Card >
    </Container>
  )
}

export default FullItem