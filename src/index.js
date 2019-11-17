import React, { useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import createSagaMiddleware from "redux-saga";

import { SnackbarProvider } from "notistack";

import { Welcome, Dashboard, FirstForm, Loading } from "./views";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

import reducers from "./reducers";
import mySaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: reducers,
  middleware: [...getDefaultMiddleware(), sagaMiddleware]
});
sagaMiddleware.run(mySaga);

const App = props => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Welcome} />
          <Route path="/first_login" component={FirstForm} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/loading" component={Loading} />
        </Fragment>
      </Router>
    </Provider>
  );
};

const IntegrationNotistack = () => (
  <SnackbarProvider maxSnack={3}>
    <App />
  </SnackbarProvider>
);

ReactDOM.render(<IntegrationNotistack />, document.getElementById("root"));
serviceWorker.unregister();
