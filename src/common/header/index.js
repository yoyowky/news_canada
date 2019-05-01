import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { actionCreactors } from "./store";
import { Link } from "react-router-dom";
import { actionCreators as loginActionCreators } from "../../pages/login/store";

import {
  HeadWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  SearchInfo,
  SerchInfoTitle,
  SerchInfoSwitch,
  SerchInfoItem,
  SerchInfoList,
  Addition,
  Button,
  SerchWrapper
} from "./style";

class Header extends Component {
  getListArea() {
    const {
      focused,
      mouseIn,
      list,
      page,
      totalPage,
      handleMouseEnter,
      handleMouseLeave,
      handleChangePage
    } = this.props;
    const newList = list.toJS();
    const pageList = [];

    if (newList.length) {
      //只有list中不是空的时候，才做这个循环
      for (let i = (page - 1) * 10; i < page * 10; i++) {
        pageList.push(
          <SerchInfoItem key={newList[i]}>{newList[i]}</SerchInfoItem>
        );
      }
    }

    if (focused || mouseIn) {
      return (
        <SearchInfo
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SerchInfoTitle>
            Serach
            <SerchInfoSwitch
              onClick={() => handleChangePage(page, totalPage, this.spinIcon)}
            >
              <span
                ref={icon => {
                  this.spinIcon = icon;
                }}
                className="iconfont spin"
              >
                &#xe851;
              </span>
              {/*ref可以获取span标签真实的DOM节点*/}
              Refresh
            </SerchInfoSwitch>
          </SerchInfoTitle>
          <SerchInfoList>{pageList}</SerchInfoList>
        </SearchInfo>
      );
    } else {
      return null;
    }
  }
  render() {
    const {
      focused,
      handleFocus,
      handleBlur,
      list,
      login,
      logout
    } = this.props;
    return (
      <HeadWrapper>
        <Link to="/">
          <Logo />
        </Link>
        <Nav>
          <Link to="/">
            <NavItem className="left active">Home</NavItem>
          </Link>
          <NavItem className="left" />
          {login ? (
            <NavItem onClick={logout} className="right">
              退出
            </NavItem>
          ) : (
            <Link to="/login">
              <NavItem className="right">Login</NavItem>
            </Link>
          )}
          <NavItem className="right">
            <span className="iconfont">&#xe636;</span>
          </NavItem>
          <SerchWrapper>
            <CSSTransition in={focused} timeout={200} className="slide">
              <NavSearch
                className={focused ? "focused" : ""}
                onFocus={() => handleFocus(list)}
                onBlur={handleBlur}
              />
            </CSSTransition>
            <span
              className={focused ? "focused iconfont zoom" : "iconfont zoom"}
            >
              &#xe623;
            </span>
            {this.getListArea()}
          </SerchWrapper>
        </Nav>
        <Addition>
          <Button className="writting">
            <span className="iconfont">&#xe642;</span>
            Write
          </Button>
          <Button className="reg">Register</Button>
        </Addition>
      </HeadWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    focused: state.getIn(["header", "focused"]),
    list: state.getIn(["header", "list"]),
    //immutable里的getIn方法，可以引入数组，上面的写法等价于focused: state.get(header).get("focused")
    //因为reducer转移到store文件夹里，数据结构多了一层
    page: state.getIn(["header", "page"]),
    totalPage: state.getIn(["header", "totalPage"]),
    mouseIn: state.getIn(["header", "mouseIn"]),
    login: state.getIn(["login", "login"])
  };
};

const mapDispathToProps = dispatch => {
  return {
    handleFocus(list) {
      //console.log(list.size);
      list.size === 0 && dispatch(actionCreactors.getList());
      dispatch(actionCreactors.serchFocus());
    },
    handleBlur() {
      dispatch(actionCreactors.serchBlur());
    },
    handleMouseEnter() {
      dispatch(actionCreactors.serchMouseEnter());
    },
    handleMouseLeave() {
      dispatch(actionCreactors.serchMouseLeave());
    },
    handleChangePage(page, totalPage, spin) {
      let originAngle = spin.style.transform.replace(/[^0-9]/gi, "");
      if (originAngle) {
        originAngle = parseInt(originAngle, 10);
      } else {
        originAngle = 0;
      }
      spin.style.transform = "rotate(" + (originAngle + 360) + "deg)";

      if (page < totalPage) {
        dispatch(actionCreactors.serchChangePage(page + 1));
      } else if ((page = totalPage)) {
        dispatch(actionCreactors.serchChangePage(1));
      }
    },
    logout() {
      dispatch(loginActionCreators.logout());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Header);

/*.slide-enter {
    width: 160px;
    transition: all 0.2s ease-out;
  }
  .slide-enter-active {
    width: 220px;
  }
  .slide-enter-done {
    width: 220px;
  }
  .slide-exit {
    transition: all 0.2s ease-out;
  }
  .slide-exit-active {
    width: 160px;
  }
  
   
  */
