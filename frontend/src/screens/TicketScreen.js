import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Row, Col, ListGroup } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ManagerTicket from "../components/ManagerTicket";
import SupportTicket from "../components/SupportTicket";
import Meta from "../components/Meta";
import { getTicketDetails } from "../actions/ticketActions";

const TicketScreen = () => {
  const { id: ticketId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const ticketDetails = useSelector((state) => state.ticketDetails);
  const { error, loading, ticket } = ticketDetails;

  useEffect(() => {
    if (!customerInfo) {
      history.push("/login");
    }
    if (!ticket || ticket._id !== ticketId) {
      dispatch(getTicketDetails(ticketId));
    }
  }, [dispatch, history, customerInfo, ticket, ticketId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <ListGroup>
      <Meta title={`Ticket ${ticket && ticket._id}`} />
      <h1>Ticket # {ticket && ticket._id}</h1>
      <h6>created at {ticket && ticket.createdAt}</h6>
      <h6 style={{ marginTop: "20px" }}>Category: {ticket && ticket.type} </h6>
      <h6>
        Status:{" "}
        <span
          className={
            ticket && ticket.status === "New"
              ? "blue"
              : ticket && ticket.status === "On hold"
              ? "red"
              : "purple"
          }
        >
          {ticket && ticket.status}
        </span>
      </h6>
      <Row>
        <Col md={6}>
          <ListGroup.Item style={{ marginTop: "40px" }}>
            <h5>Request from:</h5>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col md={4}>
                <h6>Client Name:</h6>
                <h6 style={{ marginTop: "20px" }}>Email Address:</h6>
                <h6 style={{ marginTop: "20px" }}>Phone Number:</h6>
              </Col>
              <Col md={8}>
                <p>
                  {ticket && ticket.customer.firstName}{" "}
                  {ticket && ticket.customer.name}
                </p>
                <p>{ticket && ticket.customer.email} </p>
                <p>{ticket && ticket.customer.phone} </p>
              </Col>
            </Row>
          </ListGroup.Item>
        </Col>
        <Col md={6}></Col>
      </Row>
      <ListGroup.Item style={{ marginTop: "20px" }}>
        <h5>Request:</h5>
      </ListGroup.Item>
      <ListGroup.Item>
        <p>{ticket && ticket.quest}</p>
      </ListGroup.Item>
      <ListGroup.Item style={{ marginTop: "20px" }}>
        <h5>Comment from Support Team:</h5>
      </ListGroup.Item>
      <ListGroup.Item>
        <p>{ticket && ticket.commentSupport}</p>
      </ListGroup.Item>
      <ListGroup.Item style={{ marginTop: "20px" }}>
        <h5>Comment from Manager:</h5>
      </ListGroup.Item>
      <ListGroup.Item>
        <p>{ticket && ticket.commentManager}</p>
      </ListGroup.Item>

      <ManagerTicket
        ticket={ticket}
        ticketId={ticketId}
        customerInfo={customerInfo}
      />

      <SupportTicket
        ticket={ticket}
        ticketId={ticketId}
        customerInfo={customerInfo}
      />
    </ListGroup>
  );
};

export default TicketScreen;
