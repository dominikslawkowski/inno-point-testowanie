import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as api from "../api/teams";
import {
  teamsReadRequest,
  teamsReadSuccess,
  teamsReadFailure
} from "../actions";

function* fetchTeams() {
  try {
    const { data } = yield call(api.readTeams);
    yield put(teamsReadSuccess([...data]));
  } catch (e) {
    console.log(e);
    yield put(teamsReadFailure());
  }
}

function* watchTeamsRequests() {
  yield takeEvery(teamsReadRequest, fetchTeams);
}

export { watchTeamsRequests };
