import React from 'react';
import {Row, Col} from 'react-bootstrap';
import products from '../products';
import Product from '../components/Product';

const HomeScreen = () => {
    return (
      <>
        <h3>Lastest Product</h3>
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </>
    );
}

export default HomeScreen
