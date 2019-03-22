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
export class ScrollTable extends React.Component {
  // [{id: 1, song: 'a',album: 'a'}]

  formatData() {
    return this.props.playList.reduce((accumulator, currentValue) => {
      accumulator.push(currentValue.song)
      return accumulator
    }, [])
  }

  render() {
    return (
      <div>
        {this.props.playList ? (
          <BootstrapTable
            scrollTop="Top"
            maxHeight="650px"
            bordered={false}
            data={this.formatData()}
            hover
          >
            <TableHeaderColumn dataField="artist">Artist</TableHeaderColumn>
            <TableHeaderColumn dataField="title" isKey>
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
