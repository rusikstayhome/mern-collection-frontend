import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import axios from '../../axios'

import Item from '../../components/Item/Item'
import Tags from '../../components/Tags/Tags'
import Collection from '../../components/Collection/Collection'

import './Home.css'

const Home = () => {
  useEffect(() => {
    axios.get('/collections')
  }, []);



  const [showItems, setShowItems] = useState(true);



  return (
    <Container>
      <div className="home mb-4">
        <span onClick={() => setShowItems(true)} className={showItems && 'active'}>Last Items</span>
        <span onClick={() => setShowItems(false)} className={!showItems && 'active'}>Top Collections</span>
      </div>
      <Row>
        <Col sm={8}>
          {showItems ? (
            <Row>
              <Col className='col-6'>
                <Item />
              </Col>
              <Col className='col-6'>
                <Item />
              </Col>
              <Col className='col-6'>
                <Item />
              </Col>
              <Col className='col-6'>
                <Item />
              </Col>
            </Row>
          ) :
            <>
              <Collection />
              <Collection />
              <Collection />
              <Collection />
              <Collection />
            </>
          }
        </Col>
        <Col sm={4} className='d-none d-sm-block'>
          <Tags />
        </Col>
      </Row>
      <div className='d-flex justify-content-center m-3'>
        <Button variant="primary" className='mx-4'>See more</Button>
      </div>
    </Container>
  )
}

export default Home