import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form, Container, Row, Col } from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from '../../axios'

import './AddItemModal.css'

const AddItemModal = ({ isEditing, itemId, fields }) => {
  const inputFileRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useSelector((state) => state.theme)

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [tags, setTags] = useState([]);
  const [stringFields, setStringFields] = useState({})
  const [textFields, setTextFields] = useState({})
  const [numberFields, setNumberFields] = useState({})
  const [dateFields, setDateFields] = useState({})
  const [value, setValue] = useState('')

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
      setLoading(false)
      console.warn(err);
      alert('File upload error!')
    }
  };

  useEffect(() => {
    if (isEditing) {
      axios.get(`/collections/${id}/items/${itemId}`).then(({ data }) => {
        setName(data.name);
        setTags(data.tags.join(','));
        setImageUrl(data.imageUrl);
      }).catch(err => {
        console.log(err);
        alert('Failed to get an item')
      })
    }
  }, [])

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);

      const fields = {
        imageUrl,
        name,
        tags,
        stringFields,
        dateFields,
        numberFields,
        textFields
      }

      const { data } = isEditing
        ? await axios.patch(`/collections/${id}/items/${itemId}`, fields)
        : await axios.post(`/collections/${id}/items`, fields);

      const _itemid = isEditing ? itemId : data._id

      navigate(`/collections/${id}/item/${_itemid}`);
    } catch (err) {
      console.log(err);
      alert('Item upload error!')
    }
  }

  const addStringField = (e, obj) => {
    setStringFields({
      ...stringFields,
      [obj]: e.target.value
    })
    setValue('')
  }

  const addTextField = (e, obj) => {
    setTextFields({
      ...textFields,
      [obj]: e.target.value
    })
    setValue('')
  }

  const addNumberField = (e, obj) => {
    setNumberFields({
      ...numberFields,
      [obj]: e.target.value
    })
    setValue('')
  }

  const addDateField = (e, obj) => {
    setDateFields({
      ...dateFields,
      [obj]: e.target.value
    })
    setValue('')
  }

  return (
    <Form onSubmit={onSubmit} className={`${theme === 'dark' ? 'dark-modal' : ''}`}>
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title" className={theme}>
          Add Item
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          size="sm" variant="success"
          className={`mb-2 me-2 ${loading ? 'disabled' : ''}`}
          onClick={() => inputFileRef.current.click()}
        >
          {loading ? 'Loading...' : 'Download Image'}
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
          <Form.Label className={theme}>Item Name</Form.Label>
          <Form.Control
            value={name}
            placeholder="Item Title"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className={theme}>Tags</Form.Label>
          <Form.Control
            value={tags}
            placeholder="Item tags"
            onChange={(e) => setTags(e.target.value)}
          />
        </Form.Group>
        <hr className={theme} />

        {
          (!isEditing && fields.length)
            ? <Form.Group className="mb-2">
              {fields[0].stringAttributes.map((obj, index) => {
                if (obj !== '') {
                  return <div key={index}>
                    <Form.Label className={theme}>{obj}</Form.Label>
                    <Form.Control
                      placeholder={obj}
                      name={obj}
                      onChange={(e) => addStringField(e, obj)}
                    />
                  </div>
                }
              })}
            </Form.Group>
            : ''
        }

        {/* <hr className={theme} /> */}

        {
          (!isEditing && fields.length)
            ? <Form.Group className="mb-2">
              {fields[0].dateAttributes.map((obj, index) => {
                if (obj !== '') {
                  return <div key={index}>
                    <Form.Label className={theme}>{obj}</Form.Label>
                    <Form.Control
                      placeholder={obj}
                      name={obj}
                      type="date"
                      onChange={(e) => addDateField(e, obj)}
                    />
                  </div>
                }
              })}
            </Form.Group>
            : ''
        }


        {
          (!isEditing && fields.length)
            ? <Form.Group className="mb-2">
              {fields[0].textAttributes.map((obj, index) => {
                if (obj !== '') {
                  return <div key={index}>
                    <Form.Label className={theme}>{obj}</Form.Label>
                    <Form.Control
                      placeholder={obj}
                      name={obj}
                      as="textarea"
                      onChange={(e) => addTextField(e, obj)}
                    />
                  </div>
                }
              })}
            </Form.Group>
            : ''
        }

        {
          (!isEditing && fields.length)
            ? <Form.Group className="mb-2">
              {fields[0].numberAttributes.map((obj, index) => {
                if (obj !== '') {
                  return <div key={index}>
                    <Form.Label className={theme}>{obj}</Form.Label>
                    <Form.Control
                      placeholder={obj}
                      name={obj}
                      onChange={(e) => addNumberField(e, obj)}
                    />
                  </div>
                }
              })}
            </Form.Group>
            : ''
        }

        <div className="d-flex justify-content-end">
          <Button type="submit" className="mb-3 mt-3"
          >{isEditing ? 'Save changes' : 'Add Item'}</Button>
        </div>
      </Modal.Body>
    </Form >
  )
}

export default AddItemModal