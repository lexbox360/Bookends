import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetBookDetailsQuery } from '../slices/booksApiSlice';
import { addToCart } from '../slices/cartSlice';

const BookScreen = () => {
  const { id: bookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const { data: book, isLoading, error } = useGetBookDetailsQuery(bookId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...book, qty }));
    navigate('/cart');
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      { isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          { error?.data?.message || error.error }
        </Message>
      ) : (
      <>
      <Row>
        <Col md={5}>
          <Image src={book.cover} alt={book.title} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{book.title}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={book.rating} text={`${book.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>{book.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${book.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {book.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {book.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity:</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}>
                          {[...Array(book.countInStock).keys()].map((i) => (
                            <option key={ i + 1 } value={ i + 1 }>
                              { i + 1 }
                            </option>
                          ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={book.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      </>
    )}
    </>
  );
};

export default BookScreen;
