import React, { Component } from "react";
import { GlobalStyle } from "./style.js";
import { GlobalFont } from "./statics/iconfont/iconfont.js";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";
import store from "./store";
import Login from "./pages/login";

import Header from "./common/header/index.js";

class App extends Component {
  render() {
    return (
      <div>
        <GlobalStyle />
        <GlobalFont />
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Header />
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/detail/:id" exact component={Detail} />
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}
export default App;
