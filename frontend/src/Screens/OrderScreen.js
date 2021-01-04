import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {getOrderDetail} from '../actions/orderAction';
import Loader from '../components/Loader';
import Message from '../components/Message'

const OrderScreen = ({match}) => {

    const orderId = match.params.id;    
    const [skdReady, setSdkReady] = useState(false);
    const dispatch = useDispatch();
    const orderDetail = useSelector(state => state.orderDetail);
    const{order, loading: loadingOrderDetail, error: erroOrderDetail} = orderDetail;

    const orderPay = useSelector(state => state.orderPay);
    const {loading: loadingOrderPay, error: errOrderPay, success} = orderPay;

    const addPayPalScript = () =>{
      const clientId = await axios.post(`/api/config/${orderId}/paypal`);
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () =>{
          setSdkReady(true);
      }
      
    }
   
    useEffect(() => {
      
        dispatch(getOrderDetail(orderId));
    },[dispatch, orderId]);

    if(!loading)
    {
        //   Calculate prices
      const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
      }
    
      order.itemsPrice = addDecimals(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )
    }


    return loadingOrderDetail ? (
      <Loader></Loader>
    ) :
    erroOrderDetail 
    ? <Message variant = 'danger'>{erroOrderDetail}</Message>
    :
     (
      <>
        <Row>
          <Col md={8}>
            <h1>ORDER {orderId}</h1>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>SHIPPING ADDRESS</h2>
                <p>
                  <strong>Name: </strong>
                  {order.user.name}
                </p>
                <p>
                  <strong>Email:</strong>
                  {order.user.email}
                </p>
                <p>
                  <strong>Address:</strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered at {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not delivered</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>PAYMENT METHOD</h2>
                <p>
                  <strong>Method:</strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">Paid at {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not paid</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={order.orderItems === 0}
                  
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          </Col>
        </Row>
      </>    
    );
}

export default OrderScreen
