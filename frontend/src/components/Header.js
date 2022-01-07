import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/customerActions";

const Header = () => {
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar style={{ background: "palevioletred", padding: "30px" }}>
        <Container>
          <LinkContainer to='/' style={{ color: "lavender" }}>
            <Navbar.Brand>MarWebTradeCenter</Navbar.Brand>
          </LinkContainer>
          <LinkContainer to='/info' style={{ color: "lavender" }}>
            <Nav.Link active={false}>Info</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/contact' style={{ color: "lavender" }}>
            <Nav.Link active={false}>Contact</Nav.Link>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox />
            <Nav className='ml-auto'>
              {customerInfo ? (
                <>
                  <LinkContainer to='/cart' style={{ color: "lavender" }}>
                    <Nav.Link>
                      <i className='fas fa-cart-plus'></i>
                      My Cart
                    </Nav.Link>
                  </LinkContainer>
                  <NavDropdown
                    title={
                      <span
                        style={{
                          color: "lavender",
                        }}
                      >
                        {customerInfo.firstName}
                      </span>
                    }
                    id='customername'
                  >
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/myorders'>
                      <NavDropdown.Item>Orders&Returns</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/support'>
                      <NavDropdown.Item>Help&Support</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/register' style={{ color: "lavender" }}>
                    <Nav.Link>
                      <i className='fas fa-user-plus'></i>Register
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/login' style={{ color: "lavender" }}>
                    <Nav.Link>
                      <i className='fas fa-key'></i>Sign In
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
              {customerInfo && customerInfo.isAdmin && (
                <NavDropdown
                  title={<span style={{ color: "lavender" }}> Admin </span>}
                  id='admin'
                >
                  <LinkContainer to='/admin/customerlist'>
                    <NavDropdown.Item>Customers</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/ticketlist'>
                    <NavDropdown.Item>Tickets</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {customerInfo && customerInfo.isManager && (
                <NavDropdown
                  title={<span style={{ color: "lavender" }}> Manager </span>}
                  id='manager'
                >
                  <LinkContainer to='/manager/customerlist'>
                    <NavDropdown.Item>Customers</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/manager/primelist'>
                    <NavDropdown.Item>Premium Members</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/manager/franchiselist'>
                    <NavDropdown.Item>Franchise Association</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/manager/ticketlist'>
                    <NavDropdown.Item>Tickets</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/manager/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/manager/returnlist'>
                    <NavDropdown.Item>Returns</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/manager/invoicelist'>
                    <NavDropdown.Item>Invoices</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/manager/deliverylist'>
                    <NavDropdown.Item>Logistics</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/manager/devicelist'>
                    <NavDropdown.Item>Device Protection</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/manager/voucherlist'>
                    <NavDropdown.Item>Vouchers</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/manager/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {customerInfo && customerInfo.isFranchise && (
                <NavDropdown
                  title={<span style={{ color: "lavender" }}> Franchise </span>}
                  id='franchise'
                >
                  <LinkContainer to='/franchise/info'>
                    <NavDropdown.Item>Info</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/franchise/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {customerInfo && customerInfo.isSupport && (
                <NavDropdown
                  title={<span style={{ color: "lavender" }}>Support </span>}
                  id='support'
                >
                  <LinkContainer to='/support/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/support/deliverylist'>
                    <NavDropdown.Item>Logistics</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/support/ticketlist'>
                    <NavDropdown.Item>Tickets</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
