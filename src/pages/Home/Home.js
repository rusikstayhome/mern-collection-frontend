import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button } from 'react-bootstrap'

import axios from '../../axios'

import Item from '../../components/Item/Item'
import Tags from '../../components/Tags/Tags'
import Collection from '../../components/Collection/Collection'
import { fetchCollections, fetchTags } from '../../redux/slices/collections'

import './Home.css'

const Home = () => {
  const dispatch = useDispatch();
  const { collections, tags } = useSelector(state => state.collections);

  const isCollectionsLoading = collections.status === 'loading'
  const isTagsLoading = tags.status === 'loading'

  useEffect(() => {
    dispatch(fetchCollections())
    dispatch(fetchTags())
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
              {(isCollectionsLoading ?
                [...Array(4)]
                :
                collections.items).map((obj, index) =>
                  isCollectionsLoading ?
                    <Item key={index} />
                    :
                    (
                      <Col className='col-6'>
                        <Item key={index}
                          isLoading={isCollectionsLoading}
                        />
                      </Col>
                    )
                )}
            </Row>
          ) :
            <>
              {(isCollectionsLoading ?
                [...Array(5)]
                :
                collections.items).map((obj, index) =>
                  isCollectionsLoading ? <Collection key={index} />
                    :
                    (
                      <Collection
                        id={obj._id}
                        title={obj.title}
                        description={obj.description}
                        topic={obj.topic}
                        updatedAt={obj.updatedAt}
                        key={index}
                        isLoading={isCollectionsLoading} />
                    )
                )}
            </>
          }
        </Col>
        <Col sm={4} className='d-none d-sm-block'>
          <Tags tags={tags.items} isLoading={isTagsLoading} />
        </Col>
      </Row>
      <div className='d-flex justify-content-center m-3'>
        <Button variant="primary" className='mx-4'>See more</Button>
      </div>
    </Container>
  )
}

export default Home
