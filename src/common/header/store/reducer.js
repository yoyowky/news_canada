import * as constants from "./constants";
import { fromJS } from "immutable"; //immutable库
//immutable对象

const defaultState = fromJS({
  focused: false,
  mouseIn: false,
  list: [],
  page: 1,
  totalPage: 1
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.SEARCH_FOCUS:
      return state.set("focused", true);
    //immutable对象的set方法，会结合之前的immutable对象的值和设置的值，返回一个全新的对象

    case constants.SEARCH_BLUR:
      return state.set("focused", false);

    case constants.CHANGE_LIST: //有很多set的时候用merge
      return state.merge({
        list: action.data,
        totalPage: action.totalPage
      });

    case constants.SERCH_MOUTHENTER:
      return state.set("mouseIn", true);

    case constants.SERCH_MOUTHLEAVE:
      return state.set("mouseIn", false);

    case constants.SERCH_CHANGEPAGE:
      return state.set("page", action.page);

    default:
      return state;
  }
}; //if语句改成switch会简单些
