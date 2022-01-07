import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Row, Col, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import {
  updateDeliver,
  updateDispatch,
  updateReceive,
} from "../actions/orderSupportActions";
import { getOrderDetails } from "../actions/orderActions";

const SupportOrderEditScreen = () => {
  const { id: orderId } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const orderDispatch = useSelector((state) => state.orderDispatch);
  const { loading: loadingDispatch, success: successDispatch } = orderDispatch;

  const orderReceive = useSelector((state) => state.orderReceive);
  const { loading: loadingReceive, success: successReceive } = orderReceive;

  useEffect(() => {
    if (customerInfo && customerInfo.isSupport) {
      if (
        !order ||
        order._id !== orderId ||
        successDispatch ||
        successDeliver ||
        successReceive
      ) {
        dispatch({ type: "ORDER_DELIVER_RESET" });
        dispatch({ type: "ORDER_DISPATCH_RESET" });
        dispatch({ type: "ORDER_RECEIVE_RESET" });
        dispatch(getOrderDetails(orderId));
      }
    } else {
      history.push("/login");
    }
  }, [
    dispatch,
    customerInfo,
    order,
    orderId,
    history,
    successDispatch,
    successDeliver,
    successReceive,
  ]);

  const deliverHandler = () => {
    dispatch(updateDeliver(order));
  };

  const dispatchHandler = () => {
    dispatch(updateDispatch(order));
  };

  const receiveHandler = () => {
    dispatch(updateReceive(order));
  };

  return (
    <>
      <Meta title='Edit Order' />
      {order && (
        <Link to={`/order/${order._id}`} className='btn btn-light'>
          Go to Order
        </Link>
      )}
      <Link to={"/support/orderlist"} className='btn btn-light  ml-3'>
        Go to Order List
      </Link>
      <Link to={"/support/deliverylist"} className='btn btn-light ml-3'>
        Go to Delivery Note List
      </Link>

      {loadingDeliver && <Loader />}
      {loadingDispatch && <Loader />}
      {loadingReceive && <Loader />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <ListGroup>
          <Row>
            <Col md={6}>
              <h1 style={{ marginTop: "130px", marginBottom: "120px" }}>
                Update Order Status
              </h1>
              <ListGroup.Item
                style={{ paddingTop: "30px", paddingBottom: "35px" }}
              >
                <h5>Delivery Status:</h5>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ paddingTop: "30px", paddingBottom: "30px" }}
              >
                {order && order.isSent ? (
                  <Message variant='info'>
                    Order has been dispatched on {order.sentAt.substring(0, 10)}
                  </Message>
                ) : (
                  <Message> Order is not dispatched </Message>
                )}
                <Button
                  type='button'
                  className='btn btn-block'
                  onClick={dispatchHandler}
                  disabled={
                    order &&
                    (!order.isPaid || order.isSent || order.returnActive)
                  }
                >
                  Mark Order as dispatched
                </Button>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ paddingTop: "30px", paddingBottom: "30px" }}
              >
                {order && order.isDelivered ? (
                  <Message variant='success'>
                    Order has been delivered on{" "}
                    {order.deliveredAt.substring(0, 10)}
                  </Message>
                ) : (
                  <Message> Order is not delivered </Message>
                )}
                <Button
                  type='button'
                  className='btn btn-block'
                  onClick={deliverHandler}
                  disabled={order && (order.isDelivered || !order.isSent)}
                >
                  Mark Order as delivered
                </Button>
              </ListGroup.Item>
            </Col>

            <Col md={6}>
              <ListGroup.Item
                style={{ marginTop: "150px", marginBottom: "45px" }}
              >
                <Row>
                  <Col md={5}>
                    <h5>Order ID:</h5>
                    <h6 style={{ marginTop: "15px" }}>placed on:</h6>
                    <h6>Customer Name:</h6>
                  </Col>
                  <Col md={7}>
                    <h5>{order && order._id}</h5>
                    <h6 style={{ marginTop: "15px" }}>
                      {order && order.createdAt.substring(0, 10)}{" "}
                    </h6>
                    <h6>
                      {order && order.customer.firstName}{" "}
                      {order && order.customer.name}
                    </h6>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ paddingTop: "30px", paddingBottom: "35px" }}
              >
                <h5>Order Return Status:</h5>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ paddingTop: "30px", paddingBottom: "30px" }}
              >
                {order && order.isReceived ? (
                  <Message variant='success'>
                    Return has been received on{" "}
                    {order.receivedAt.substring(0, 10)}{" "}
                  </Message>
                ) : order &&
                  !order.isReceived &&
                  order.returnActive &&
                  order.isSent ? (
                  <Message>Return is not received back</Message>
                ) : order && order.returnActive && !order.isSent ? (
                  <Message variant='info'>Order is not dispatched</Message>
                ) : (
                  <Message variant='info'>No Return for this Order</Message>
                )}
                <Button
                  type='button'
                  className='btn btn-block'
                  onClick={receiveHandler}
                  disabled={
                    order &&
                    (!order.returnActive ||
                      (order.returnActive && !order.isSent) ||
                      (order.returnActive && order.isReceived))
                  }
                >
                  Mark Order as received back
                </Button>
              </ListGroup.Item>
            </Col>
          </Row>
        </ListGroup>
      )}
    </>
  );
};
export default SupportOrderEditScreen;
