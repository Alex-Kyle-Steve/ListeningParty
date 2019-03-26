import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {Button} from 'react-bootstrap'
export class SpotifyCatalogScrollTable extends Component {
  constructor(props) {
    super(props)
    this.showButton = this.showButton.bind(this)
  }
  formatData() {
    let songObj = {}
    return this.props.tracks.items.reduce((accumulator, currentValue) => {
      console.log(currentValue)
      songObj = {
        album: currentValue.album.name,
        artist: currentValue.album.artists[0].name,
        title: currentValue.name,
        uri: currentValue.uri
      }
      accumulator.push(songObj)
      songObj = {}
      return accumulator
    }, [])
  }

  //Adds an "Add" Button to the table
  showButton(_, song) {
    const addTrack = this.props.addTrack
    return (
      <Button
        variant="primary"
        onClick={() => {
          console.log('adding song:', song)
          addTrack(song)
        }}
      >
        Add
      </Button>
    )
  }

  render() {
    return (
      <div>
        {this.props.tracks ? (
          <BootstrapTable
            scrollTop="Top"
            maxHeight="400px"
            bordered={false}
            data={this.formatData()}
            hover
          >
            <TableHeaderColumn dataField="artist">Artist</TableHeaderColumn>
            <TableHeaderColumn dataField="title" isKey>
              Title
            </TableHeaderColumn>
            <TableHeaderColumn dataField="album">Album</TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.showButton}>
              Cue
            </TableHeaderColumn>
          </BootstrapTable>
        ) : (
          ''
        )}
      </div>
    )
  }
}
