import React, {useState, useEffect} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import FormContainer from '../components/FormContainer';
import {register} from '../actions/userActions'
import Loader from '../components/Loader';
import Message from '../components/Message'

const RegisterScreen = ({location, history}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);

    const {loading, userInfo, error} = userRegister;    

    const redirect = location.search ? location.search.split('=')[1] : '/';       

    useEffect(() => {
        if(userInfo)
        {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = e  => {
        e.preventDefault();
        if(password !== confirmPassword)
        {
            setMessage("Password do not match.")
        }
        else
        {
          dispatch(register(name, email, password));
        }
        
    }

    return (
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader></Loader>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter ConfirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button className="my-3" variant="primary" type="submit">
            Register
          </Button>
          <Row className="py-3">
            <Col>
              Have already account ?{" "}
              <Link
                to={redirect ? `/login?redirect = ${redirect}` : "/login"}
              >
                Sign Up
              </Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    );
}

export default RegisterScreen
