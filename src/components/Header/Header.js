import { useState, useEffect } from 'react';
import { Button, Container, Form, Modal, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { DarkModeToggle } from "react-dark-mode-toggle-2";

import axios from '../../axios'

import { fetchAuth, fetchRegister, selectIsAuth, logout } from '../../redux/slices/auth'
import { set } from '../../redux/slices/theme';

import './Header.css'

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const theme = useSelector((state) => state.theme)

  const [admin, setAdmin] = useState(false)
  const [show, setShow] = useState(false);
  const [isRegister, setRegister] = useState(false);
  const [searchText, setSearchText] = useState('');


  const onClickLogout = () => {
    if (window.confirm('Are you sure that you want to logout?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  }

  const {
    register,
    handleSubmit,
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

  const onSearchSubmit = (e) => {
    e.preventDefault()
    const fields = {
      text: searchText
    };
    axios.post(`/items/search`, fields).then(res => navigate(`/items/search`, { state: res.data }))
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleChange = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    dispatch(set(next))
  }

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

              <DarkModeToggle
                onChange={handleChange}
                isDarkMode={theme === 'dark'}
                size={55} />

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
              <Form className="d-flex" onSubmit={(e) => onSearchSubmit(e)} >
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Button variant="outline-success" type="submit">Search</Button>
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

