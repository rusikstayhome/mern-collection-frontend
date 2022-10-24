import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import Item from '../../components/Item/Item'
import Tags from '../../components/Tags/Tags'
import Collection from '../../components/Collection/Collection'
import { fetchCollections, fetchTags, fetchItems } from '../../redux/slices/collections'

import './Home.css'

const Home = () => {
  const dispatch = useDispatch();
  const { collections, tags, items } = useSelector(state => state.collections);

  const isCollectionsLoading = collections.status === 'loading'
  const isItemsLoading = collections.status === 'loading'
  const isTagsLoading = tags.status === 'loading'

  useEffect(() => {
    dispatch(fetchCollections())
    dispatch(fetchTags())
    dispatch(fetchItems())
  }, []);



  const [showItems, setShowItems] = useState(true);
  let [count, setCount] = useState(4)

  useEffect(() => {
    setCount(4)
  }, [showItems])

  const navigate = useNavigate();

  return (
    <Container>
      <Row>
        <Col sm={8}>
          <Row>
            <Col md={8} className="home-tabs mb-4">
              <span onClick={() => setShowItems(true)}
                className={showItems && 'active'}>Last Items</span>
              <span onClick={() => setShowItems(false)} className={!showItems && 'active'}>Top Collections</span>
            </Col>
            <Col className='add-button-wrapper'>
              <Button variant="outline-success" className='add-button mb-3' onClick={() => navigate('/add-collection')}>Add Collection</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          {showItems ? (
            <Row>
              {(isItemsLoading ?
                [...Array(4)]
                :
                items.items.slice(0, count)).map((obj, index) =>
                  isItemsLoading ?
                    <Item key={index} />
                    :
                    (
                      <Col className='col-6'
                        key={index}
                      >
                        <Item
                          isLoading={isItemsLoading}
                          id={obj._id}
                          name={obj.name}
                          likes={obj.likes}
                          collectionId={obj.parentCollection}
                          tags={obj.tags}
                          userId={obj.user}
                          imageUrl={obj.imageUrl}
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
                collections.items.slice(0, count)).map((obj, index) =>
                  isCollectionsLoading ? <Collection key={index} />
                    :
                    (
                      <Collection
                        id={obj._id}
                        title={obj.title}
                        description={obj.description}
                        topic={obj.topic}
                        updatedAt={obj.updatedAt}
                        imageUrl={obj.imageUrl}
                        key={index}
                        username={obj.user.username}
                        userId={obj.user._id}
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
        <Button variant="primary" className='mx-4' onClick={() => setCount(count += 4)}>See more</Button>
      </div>
    </Container>
  )
}

export default Home
