import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as api from "../api/projects";
import {
  projectsReadRequest,
  projectsReadSuccess,
  projectsReadFailure
} from "../actions";

function* fetchProjects() {
  try {
    const { data } = yield call(api.readProjects);
    yield put(projectsReadSuccess([...data]));
  } catch (e) {
    console.log(e);
    yield put(projectsReadFailure());
  }
}

function* watchProjectsRequests() {
  yield takeEvery(projectsReadRequest, fetchProjects);
}

export { watchProjectsRequests };
