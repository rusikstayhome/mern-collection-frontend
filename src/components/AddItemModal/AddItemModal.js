import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form, Container, Row, Col } from 'react-bootstrap'

import './AddItemModal.css'

const AddItemModal = ({ isLoading }) => {
  const inputFileRef = useRef(null);
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Add Item
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          type="submit" size="sm" variant="success"
          className={`mb-2 me-2 ${isLoading && 'disabled'}`}
          onClick={() => inputFileRef.current.click()}
        >
          Download Image
        </Button>

        <Button type="submit" size="sm" variant="danger" className='mb-2'
        >
          Delete Image
        </Button>
        <input className='d-none'
          ref={inputFileRef} type="file"

        />

        <div className='addCollection'>
          <img alt="collection img" className='addCollection-img mb-2' />
        </div>
        <Form.Group className="mb-3">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            value={'title'}
            placeholder="Collection Title"

          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            value={'tags'}
            placeholder="Collection Title"

          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Custom Fields</Form.Label>
          <Row className="mb-2">
            <Col>
              <Form.Control

                placeholder="Property"
              />
            </Col>
            <Col>
              <Form.Control

                placeholder="Value"
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <Form.Control

                placeholder="Property"
              />
            </Col>
            <Col>
              <Form.Control

                placeholder="Value"
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <Form.Control

                placeholder="Property"
              />
            </Col>
            <Col>
              <Form.Control

                placeholder="Value"
              />
            </Col>
          </Row>
        </Form.Group>
        <hr />
        <Form.Group className="mb-3">
          <Row className="mb-2">
            <Col>
              <Form.Control

                placeholder="Property"
              />
            </Col>
            <Col>
              <Form.Control
                as="textarea" rows={1}
                placeholder="Value"
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <Form.Control

                placeholder="Property"
              />
            </Col>
            <Col>
              <Form.Control
                as="textarea" rows={1}
                placeholder="Value"
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <Form.Control

                placeholder="Property"
              />
            </Col>
            <Col>
              <Form.Control
                as="textarea" rows={1}
                placeholder="Value"
              />
            </Col>
          </Row>

        </Form.Group>
        <hr />
        <Form.Group className="mb-3">
          <Row className="mb-2">
            <Col>
              <Form.Control

                placeholder="Property"
              />
            </Col>
            <Col>
              <Form.Control
                type="date"
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <Form.Control

                placeholder="Property"
              />
            </Col>
            <Col>
              <Form.Control
                type="date"
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <Form.Control

                placeholder="Property"
              />
            </Col>
            <Col>
              <Form.Control
                type="date"
              />
            </Col>
          </Row>
        </Form.Group>
        <hr />
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Row className="mb-2">
                <Col>
                  <Form.Control

                    placeholder="Property"
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    className="mt-1"
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <Row className="mb-2">
                <Col>
                  <Form.Control

                    placeholder="Property"
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    className="mt-1"
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <Row className="mb-2">
                <Col>
                  <Form.Control

                    placeholder="Property"
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    className="mt-1"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button type="submit" className="mb-3 mt-2"
          >Add Item</Button>
        </div>
      </Modal.Body>
    </>
  )
}

export default AddItemModal