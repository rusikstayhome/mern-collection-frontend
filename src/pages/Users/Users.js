import React, { useEffect, useState } from 'react'
import { Table, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '../../redux/slices/auth'

const Users = () => {
  const dispatch = useDispatch()
  const { users, status } = useSelector(state => state.auth);

  const [admin, setAdmin] = useState(false)

  const isUsersLoading = status === 'loading'

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  console.log(admin)

  return (
    <Container>
      {isUsersLoading
        ? 'Loading...'
        : <Table striped bordered hover size="lg">
          <thead>
            <tr>
              <th>id</th>
              <th>Email</th>
              <th>Username</th>
              <th>Roles</th>
            </tr>
          </thead>
          <tbody>
            {users.map((obj, index) => {
              return (
                <tr>
                  <td>{obj._id}</td>
                  <td>{obj.email}</td>
                  <td>{obj.username}</td>
                  <td>{obj.roles.includes('admin')
                    ?
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Admin"
                      checked
                      onChange={() => setAdmin(!admin)}
                    />
                    : <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Admin"
                      onChange={() => setAdmin(!admin)}
                    />
                  }</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      }
    </Container>
  );
}


export default Users