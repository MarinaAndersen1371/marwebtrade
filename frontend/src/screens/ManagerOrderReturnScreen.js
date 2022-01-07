import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { Button, Table, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { addDecimals } from "../helpers";
import { listManagerOrders } from "../actions/orderManagerActions";

const ManagerOrderReturnScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const orderManagerList = useSelector((state) => state.orderManagerList);
  const { orders, loading, error } = orderManagerList;

  useEffect(() => {
    if (customerInfo && customerInfo.isManager) {
      dispatch(listManagerOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, customerInfo]);

  //-----------------
  const returnQty =
    orders &&
    orders.reduce((acc, order) => acc + (order.returnActive ? 1 : 0), 0);
  //-----------------

  return (
    <>
      <Meta title='Order Return List' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : returnQty === 0 ? (
        <Message variant='info'>No Returns to show</Message>
      ) : (
        <ListGroup>
          <ListGroup.Item>
            <h1>Order Return List</h1>
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Total Order</th>
                  <th>Total Return</th>
                  <th>Total Items</th>
                  <th>Total Items Return</th>
                  <th>Tax Rate</th>
                  <th>Tax Rate Return</th>
                  <th>Shipping Fee</th>
                  <th>Shipping Fee Return</th>
                  <th>Invoice paid</th>
                  <th>Delivery Status</th>
                  <th>Received back</th>
                  <th>Refund paid</th>
                  <th>Return closed</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map(
                    (order) =>
                      order.returnActive && (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createdAt.substring(0, 10)}</td>
                          <td>
                            {order.customer.deleted ? (
                              <span className='purple'>removed Customer</span>
                            ) : (
                              <span>
                                {order.customer.firstName} {order.customer.name}
                              </span>
                            )}
                          </td>
                          <td className={order.isPaid ? "blue" : ""}>
                            ${addDecimals(order.totalPrice)}
                          </td>
                          <td>-${addDecimals(order.totalPriceBack)}</td>
                          <td>${addDecimals(order.itemsPrice)}</td>
                          <td>-${addDecimals(order.itemsPriceBack)}</td>
                          <td>${addDecimals(order.taxPrice)}</td>
                          <td>-${addDecimals(order.taxPriceBack)}</td>
                          <td>${addDecimals(order.shippingPrice)}</td>
                          <td>-${addDecimals(order.shippingPriceBack)}</td>
                          <td>
                            {order.isPaid ? (
                              <span>{order.paidAt.substring(0, 10)}</span>
                            ) : (
                              <i className='fas fa-times'></i>
                            )}
                          </td>
                          <td>
                            {order.isDelivered ? (
                              <span className='green'>
                                Delivered/ {order.deliveredAt.substring(0, 10)}
                              </span>
                            ) : !order.isDelivered && order.isSent ? (
                              <span className='orange'>
                                {" "}
                                Dispatched/ {order.sentAt.substring(0, 10)}
                              </span>
                            ) : (
                              <span>Not sent</span>
                            )}
                          </td>
                          <td>
                            {order.isReceived ? (
                              <span className='green'>
                                {order.receivedAt.substring(0, 10)}
                              </span>
                            ) : (
                              <i className='fas fa-times'></i>
                            )}
                          </td>
                          <td>
                            {order.refund ? (
                              <span className='blue'>
                                {order.refundAt.substring(0, 10)}
                              </span>
                            ) : (
                              <i className='fas fa-times'></i>
                            )}
                          </td>
                          <td>
                            {order.returnClosed ? (
                              <i className='fas fa-check'></i>
                            ) : (
                              <i className='fas fa-times'></i>
                            )}
                          </td>
                          <td>
                            <LinkContainer to={`/returnedorder/${order._id}`}>
                              <Button className='btn btn-sm'>Details</Button>
                            </LinkContainer>
                          </td>
                          <td>
                            <LinkContainer
                              to={`/manager/order/${order._id}/edit`}
                            >
                              <Button className='btn btn-sm'>
                                <i className='fas fa-edit'></i>
                              </Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      )
                  )}
              </tbody>
            </Table>
          </ListGroup.Item>

          <ListGroup.Item style={{ marginTop: "30px" }}>
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>Total Qty</th>
                  <th>Total Amount</th>
                  <th>Order Paid</th>
                  <th>Order not paid</th>
                  <th>Items Price</th>
                  <th>Tax Rate</th>
                  <th>Received Back</th>
                  <th>Refund Amount</th>
                  <th> Status Opened</th>
                  <th> Status Closed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{returnQty}</td>
                  <td>
                    -$
                    {addDecimals(
                      orders &&
                        orders.reduce(
                          (acc, order) => acc + +order.totalPriceBack,
                          0
                        )
                    )}
                  </td>
                  <td>
                    {orders &&
                      orders.reduce(
                        (acc, order) =>
                          acc + (order.returnActive && order.isPaid ? 1 : 0),
                        0
                      )}
                  </td>
                  <td>
                    {orders &&
                      orders.reduce(
                        (acc, order) =>
                          acc + (order.returnActive && !order.isPaid ? 1 : 0),
                        0
                      )}
                  </td>
                  <td>
                    -$
                    {addDecimals(
                      orders &&
                        orders.reduce(
                          (acc, order) => acc + +order.itemsPriceBack,
                          0
                        )
                    )}
                  </td>
                  <td>
                    -$
                    {addDecimals(
                      orders &&
                        orders.reduce(
                          (acc, order) => acc + +order.taxPriceBack,
                          0
                        )
                    )}
                  </td>
                  <td>
                    {orders &&
                      orders.reduce(
                        (acc, order) => acc + (order.isReceived ? 1 : 0),
                        0
                      )}
                  </td>
                  <td>
                    -$
                    {addDecimals(
                      orders &&
                        orders.reduce(
                          (acc, order) =>
                            acc + (order.refund ? +order.totalPriceBack : 0),
                          0
                        )
                    )}
                  </td>
                  <td>
                    {orders &&
                      orders.reduce(
                        (acc, order) =>
                          acc +
                          (order.returnActive && !order.returnClosed ? 1 : 0),
                        0
                      )}
                  </td>
                  <td>
                    {orders &&
                      orders.reduce(
                        (acc, order) => acc + (order.returnClosed ? 1 : 0),
                        0
                      )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </ListGroup.Item>
        </ListGroup>
      )}
    </>
  );
};

export default ManagerOrderReturnScreen;
