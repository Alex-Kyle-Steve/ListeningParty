import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {Button} from 'react-bootstrap'
export class SpotifyCatalogScrollTable extends Component {
  constructor() {
    super()
  }
  formatData() {
    let songObj = {}
    return this.props.tracks.items.reduce((accumulator, currentValue) => {
      songObj = {
        album: currentValue.album.name,
        artist: currentValue.album.artists[0].name,
        song: currentValue.name
      }
      accumulator.push(songObj)
      songObj = {}
      return accumulator
    }, [])
  }

  //Adds an "Add" Button to the table
  showButton() {
    return (
      <Button variant="primary" onClick={this.handleClick}>
        Add
      </Button>
    )
  }
  render() {
    console.log(this.props.tracks)
    return (
      <div>
        {this.props.tracks.items.length !== 0 ? (
          <BootstrapTable
            scrollTop="Top"
            maxHeight="400px"
            bordered={false}
            data={this.formatData()}
            hover
          >
            <TableHeaderColumn dataField="artist">Artist</TableHeaderColumn>
            <TableHeaderColumn dataField="song" isKey>
              Song
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
