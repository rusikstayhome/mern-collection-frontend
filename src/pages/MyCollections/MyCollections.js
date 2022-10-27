import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap'

import axios from '../../axios'
import { fetchCollections } from '../../redux/slices/collections'

import Collection from '../../components/Collection/Collection'

const MyCollections = () => {
  const dispatch = useDispatch();
  const { collections } = useSelector(state => state)
  const isCollectionsLoading = collections.status === 'loading'

  const [authId, setAuthId] = useState('')


  useEffect(() => {
    axios.get('auth/me').then(res => {
      const data = res.data.userData
      setAuthId(data._id)
    }
    ).catch(err => {
      console.warn(err);
    })
  }, [])

  useEffect(() => {
    dispatch(fetchCollections())
  }, []);

  if (!window.localStorage.getItem('token')) {
    return <Navigate to="/" />
  }

  return (
    <Container >
      <Row>
        <Col>
          <Row className='justify-content-center'>
            {(isCollectionsLoading ?
              [...Array(5)]
              :
              collections.collections.items).filter(obj => obj.user._id === authId).map((obj, index) =>
                isCollectionsLoading ? <Collection key={index} />
                  :
                  (
                    <Col md={6} xs={12} key={index}>
                      < Collection
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
                    </Col>
                  )
              )}
          </Row>
        </Col>
      </Row>
    </Container >
  )
}

export default MyCollections