import { all } from 'redux-saga/effects'
import actionWatchStreams from "./get_streams";

export default function* rootSaga() {
  yield all([
    actionWatchStreams()
  ])
}