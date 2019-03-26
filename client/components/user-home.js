import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchSelectedChannel} from '../store/channel'
import {
  ConnectedFavoriteChannels,
  ConnectedOwnedChannels,
  ConnectedAllChannels,
  ConnectedMessages
} from '.'

import {Row, Col, Container, Tab, Tabs, Card, CardDeck} from 'react-bootstrap'
/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  render() {
    return (
      <div className="user-home-content">
        <Container fluid={true}>
          <Row>
            <Col
              className="my-center-align"
              xs={3}
              style={{overflow: 'scroll', height: '500px'}}
            >
              <ConnectedOwnedChannels
                changeChannel={this.props.fetchSelectedChannel}
              />
              <hr />
              <ConnectedFavoriteChannels
                changeChannel={this.props.fetchSelectedChannel}
              />
            </Col>

            <Col
              className="custom-center-align"
              xs={6}
              style={{overflow: 'scroll', height: '1000px'}}
            >
              <Row>
                <Col xs={12}>
                  <Card border="light">
                    <Card.Body>
                      <h2>Discover 🌎 </h2>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>{' '}
              <ConnectedAllChannels />
            </Col>

            <Col className="my-center-align" xs={3}>
              <Tabs
                defaultActiveKey="description"
                id="uncontrolled-tab-example"
              >
                <Tab eventKey="description" title="Information">
                  <CardDeck>
                    <Card border="light">
                      <Card.Body>
                        <Card.Title className="link-styling">
                          <h3>Welcome!</h3>
                        </Card.Title>

                        <Card.Text>
                          Welcome to Listening Party! Select a channel to start
                          listening or create your own!
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </CardDeck>
                </Tab>
                {/* <Tab eventKey="chat" title="Chat" style={{maxHeight: '1000px'}}>
                  <ConnectedMessages channel="Home" />
                </Tab> */}
              </Tabs>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}
const mapDispatch = dispatch => {
  return {
    fetchSelectedChannel: channelId => dispatch(fetchSelectedChannel(channelId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
