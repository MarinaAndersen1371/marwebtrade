import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { Button, Table, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import ManagerInvoiceList from "../components/ManagerInvoiceList";
import Meta from "../components/Meta";
import { addDecimals } from "../helpers";
import { listManagerOrders } from "../actions/orderManagerActions";

const ManagerInvoiceListScreen = () => {
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

  return (
    <>
      <Meta title='Invoice List' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : orders && orders.length === 0 ? (
        <Message variant='info'>No data to show</Message>
      ) : (
        <ListGroup>
          <ListGroup.Item>
            <h1>Invoice List</h1>
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Items Total </th>
                  <th>Tax Rate(15%)</th>
                  <th>Shipping Fee</th>
                  <th>Premium Fee</th>
                  <th>Franchise Fee</th>
                  <th>Order Total</th>
                  <th>Purchase Cost</th>
                  <th>Invoice paid</th>
                  <th>Invoice sent</th>
                  <th>Return Status</th>
                  <th>Total Return</th>
                  <th>Items Total Return</th>
                  <th>Tax Rate Return</th>
                  <th>Shipping Fee Return</th>
                  <th>Refund paid</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
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
                      <td>${addDecimals(order.itemsPrice)}</td>
                      <td>${addDecimals(order.taxPrice)}</td>
                      <td>${addDecimals(order.shippingPrice)}</td>
                      <td>${addDecimals(order.primePrice)}</td>
                      <td>${addDecimals(order.franchisePrice)}</td>
                      <td className={order.isPaid ? "blue" : ""}>
                        ${addDecimals(order.totalPrice)}
                      </td>
                      <td className='red'>-${addDecimals(order.cost)}</td>
                      <td>
                        {order.isPaid ? (
                          <span>{order.paidAt.substring(0, 10)}</span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {order.invoiceSent ? (
                          <span>{order.sentAt.substring(0, 10)}</span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {order.returnActive ? (
                          <i className='fas fa-check'></i>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {order.returnActive ? (
                          <span>-${addDecimals(order.totalPriceBack)}</span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {order.returnActive ? (
                          <span>-${addDecimals(order.itemsPriceBack)}</span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {order.returnActive ? (
                          <span>-${addDecimals(order.taxPriceBack)}</span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {order.returnActive ? (
                          <span>-${addDecimals(order.shippingPriceBack)}</span>
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
                        <LinkContainer to={`/invoice/${order._id}`}>
                          <Button className='btn btn-sm'>Details</Button>
                        </LinkContainer>
                      </td>
                      <td>
                        <LinkContainer to={`/manager/order/${order._id}/edit`}>
                          <Button className='btn btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </ListGroup.Item>

          <ListGroup.Item style={{ marginTop: "30px" }}>
            <ManagerInvoiceList orders={orders} />
          </ListGroup.Item>
        </ListGroup>
      )}
    </>
  );
};

export default ManagerInvoiceListScreen;
