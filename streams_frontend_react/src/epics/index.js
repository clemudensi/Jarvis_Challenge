import {combineEpics} from "redux-observable";
import {fetchStreams, addStream} from "./epic_streams";


export const rootEpic = combineEpics(
  fetchStreams,
  addStream
);