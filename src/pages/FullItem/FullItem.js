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

  console.log(data)

  return (
    <Container>

      <Card className='mb-3 full-item__card' >
        <div>
          <img src="https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/94945631828bfdcf32a8ad0b79978913.png" alt="" className='full-item__img' />
        </div>
        <Card.Body>
          <Card.Title className="text-center">{isLoading ? <Skeleton /> : data.name}</Card.Title>
          <Card.Text>
            {isLoading ? <Skeleton count={1} /> : data.name}
          </Card.Text>
          <div className='item-tags'>
            {!isLoading && data.tags.map(obj => {
              return <span> #{obj.trim()}</span>
            })}
          </div>
          <div className='mb-2'>
            <i class="bi bi-heart-fill"></i>
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