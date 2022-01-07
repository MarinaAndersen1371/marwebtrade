import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, ListGroup, NavDropdown } from "react-bootstrap";
import FAQRussian from "../components/FAQRussian";
import Meta from "../components/Meta";
import ReactCountryFlag from "react-country-flag";

const InfoRussianScreen = () => {
  return (
    <>
      <Meta title='Добро пожаловать на сайт MarwWebTradeCenter!' />
      <Row>
        <Col md={9}></Col>
        <Col md={2}>
          <ReactCountryFlag
            countryCode='RU'
            svg
            style={{
              width: "2em",
              height: "2em",
              marginLeft: "44px",
            }}
          />
          <strong style={{ marginLeft: "10px" }}>Русский</strong>
        </Col>
        <Col md={1}>
          <NavDropdown id='lang'>
            <LinkContainer to='/infogerman'>
              <NavDropdown.Item>
                {" "}
                <ReactCountryFlag
                  countryCode='DE'
                  svg
                  style={{
                    width: "2em",
                    height: "2em",
                  }}
                />{" "}
                <span style={{ marginLeft: "13px" }}>Deutsch</span>
              </NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/info'>
              <NavDropdown.Item>
                {" "}
                <ReactCountryFlag
                  countryCode='US'
                  svg
                  style={{
                    width: "2em",
                    height: "2em",
                  }}
                />
                <span style={{ marginLeft: "15px" }}>English</span>
              </NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/infospanish'>
              <NavDropdown.Item>
                {" "}
                <ReactCountryFlag
                  countryCode='ES'
                  svg
                  style={{
                    width: "2em",
                    height: "2em",
                  }}
                />
                <span style={{ marginLeft: "15px" }}>Español</span>
              </NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Col>
      </Row>
      <ListGroup style={{ marginTop: "30px" }}>
        <Row>
          <Col md={6}>
            <FAQRussian />
          </Col>
          <Col md={6}>
            <ListGroup.Item>
              <h4>О нас</h4>
              <p>
                {" "}
                Владельцы малого бизнеса могут иметь возможность получения
                франшизы при покупке товаров, строительство нового магазина или
                преобразование существующей ремонт предприятий в магазины.
                Компания рекомендует людям, которые заинтересованы в этой
                возможности для бизнеса, амбициозны, целеустремленны и обладают
                сильным личным и лидерским потенциалом, навыками и умениями.
                Начальное обучение включает ориентацию в магазине и 10 дни
                обучения в учебном центре. Компания также предлагает постоянное
                обучение во многих областях, включая диагностику, обслуживание и
                регулировку углов установки колес. Однажды ты откройте свою
                франшизу, компания предлагает постоянную помощь с маркетинг,
                управление бизнесом и отношения с клиентами.
              </p>
            </ListGroup.Item>
            <ListGroup.Item style={{ marginTop: "5px" }}>
              <h6>СТАТЬ ЧЛЕНОМ МЕЖДУНАРОДНОЙ АССОЦИАЦИИ ФРАНШИЗЫ</h6>
              <p>
                Oрганизация была основана в 1978 году и базируется в Берлине.
                Это качественное сообщество представляет как франчайзеры и
                франчайзи. Группа предоставляет своим более чем 400 членам
                многочисленные услуги и преимущества. Основная забота ассоциации
                - экономическая, социальная и политическое представление
                интересов индустрии франчайзинга, что включает в себя поддержку
                планов расширения своих членов. В 2020 году около 930
                франчайзинговых систем в Германии, вместе с примерно 138 748
                франчайзинговых партнеров и 749 198 сотрудников оборот около 135
                миллиардов евро. Даем советы международных франчайзинговых
                систем и можем помочь вам установить вашу франчайзинговую
                систему в Германии. Вы можете присоединиться к нам как
                Международный ассоциированный член, и мы будем рекламировать
                вашу компанию в нашем Системном поиске франчайзеров из-за
                рубежа.
              </p>
            </ListGroup.Item>
          </Col>
        </Row>
      </ListGroup>
    </>
  );
};

export default InfoRussianScreen;
