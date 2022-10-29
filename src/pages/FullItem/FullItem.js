import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Container, Card, FloatingLabel, Button, Form } from "react-bootstrap";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import NoPhoto from '../../no-photo.jpg'

import axios from '../../axios'
import { fetchLikeItem } from "../../redux/slices/collections";

import Comments from "../../components/Comments/Comments";

import './FullItem.css'

const FullItem = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sending, setSending] = useState(false)
  const [authId, setAuthId] = useState(false);
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const { id } = useParams();
  const { itemId } = useParams()


  useEffect(() => {
    axios.get('auth/me').then(res => {
      const data = res.data.userData
      setAuthId(data._id)
    }
    ).catch(err => {
      console.warn(err);
    })
  }, [])

  const onClickLike = async () => {
    setSending(true)
    await axios.post(`/items/${itemId}`)
    setSending(false)
  }
  const onSubmitAddComment = async () => {
    setSending(true);
    const fields = {
      text: text
    }
    await axios.post(`/items/${itemId}/comments`, fields)
    setSending(false);
  }

  useEffect(() => {
    axios.get(`/collections/${id}/items/${itemId}`).then(res => {
      setData(res.data)
      setLikes(res.data.likes)
      setIsLoading(false)
      setComments(res.data.comments)
    }).catch(err => {
      console.warn(err);
      alert(`Error getting collection`)
    })
  }, [sending])

  console.log(comments)

  return (
    <Container>

      <Card className='mb-3 full-item__card' >
        <div>
          {!isLoading && <img src={data.imageUrl || NoPhoto} alt="item-img" className='full-item__img' />}
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
            <i className={`bi bi-heart-fill ${!isLoading && likes.includes(authId) ? 'liked' : ''}`}
              onClick={onClickLike}
            ></i>
            <span className='like-count'>{likes ? likes.length : '0'}</span>
          </div>
        </Card.Body>
        <hr />
        <h5 className='ms-3'>Comments:</h5>
        {comments.map((obj, index) =>
          <Comments
            key={index}
            text={obj.text}
            addedAt={obj.addedAt}
            user={obj.user}
            id={obj._id}
            itemId={itemId}
          />
        )}

        <Form className="comments-form" onSubmit={onSubmitAddComment}>
          <div className="comments-textarea">
            <FloatingLabel
              controlId="floatingTextarea"
              label="Comment"
              className="mb-3"
            >
              <Form.Control style={{ minHeight: '5rem' }} as="textarea" placeholder="Leave a comment here" className="w-100"
                onChange={(e) => setText(e.target.value)}
              />
            </FloatingLabel>
          </div>
          <div className='d-flex justify-content-end me-4 mb-2'>
            <Button variant="primary" className="px-5" type='submit'>Send</Button>
          </div>

        </Form>
      </Card >
    </Container>
  )
}

export default FullItem