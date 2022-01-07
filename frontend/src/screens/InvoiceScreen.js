import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Col, Row, Table, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import ForFromAddresses from "../components/ForFromAddresses";
import Payment from "../components/Payment";
import Meta from "../components/Meta";
import { addDecimals } from "../helpers";
import { getOrderDetails } from "../actions/orderActions";

const InvoiceScreen = () => {
  const { id: orderId } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    if (!customerInfo) {
      history.push("/login");
    } else if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId, history, customerInfo]);

  //--------------
  const qtyDiscount =
    order && order.orderItems.reduce((acc, item) => +item.discount + acc, 0);
  const qtyWarranty =
    order && order.orderItems.reduce((acc, item) => +item.warranty + acc, 0);
  const qtyGift =
    order && order.orderItems.reduce((acc, item) => +item.gift + acc, 0);
  //------------

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <Meta title={`Invoice ${order && order._id}`} />
      <Row style={{ marginBottom: "40px" }}>
        <Col md={9}>
          <h1>Invoice # {order && order._id}</h1>
          <h6>Order placed on {order && order.createdAt.substring(0, 10)}</h6>
        </Col>
        <Col md={3}>
          {order && (
            <LinkContainer to={`/order/${order._id}`}>
              <Button className='btn btn-block'>Go to Order</Button>
            </LinkContainer>
          )}
          {order && (
            <LinkContainer to={`/deliverynote/${order._id}`}>
              <Button className='btn btn-block'>Go to Delivery Note</Button>
            </LinkContainer>
          )}
          {order && +order.extraPrice > 0 && (
            <LinkContainer to={`/device/${order._id}`}>
              <Button className='btn btn-block'>
                Go to Device Protection Card
              </Button>
            </LinkContainer>
          )}
        </Col>
      </Row>
      <ListGroup>
        <ForFromAddresses order={order} />

        <ListGroup.Item style={{ marginTop: "50px", marginBottom: "20px" }}>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>Ordered Item</th>
                <th>Qty</th>
                <th>Price/ Item</th>
                {+qtyDiscount > 0 && <th>Discount/ Item</th>}
                {+qtyWarranty > 0 && <th>Warranty/ Item</th>}
                {+qtyGift > 0 && <th>Gift Package</th>}
                {order && +order.extraPrice > 0 && <th>Protection/ Item</th>}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order.orderItems &&
                order.orderItems.map((item) => (
                  <tr key={item.product}>
                    <td>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td>{item.qty}</td>
                    <td>$ {addDecimals(item.price)}</td>
                    {+qtyDiscount > 0 && (
                      <td>
                        {+item.discount > 0 ? (
                          <span>
                            -$ {addDecimals(+item.discount * +item.price)}
                          </span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                    )}
                    {+qtyWarranty > 0 && (
                      <td>
                        {+item.warranty > 0 ? (
                          <span>
                            $ {addDecimals(+item.warranty * +item.price)}
                          </span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                    )}
                    {+qtyGift > 0 && (
                      <td>
                        {+item.gift > 0 ? (
                          <span>$ 5.00</span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                    )}
                    {+order.extraPrice > 0 && (
                      <td>
                        {+item.extra1 > 0 && !order.isPaid ? (
                          <span>$4.00 / 1Year</span>
                        ) : +item.extra1 > 0 &&
                          order.isPaid &&
                          !order.isExtra ? (
                          <Link to={`/device/${order._id}`}>
                            <span className='blue'>$4.00 / 1Year</span>
                          </Link>
                        ) : +item.extra1 > 0 &&
                          order.isPaid &&
                          order.isExtra ? (
                          <Link to={`/device/${order._id}`}>
                            <span className='green'>$4.00 / 1Year</span>
                          </Link>
                        ) : +item.extra2 > 0 && !order.isPaid ? (
                          <span>$5.00 / 2Years</span>
                        ) : +item.extra2 > 0 &&
                          order.isPaid &&
                          !order.isExtra ? (
                          <Link to={`/device/${order._id}`}>
                            <span className='blue'>$5.00 / 2Years </span>
                          </Link>
                        ) : +item.extra2 > 0 &&
                          order.isPaid &&
                          order.isExtra ? (
                          <Link to={`/device/${order._id}`}>
                            <span className='green'> $5.00 / 2Years</span>
                          </Link>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                    )}
                    <td>
                      $
                      {addDecimals(
                        +item.qty * +item.price -
                          +item.qty * +item.price * +item.discount +
                          +item.qty * +item.price * +item.warranty +
                          +item.gift +
                          +item.qty * +item.extra1 +
                          +item.qty * +item.extra2
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </ListGroup.Item>
        <Row style={{ marginTop: "20px" }}>
          <Col md={6}>
            <Payment order={order} />
            <ListGroup.Item>
              <h5>Invoice Status</h5>
              {order && order.isPaid ? (
                <Message variant='success'>
                  Invoice has been paid at {order.paidAt}
                </Message>
              ) : (
                <Message variant='info'>Invoice is not paid</Message>
              )}
              {order && order.invoiceSent ? (
                <Message variant='success'>
                  Invoice has been sent on {order.invoiceAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant='info'>Invoice is not sent</Message>
              )}
            </ListGroup.Item>
          </Col>
          <Col md={6}>
            <ListGroup.Item>
              <h5>Invoice Summary</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={7}>
                  {" "}
                  <h6>Items Subtotal:</h6>
                </Col>
                <Col md={5}>
                  <h6>$ {addDecimals(order && order.itemsPrice)}</h6>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={7}>
                  <h6>Tax Rate (15%):</h6>{" "}
                </Col>
                <Col md={5}>
                  {" "}
                  <h6>$ {addDecimals(order && order.taxPrice)}</h6>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={7}>
                  {" "}
                  <h6>Shipping Fee:</h6>
                </Col>
                <Col md={5}>
                  <h6>$ {addDecimals(order && order.shippingPrice)}</h6>
                </Col>
              </Row>
            </ListGroup.Item>
            {order && +order.primePrice > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col md={7}>
                    <h6>Premium Subscription Fee:</h6>
                  </Col>
                  <Col md={5}>
                    <h6>$ 70.00</h6>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
            {order && +order.franchisePrice > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col md={7}>
                    <h6>Franchising System Fee:</h6>
                  </Col>
                  <Col md={5}>
                    <h6>$ 500.00</h6>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
            {order && order.voucherActive && (
              <ListGroup.Item>
                <Row>
                  <Col md={7}>
                    <h6>Premium Voucher:</h6>
                  </Col>
                  <Col md={5}>
                    <h6>-$ 10.00</h6>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
            <ListGroup.Item style={{ paddingBottom: "30px" }}>
              <Row>
                <Col md={7}>
                  <h6 className={order && order.isPaid ? "blue" : ""}>
                    TOTAL:
                  </h6>
                </Col>
                <Col md={5}>
                  <h6 className={order && order.isPaid ? "blue" : ""}>
                    $ {addDecimals(order.totalPrice)}
                  </h6>
                </Col>
              </Row>
            </ListGroup.Item>
            <Row style={{ marginTop: "10px" }}>
              <Col md={6}></Col>
              <Col md={6}>
                {order && (
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn btn-block'>Go to Order</Button>
                  </LinkContainer>
                )}
                {order && (
                  <LinkContainer to={`/deliverynote/${order._id}`}>
                    <Button className='btn btn-block'>
                      Go to Delivery Note
                    </Button>
                  </LinkContainer>
                )}
                {order && +order.extraPrice > 0 && (
                  <LinkContainer to={`/device/${order._id}`}>
                    <Button className='btn btn-block'>
                      Go to Device Protection Card
                    </Button>
                  </LinkContainer>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </ListGroup>
    </>
  );
};

export default InvoiceScreen;
