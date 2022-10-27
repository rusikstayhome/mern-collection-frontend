import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';

import axios from '../../axios'

const UsersModal = ({ userId }) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [roles, setRoles] = useState([]);

    const toMyCollections = () => {
        navigate(`/collections/admin/${userId}`);
    }


    useEffect(() => {
        axios.get(`/users/${userId}`).then(res => {
            setUsername(res.data.user.username)
            setRoles(res.data.user.roles)
        })
    }, [])

    const fields = {
        roles: roles
    }

    const onSubmit = () => {
        axios.patch(`/users/${userId}`, fields)
    }

    console.log(roles)

    return (
        <Form onSubmit={onSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>{username}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Button variant='outline-info' className='me-2' onClick={toMyCollections}>See Collections</Button>
                {roles.includes('admin')
                    ? <Button variant='danger'
                        onClick={() => setRoles(roles.filter(role => role !== 'admin'))}
                    >Delete Admin</Button>
                    : <Button variant='success'
                        onClick={() => setRoles([...roles, 'admin'])}
                    >Add Admin</Button>
                }
            </Modal.Body>

            <Modal.Footer>
                <Button type='submit' variant="primary" >Save changes</Button>
            </Modal.Footer>
        </Form>
    )
}

export default UsersModal