import {
  FETCH_STREAMS,
  FETCH_STREAM_SUCCESS,
  FAILED_ADD_STREAM,
  ADD_STREAM,
  ADD_STREAM_SUCCESS, FAILED_GET_STREAM
} from "../actions/get_streams";
import { assignStream} from "../epics/epic_streams";

const initialState = { loading: true, streams: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STREAM_SUCCESS:
      return {
        loading: false,
        streams: action.streams,
        error: null
      };
    case ADD_STREAM_SUCCESS:
      return {
        loading: false,
        streams: state.streams.concat(assignStream(action.stream)),
        error: null
      };
    case FAILED_GET_STREAM:
      return {
        loading: false,
        streams: [],
        error: 'There was an error fetching stream'
      };
    case FAILED_ADD_STREAM:
      return {
        loading: false,
        streams: [],
        error: 'There was an error adding stream'
      };
    default:
      return state;
  }
}