import React, { useEffect, useState } from 'react'
import { Table, Container, Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import axios from '../../axios'
import { fetchUsers } from '../../redux/slices/auth'

import UsersModal from '../../components/UsersModal/UsersModal';

import './Users.css'

const Users = () => {
  const dispatch = useDispatch()
  const { users, status } = useSelector(state => state.auth);
  const theme = useSelector((state) => state.theme)

  const [show, setShow] = useState(false);
  const [admin, setAdmin] = useState(false)
  const [userId, setUserId] = useState('')
  const [authAdmin, setAuthAdmin] = useState([])

  const handleShow = (id) => {
    setShow(true);
    setUserId(id);
  }
  const handleClose = () => setShow(false);

  const isUsersLoading = status === 'loading'

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  useEffect(() => {
    axios.get('auth/me').then(res => {
      const data = res.data.userData
      setAuthAdmin(data.roles.includes('admin'))
    }
    ).catch(err => {
      console.warn(err);
    })
  }, [])

  if (!window.localStorage.getItem('token') || !authAdmin) {
    return <Navigate to="/" />
  }

  return (
    <Container className={`users-table`}>
      {isUsersLoading
        ? 'Loading...'
        : <Table striped bordered hover size="lg" variant={theme}>
          <thead>
            <tr>
              <th>id</th>
              <th>Email</th>
              <th>Username</th>
              <th>Roles</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((obj, index) => {
              return (
                <tr key={index} onClick={() => handleShow(obj._id)}>
                  <td>{obj._id}</td>
                  <td>{obj.email}</td>
                  <td>{obj.username}</td>
                  <td><ul className='users-role'>{obj.roles.map((role, index) =>
                    <li key={index} className={`mb-1 me-1 ${role === 'admin' ? 'admin' : ''}`}>
                      {role}
                    </li>
                  )}</ul></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      }
      <Modal show={show} onHide={handleClose}>
        <UsersModal userId={userId} />
      </Modal>
    </Container >
  );
}


export default Users