import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {
  Card,
  Container,
  Row,
  Col,
  Table,
  Image,
  Modal,
  Popover,
  Jumbotron
} from 'react-bootstrap'
export class SpotifyCatalogScrollTable extends React.Component {
  // [{id: 1, song: 'a',album: 'a'}]

  formatData() {
    console.log('format this', this.props.tracks)
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
            <TableHeaderColumn dataField="song" isKey>
              Song
            </TableHeaderColumn>
            <TableHeaderColumn dataField="album">Album</TableHeaderColumn>
          </BootstrapTable>
        ) : (
          ''
        )}
      </div>
    )
  }
}
