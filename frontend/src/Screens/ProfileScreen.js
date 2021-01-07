import React, {useState, useEffect} from 'react';
import {Form, Row, Col, Button, Table} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap'
import {format, parseISO} from 'date-fns';
import {getUserDetails, updateUserProfile} from '../actions/userActions';
import {listMyOrders} from '../actions/orderAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';



const ProfileScreen = ({history}) => {
  

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const {loading, user, error} = userDetails;  

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin; 
 
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const {loading:loadingOrders, orders, error: errorOrders} = orderListMy;  

  useEffect(() => {
    if(!userInfo)
    {
        history.push('/login')
    }
    else{
      if(!user || !user.name || success)
      {
        dispatch({type: USER_UPDATE_PROFILE_RESET})
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders())
      }
      else{
        setName(user.name);
        setEmail(user.email);       
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = e  => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }    
  }
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order)=>(
                <tr key = {order._id}>
                  <td>{order._id}</td>
                  <td>{format(parseISO(order.createdAt), "dd-MM-yyyy")}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      format(parseISO(order.paidAt), "dd-MM-yyyy")
                    ) : (
                      <i className="fa fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      format(parseISO(order.deliverdAt), "dd-MM-yyyy")
                    ) : (
                      <i className="fa fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to = {`/order/${order._id}`}>                     
                      <Button className = 'sm' variant  = 'info'>
                        Detail
                      </Button>
                     </LinkContainer>
                  </td>
                </tr>
              ))}
                          
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen
