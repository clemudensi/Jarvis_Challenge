import React, {useEffect} from 'react';
import {Table} from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash'
import {fetchStream} from '../actions/get_streams'

const PriceFeeds = (props) => {
  const {get_streams: {streams}} = props;

    useEffect(() => {
        setInterval(props.fetchStream, 600000)
    }, []);

  return(
    <Table striped bordered hover>
      <thead>
      <tr>
        <th>Symbol</th>
        <th>Timestamp</th>
        <th>Provider</th>
        <th>Best Buy Price</th>
        <th>Best Sell Price</th>
      </tr>
      </thead>
      <tbody>
      {
          streams.map((streams, i) => (
              <tr key={i}>
                  <td>{streams.symbol}</td>
                  <td>{streams.timestamp}</td>
                  <td>{streams.bestBuyPrice.provider}</td>
                  <td>{streams.bestBuyPrice.value}</td>
                  <td>{streams.bestSellPrice.value}</td>
              </tr>
          ))
      }
      </tbody>
    </Table>
  )
};

export default connect(
  ({ get_streams }) => ({ get_streams }),
  { fetchStream })(PriceFeeds);