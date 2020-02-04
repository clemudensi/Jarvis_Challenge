import { put, takeEvery } from 'redux-saga/effects';
import { ajax } from "rxjs/ajax";
import {FETCH_STREAMS} from "../actions/get_streams";

function* fetchStreams() {
  const $source = yield ajax.getJSON(`http://localhost:80/api/pricefeeds`);
  yield put({ type: FETCH_STREAMS, $source })
}

export default function* actionWatchStreams() {
  yield takeEvery(FETCH_STREAMS, fetchStreams)
}
