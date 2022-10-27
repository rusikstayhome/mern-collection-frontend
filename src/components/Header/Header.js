import { useState, useEffect } from 'react';
import { Button, Container, Form, Modal, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { Link, useLocation } from 'react-router-dom'

import axios from '../../axios'

import { fetchAuth, fetchRegister, selectIsAuth, logout } from '../../redux/slices/auth'

import './Header.css'

function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const [admin, setAdmin] = useState(false)

  const onClickLogout = () => {
    if (window.confirm('Are you sure that you want to logout?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  }

  const {
    register,
    handleSubmit,
    serError,
    formState: { errors, isValid } } = useForm({
      defaultValues: {
        email: '',
        username: 'Ruslan Orlov',
        password: 'rusian1',
      },
      mode: 'onChange'
    })

  const onSubmit = async (values) => {

    const data = isRegister ? await dispatch(fetchRegister(values)) : await dispatch(fetchAuth(values));

    if (!data.payload && !isRegister) {
      alert('Failed to login')
    }

    if (!data.payload && isRegister) {
      alert('Failed to register');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
      handleClose()
    }
  }


  const [show, setShow] = useState(false);
  const [isRegister, setRegister] = useState(false);

  const location = useLocation();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  const handleClose = () => {
    setShow(false);
    setRegister(false);
  }
  const handleShow = () => setShow(true);
  const handleShowRegister = () => {
    setShow(true);
    setRegister(true);
  }

  useEffect(() => {
    axios.get('auth/me').then(res => {
      const data = res.data.userData
      setAdmin(Boolean(data.roles.includes('admin')));
    }
    ).catch(err => {
      console.warn(err);
    })
  }, [isAuth])

  return (
    <>
      <Navbar bg="dark" variant='dark' expand="lg" className="mb-3 header">
        <Container>
          <Navbar.Brand><Link to='/' className='nav-brand'>R.O. Collections</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link><Link to="/" className={url === '/' && 'active'}>Home</Link></Nav.Link>
              {(isAuth && admin) && <Nav.Link><Link to="/users" className={url === '/users' && 'active'}>Users</Link></Nav.Link>}
              {isAuth && <Nav.Link><Link to="/collections" className={url === '/collections' && 'active'}>My Collections</Link></Nav.Link>}
            </Nav>
            <Nav>
              <div id="darkmode">
                <input type="checkbox" className="checkbox" id="checkbox" />
                <label htmlFor="checkbox" className="label">
                  <BsMoonStarsFill color="white" />
                  <BsFillSunFill color="yellow" />
                  <div className="ball"></div>
                </label>
              </div>
            </Nav>

            <Nav
              className="me-3 my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {isAuth ? <Nav.Link className='text-danger' onClick={onClickLogout}>Log out</Nav.Link> :
                (
                  <>
                    <Nav.Link><Link to="/" onClick={handleShow}>Log in</Link></Nav.Link>
                    <Nav.Link><Link to="/" onClick={handleShowRegister}>Register</Link></Nav.Link>
                  </>
                )}
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isRegister ? 'Register' : 'Log in'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {isRegister &&
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                  {...register('email', { required: 'Enter email' })} />
                {errors.email ?
                  (
                    <Form.Text className="text-danger">
                      {errors.email.message}
                    </Form.Text>
                  ) :
                  (
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  )}

              </Form.Group>
            }
            <Form.Group className='mb-3'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' placeholder='Enter username'
                {...register('username', { required: 'Enter username' })} />
              {errors.username ?
                (
                  <Form.Text className="text-danger">
                    {errors.username.message}
                  </Form.Text>
                ) : null}
            </Form.Group>
            <Form.Group controlId='fromBasicPassword' className="mb-3">
              <Form.Label    >Password</Form.Label>
              <Form.Control type='password' placeholder='Enter password'
                {...register('password', { required: 'Enter password' })} />
              {errors.password ?
                (
                  <Form.Text className="text-danger">
                    {errors.password.message}
                  </Form.Text>
                ) : null}
            </Form.Group>
            <Button variant="primary" type="submit" className="px-4" disabled={!isValid}>
              Log in
            </Button>
          </Form>
        </Modal.Body>
      </Modal >
    </>
  );
}

export default Header;

