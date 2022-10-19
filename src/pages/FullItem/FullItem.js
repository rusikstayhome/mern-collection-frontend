import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Container, Card } from "react-bootstrap";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import axios from '../../axios'

import Item from "../../components/Item/Item";

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

      <Card style={{ maxWidth: '60rem' }} className='mb-3 full-item__card' >
        <div>
          <img src="https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/94945631828bfdcf32a8ad0b79978913.png" alt="" className='full-item__img' />
        </div>
        <Card.Body>
          <Card.Title>{isLoading ? <Skeleton /> : data.name}</Card.Title>
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
      </Card >



    </Container>
  )
}

export default FullItem