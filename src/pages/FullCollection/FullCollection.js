import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'


import { Button, Container, Card, Row, Col } from 'react-bootstrap'

import axios from '../../axios'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Item from "../../components/Item/Item";

import './FullCollection.css'

function FullCollection() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const [hide, setHide] = useState(false)


  useEffect(() => {
    axios.get(`/collections/${id}`).then(res => {
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
      <Card className="text-center mb-3 collection-card" >
        <Card.Header onClick={() => setHide(!hide)}>{isLoading ? <Skeleton /> : data.title}
          <span className="hide-icon"
          >
            {hide ?
              <i className="bi bi-plus-circle"
              ></i>
              :
              <i className="bi bi-dash-circle"
              ></i>
            }
          </span>
        </Card.Header>
        {!isLoading ?
          <div>
            <img src={data.imageUrl ? data.imageUrl : ''}
              className='collection-img'
              alt="" />
          </div> : ''
        }
        {!hide &&
          <>
            <Card.Body>
              <Card.Title>{isLoading ? <Skeleton /> : data.topic}</Card.Title>
              <Card.Text>
                {isLoading ? <Skeleton count={4} /> : data.description}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">{isLoading ? <Skeleton /> : data.updatedAt}</Card.Footer>
          </>
        }
      </Card >
      <Row>
        <Col className='add-button-wrapper'>
          <Button variant="outline-success" className='add-button mb-3'>Add Item</Button>
        </Col>
      </Row>
      <Row>
        {(isLoading ?
          [...Array(4)]
          :
          data.items).map((obj, index) =>
            isLoading ?
              <Item key={index} />
              :
              (
                <Col className='col-md-4 col-sm-6'>
                  <Item
                    key={index}
                    isLoading={isLoading}
                    id={obj._id}
                    name={obj.name}
                    likes={obj.likes}
                    parentCollection={obj.parentCollection}
                    tags={obj.tags}
                    seeMore={true}
                  />
                </Col>
              )
          )}
      </Row>
    </Container >
  );
}

export default FullCollection;