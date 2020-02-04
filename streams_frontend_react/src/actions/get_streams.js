export const FETCH_STREAMS = 'FETCH_STREAMS';
export const FETCH_STREAM_SUCCESS = 'FETCH_STREAM_SUCCESS';
export const FAILED_GET_STREAM = 'FAILED_GET_STREAM';
export const FAILED_ADD_STREAM = 'FAILED_GET_STREAM';
export const ADD_STREAM = 'ADD_STREAM';
export const ADD_STREAM_SUCCESS = 'ADD_STREAM_SUCCESS';

export const fetchStream = () => ({
  type: FETCH_STREAMS
});

export const fetchStreamSuccess = streams => ({
  type: FETCH_STREAM_SUCCESS,
  streams
});

export const addStream = priceFeed => ({
  type: ADD_STREAM,
  priceFeed
});

export const addStreamSuccess = stream => ({
  type: ADD_STREAM_SUCCESS,
  stream
});

