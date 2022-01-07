import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col md={5}>
            <Row>
              <Col md={1}>
                <a href="'">
                  <i className='fab fa-facebook-square lavender'></i>
                </a>
              </Col>
              <Col md={1}>
                <a href="'">
                  <i className='fab fa-twitter-square lavender'></i>
                </a>
              </Col>
              <Col md={1}>
                <a href="'">
                  <i className='fab fa-github-square lavender'></i>
                </a>
              </Col>
              <Col md={6}>
                <a href="'">
                  <i className='fab fa-linkedin lavender'></i>
                </a>
              </Col>
            </Row>
          </Col>
          <Col md={3}></Col>
          <Col md={4}>Copyright &copy; 2021 Marina Andersen</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
