import React, {Component} from 'react'
export class Controller extends Component {
  constructor() {
    super()
    this.state = {
      togglePlay: false,
      sliderValue: 0
    }
    this.togglePlayButton = this.togglePlayButton.bind(this)
  }

  togglePlayButton() {
    this.setState({
      togglePlay: !this.state.togglePlay
    })
  }

  onInput(currentPosition, songLength) {
    //TODO:
    //Create function that increments the sliderValue as a function of the duration of the song.
    //Have dynamic scrubbing
    var input = document.getElementById('myRange').step
    while (currentPosition < songLength) {
      this.onInput(currentPosition)
      currentPosition++
    }
    console.log(input.value)
  }
  //currentPosition and songLength are values in Milliseconds

  render() {
    return (
      <div id="player-container">
        <div id="player-controls">
          <div className="row right">
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
          <input
            type="range"
            min="1"
            max="100"
            onInput={this.onInput.bind(this)}
            defaultValue={0}
            className="slider"
            id="myRange"
          />
        </div>
      </div>
    )
  }
}
