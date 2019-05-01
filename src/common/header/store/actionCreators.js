import * as constants from "./constants";
import axios from "axios";
import { fromJS } from "immutable";

const changeList = data => ({
  type: constants.CHANGE_LIST,
  data: fromJS(data), //把data数据从数组类型变成immutable类型
  totalPage: Math.ceil(data.length / 10)
});

export const serchFocus = () => ({
  type: constants.SEARCH_FOCUS
});

export const serchBlur = () => ({
  type: constants.SEARCH_BLUR
});

export const getList = () => {
  return dispatch => {
    axios
      .get("./api/headerList.json")
      .then(res => {
        const data = res.data;
        dispatch(changeList(data.data));
      })
      .catch(() => {
        console.log("error");
      });
  };
}; //用了redux-thunk，可以返回一个函数

export const serchMouseEnter = () => ({
  type: constants.SERCH_MOUTHENTER
});

export const serchMouseLeave = () => ({
  type: constants.SERCH_MOUTHLEAVE
});

export const serchChangePage = page => ({
  type: constants.SERCH_CHANGEPAGE,
  page
});
