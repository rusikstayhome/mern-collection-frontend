import React, { useRef, useState, useCallback, useMemo } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";

import axios from '../../axios';

import { selectIsAuth } from '../../redux/slices/auth'

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import './AddCollection.css'

const AddCollection = () => {
    const navigate = useNavigate();

    const inputFileRef = useRef(null);
    const isAuth = useSelector(selectIsAuth);

    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [topic, setTopic] = useState('cars');
    const [imageUrl, setImageUrl] = useState('');


    const onChange = useCallback((value) => {
        setText(value);
    }, []);


    const options = useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: false,
            placeholder: 'Enter description...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

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

    const onSubmit = async () => {
        try {
            setLoading(true);

            const fields = {
                title,
                imageUrl,
                topic,
                description: text
            }
            const { data } = await axios.post('/collections', fields);

            const id = data._id

            navigate(`/collections/${id}`);
        } catch (err) {
            console.warn(err);
            alert('Collection upload error!')
        }
    }

    if (!window.localStorage.getItem('token') && !isAuth) {
        alert('Only registered users can add a collection')
        return <Navigate to="/" />
    }

    return (
        <Container>
            <Button
                type="submit" size="sm" variant="success"
                className={`mb-2 me-2 ${loading ? 'disabled' : ''}`}
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
                <Form.Label>Collection Title</Form.Label>
                <Form.Control
                    value={title}
                    placeholder="Collection Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Collection Topic</Form.Label>
                <Form.Select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                >
                    <option>Cars</option>
                    <option>Whiskey</option>
                    <option>Books</option>
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Collection description</Form.Label>
                <SimpleMDE value={text} onChange={onChange} options={options} />
            </Form.Group>
            <div className="d-flex justify-content-end">
                <Button type="submit" className="mb-3 mt-2"
                    onClick={onSubmit}
                >Add Collection</Button>
            </div>
        </Container>
    )
}

export default AddCollection