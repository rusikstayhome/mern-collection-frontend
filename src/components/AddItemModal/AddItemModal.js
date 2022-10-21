import React, { useState, useEffect, useRef } from "react";
import { useForm } from 'react-hook-form'
import { Button, Modal, Form, Container, Row, Col } from 'react-bootstrap'

import axios from '../../axios'

import CustonFieldInput from "../CustomFieldInput/CustonFieldInput";

import './AddItemModal.css'

const AddItemModal = ({ isLoading }) => {
  const inputFileRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');
  const [string, setString] = useState({});

  const [field, setField] = useState('');
  const [value, setValue] = useState('');
  const [added, setAdded] = useState(false)


  const handleChangeFile = async (event) => {
    try {
      setLoading(true)
      const formData = new FormData();
      const file = event.target.files[0]
      formData.append('image', file)
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.image)
      setLoading(false)
    } catch (err) {
      console.warn(err);
      alert('File upload error!')
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const handleAddString = (e) => {
    e.preventDefault();
    if (field !== null && value !== null) {
      setString((prev) => {
        return { ...prev, [field]: value }
      })
      setField('');
      setValue('');
      setAdded(true);
    }
  }

  console.log(string)

  return (
    <Form>
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Add Item
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          type="submit" size="sm" variant="success"
          className={`mb-2 me-2 ${loading && 'disabled'}`}
          onClick={() => inputFileRef.current.click()}
        >
          Download Image
        </Button>
        {imageUrl &&
          <Button type="submit" size="sm" variant="danger" className='mb-2' onClick={onClickRemoveImage}
          >
            Delete Image
          </Button>}
        <input className='d-none'
          ref={inputFileRef} type="file"
          onChange={handleChangeFile}
        />

        {imageUrl &&
          <div className='addCollection'>
            <img src={imageUrl} alt="collection img" className='addCollection-img mb-2' />
          </div>}
        <Form.Group className="mb-3">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            value={name}
            placeholder="Collection Title"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            value={tags}
            placeholder="Collection Title"
            onChange={(e) => setTags(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Custom Fields</Form.Label>
          <Row className="mb-2">
            <Col>
              <Form.Control
                placeholder="Property"
                onChange={(e) => setField(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Value"
                name={field}
                onChange={(e) => setValue(e.target.value)}
              />
            </Col>
            <Col>
              <Button type="submit"
                onClick={handleAddString}>Add</Button>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <Form.Control
                placeholder="Property"
                onChange={(e) => setField(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Value"
                name={field}
                onChange={(e) => setValue(e.target.value)}
              />
            </Col>
            <Col>
              <Button type="submit"
                onClick={handleAddString}>Add</Button>
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
    </Form>
  )
}

export default AddItemModal