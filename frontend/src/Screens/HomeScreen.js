import React, {useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import Product from '../components/Product.js';
import Loader from '../components/Loader.js';
import Message from '../components/Message.js';
import {listProduct} from '../actions/productActions.js'

const HomeScreen = () => {   
  const dispatch = useDispatch(); 
  const productList = useSelector(state => state.productList);
  const {loading, error, products} = productList; 
    useEffect(()=>{       
        dispatch(listProduct());        
    },[dispatch])    
    return (
      <>
        <h3>Lastest Product</h3>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant = 'danger'>{error}</Message>
        ) : (
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </>
    );
}

export default HomeScreen