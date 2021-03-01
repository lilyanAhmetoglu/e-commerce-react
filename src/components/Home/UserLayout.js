import React from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
const UserLayout = (props) => {
  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <ListGroup defaultActiveKey="/">
              <ListGroup.Item action href="/active-orders">
                الطلبات الحالية
              </ListGroup.Item>
              <ListGroup.Item action href="/done-orders">
                الطلبات المكتملة
              </ListGroup.Item>
              <ListGroup.Item action href="/customers">
                الزبائن
              </ListGroup.Item>
              <ListGroup.Item action href="/users">
                المستخدمون
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col xs={12} md={8}>
            {props.children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserLayout;
