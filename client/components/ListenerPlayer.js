import React, {Component} from 'react'
import {
  Card,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  CardDeck,
  Button
} from 'react-bootstrap'

export const ListenerPlayer = props => {
  return (
    <Card border="light">
      <Row>
        <Col xs={6}>
          <Card.Img src="https://i.scdn.co/image/2b2c35974280d813521f8e9b5962f043136d3440" />
        </Col>
        <Col xs={6}>
          {/* Current Song Information */}
          <Row>
            <Col xs={12}>
              <Card.Title>Listener's Song Information</Card.Title>
            </Col>
            <Col xs={12}>
              <Card.Text>Road Head</Card.Text>
            </Col>
            <Col xs={12}>
              <Card.Text>Japanese Breakfast</Card.Text>
            </Col>
            <Col xs={12}>
              <Card.Text>Soft Sounds from Another Planet</Card.Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}
