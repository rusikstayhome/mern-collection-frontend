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
  const theme = useSelector((state) => state.theme)
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
  const [filterTag, setFilterTag] = useState('');

  useEffect(() => {
    setCount(4)
  }, [showItems])

  const navigate = useNavigate();

  const makeUniq = (arr) => {
    const uniqSet = new Set(arr);
    return [...uniqSet];
  }

  const onClickShow = () => {
    setShowItems(true);
    setFilterTag('');
  }

  const onClickFilter = (obj) => {
    setShowItems(true);
    setFilterTag(obj);
  }

  return (
    <Container>
      <Row>
        <Col sm={8}>
          <Row>
            <Col md={8} className={`home-tabs mb-4 ${theme}`}>
              <span onClick={onClickShow}
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
                items.items.filter(obj => filterTag ? obj.tags.includes(filterTag) : obj).slice(0, count)).map((obj, index) =>
                  isItemsLoading ?
                    <Item key={index} />
                    :
                    (
                      <Col className='col-12 col-sm-6'
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
                        viewsCount={obj.viewsCount}
                        isLoading={isCollectionsLoading} />
                    )
                )}
            </>
          }
        </Col>
        <Col sm={4} className='d-none d-sm-block'>
          {/* <Tags tags={tags.items} isLoading={isTagsLoading} /> */}
          <div className='tags sticky' >
            <h4 className={`px-3 ${theme}`}>Tags:</h4>
            <ul className='tags-list'>
              {makeUniq(tags.items).map((obj, index) =>
                <li key={index} onClick={() => onClickFilter(obj)}># {obj}</li>
              )}
            </ul>
          </div >
        </Col>
      </Row>
      <div className='d-flex justify-content-center m-3'>
        <Button variant="primary" className='mx-4' onClick={() => setCount(count += 4)}>See more</Button>
      </div>
    </Container>
  )
}

export default Home
