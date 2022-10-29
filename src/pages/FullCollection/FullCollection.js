import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { Button, Container, Card, Row, Col, Modal, Form } from 'react-bootstrap'

import axios from '../../axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Item from "../../components/Item/Item";
import AddItemModal from "../../components/AddItemModal/AddItemModal";



import './FullCollection.css'



function FullCollection() {
  const navigate = useNavigate();
  const { auth } = useSelector(state => state);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [show, setShow] = useState(false);
  // const [showFields, setShowFields] = useState(false);
  // const [fields, setFields] = useState({
  //   stringFields: {
  //     count: 1,
  //     fields: []
  //   }
  // })

  const { id } = useParams();

  const [hide, setHide] = useState(false)

  const navigateToCollectionEdit = () => {
    navigate(`/collections/${id}/edit`);
  }

  useEffect(() => {
    axios.get(`/collections/${id}`).then(res => {
      setData(res.data)
      setUserId(res.data.user._id)
      setIsLoading(false)
    }).catch(err => {
      console.warn(err);
      alert(`Error getting collection`)
    })
  }, [])


  return (
    <>
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

          {!hide &&
            <>
              {!isLoading ?
                <div>
                  <img src={data.imageUrl ? data.imageUrl : ''}
                    className='collection-img'
                    alt="" />
                </div> : ''
              }
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
          {((!isLoading && userId === auth.data?.userData?._id) || auth.data?.userData?.roles.includes('admin')) ?
            <Col className='add-button-wrapper'>
              <Button variant="success" className='add-button mb-3 me-2'
                onClick={() => setShow(true)}
              >Add Item</Button>
              {/* <Button variant="outline-info" className='add-button mb-3 me-2'
              >Add Fields</Button> */}
              <Button variant="outline-warning" className='add-button mb-3'
                onClick={navigateToCollectionEdit}
              >Edit Collection</Button>
            </Col> : ''
          }
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
                  <Col className='col-md-4 col-6'>
                    <Item
                      key={index}
                      isLoading={isLoading}
                      id={obj._id}
                      name={obj.name}
                      likes={obj.likes}
                      parentCollection={obj.parentCollection}
                      tags={obj.tags}
                      seeMore={true}
                      userId={userId}
                      imageUrl={obj.imageUrl}
                      collectionId={obj.parentCollection}
                    />
                  </Col>
                )
            )}
        </Row>
      </Container >
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="add-item__modal"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <AddItemModal isLoading={isLoading} />
      </Modal>
      {/* <Modal
        show={showFields}
        onHide={() => setShowFields(false)}
        dialogClassName="add-item__modal"
        aria-labelledby="example-custom-modal-styling-title"

      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Add Custom Fields
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>String Fields</Form.Label>
            <Form.Group className='mb-3'>
              {fields.stringFields.fields.length ?
                fields.stringFields.fields.map((obj, index) =>
                  <div key={index} className='d-flex w-75 mb-3'>
                    <Form.Control
                      placeholder="Custom Fields"
                    />
                    <Button className='ms-2 px-4'>Add</Button>
                  </div>
                )
                : <div className='d-flex w-75 mb-3'>
                  <Form.Control
                    placeholder="Custom Fields"
                  />
                  <Button className='ms-2 px-4'
                    onClick={(e) => onClickAddField(e)}
                  >Add</Button>
                </div>
              }

            </Form.Group>
          </Modal.Body>
        </Form>
      </Modal> */}
    </>
  );
}

export default FullCollection;