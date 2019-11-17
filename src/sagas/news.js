import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as api from "../api/news";
import { newsReadRequest, newsReadSuccess, newsReadFailure } from "../actions";

function* fetchNews() {
  try {
    const { data } = yield call(api.readNews);
    yield put(newsReadSuccess([...data]));
  } catch (e) {
    console.log(e);
    yield put(newsReadFailure());
  }
}

function* watchNewsRequests() {
  yield takeEvery(newsReadRequest, fetchNews);
}

export { watchNewsRequests };
