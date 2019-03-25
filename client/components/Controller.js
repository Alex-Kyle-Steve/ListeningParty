import React, {Component} from 'react'
export class Controller extends Component {
  constructor() {
    super()
    this.state = {
      togglePlay: false
    }
    this.togglePlayButton = this.togglePlayButton.bind(this)
  }

  togglePlayButton() {
    this.setState({
      togglePlay: !this.state.togglePlay
    })
  }
  render() {
    return (
      <div id="player-container">
        <div id="player-controls">
          <div className="row center">
            <i className="fa fa-step-backward">
              <img src="/back.png" />
            </i>
            {this.state.togglePlay === false ? (
              <i onClick={this.togglePlayButton} className="fa fa-pause-circle">
                <img src="/play.png" />
              </i>
            ) : (
              <i onClick={this.togglePlayButton} className="fa fa-pause-circle">
                <img src="/pause.png" />
              </i>
            )}

            <i className="fa fa-step-forward">
              <img src="/forward.png" />
            </i>
          </div>
        </div>
      </div>
    )
  }
}
