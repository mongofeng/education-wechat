// TODO: 应用管理Vuex相关逻辑，待移除
import * as api from '@/api/wechat';
import * as apiStu from '@/api/student';
import * as type from '@/const/type/student';
import { ActionContext } from 'vuex';
import { accessTokenName } from '@/utils/http';

const ADD_OPENID = 'ADD_OPENID';
export const ADD_USERID = 'ADD_USERID';

const ADD_USER_MESSAGE_LIST = 'ADD_USER_MESSAGE_LIST';

const ADD_TOKEN = 'ADD_TOKEN';
export interface IState {
  openid: string;
  userid: string;
  userList: type.IStudent[];
  token: string;
}

// initial state
const state: IState = {
  openid: localStorage.getItem('openid') || '',
  userid: '',
  userList: [],
  token: '',
};

// getters
const getters = {
  openid: (state: IState) => state.openid,
  userMsg: (state: IState) => {
    if (!state.userid) {
      return {};
    }
    const find = state.userList.filter((item) => item._id === state.userid);
    if (!find || !find.length) {
      return {};
    }

    const [first] = find;
    return first ? first : {};
  },
  userListMsg: (state: IState) => {
    return state.userList.reduce((initVal: {[key in string]: string}, item) => {
      initVal[item._id] = item.name;
      return initVal;
    }, {});
  },
};

// actions
const actions = {
  async fetchOpenId({ commit }: ActionContext<IState, any>) {
    if (!/code=([^&]+)/.test(location.search) || !RegExp.$1) {
      console.error('当前没有code，不执行获取openid接口');
      // alert('当前没有code，不执行获取openid接口');
      return;
    }
    const code = RegExp.$1;
    // let { data } = await api.fetchOpenId({
    //   code,
    // });

    // if ((data  as any).data) {
    //   data = (data  as any).data;
    // }

    // localStorage.setItem('openid', data.openid);
    // localStorage.setItem('wechat', JSON.stringify(data));



    const {data: {
      data,
    }} = await api.openIdLogin({
      openId: code,
    });



    console.log(data);


    window.localStorage.setItem(
      accessTokenName,
      data.token,
    );

    commit(ADD_TOKEN, localStorage.getItem(accessTokenName));


    commit(ADD_OPENID, data.openid);

    localStorage.setItem('openid', data.openid);
  },

  async fetchUserId({ commit, state }: ActionContext<IState, any>) {
    if (!state.openid) {
      console.error('必须要有openid才可以获取userId');
      return;
    }

    // if (!state.token) {
    //   const {data: {
    //     data,
    //   }} = await api.openIdLogin({
    //     openId: state.openid,
    //   });
    //   console.log(data);
    //   window.localStorage.setItem(
    //     accessTokenName,
    //     data.token,
    //   );

    //   commit(ADD_TOKEN, localStorage.getItem(accessTokenName));
    // }





    const { data: {data: {list}} } = await apiStu.getStudentList({
      page: 1,
      limit: 50,
      query: {
        openId: state.openid,
      },
    });
    if (!list || !list.length) {
      console.warn('当前openid没有绑定');
      return;
    }


    commit(ADD_USER_MESSAGE_LIST, list);
    const [first] = list;
    if (!first) { return; }
    if (!state.userid) {
      commit(ADD_USERID, first._id);
    }
  },


  onChangeUser({ commit, state }: ActionContext<IState, any>, id: string) {
    const find = state.userList.filter((item) => item._id === id);
    if (!find || !find.length) {
      return;
    }

    const [first] = find;
    if (!first) { return; }
    commit(ADD_USERID, first._id);
  },
};

// mutations
const mutations = {
  [ADD_OPENID](state: IState, openid: string) {
    state.openid = openid;
  },
  [ADD_USERID](state: IState, userid: string) {
    state.userid = userid;
  },
  [ADD_USER_MESSAGE_LIST](state: IState, list: type.IStudent[]) {
    state.userList = list;
  },
  [ADD_TOKEN](state: IState, s: string) {
    state.token = s;
  },
};


export type Action = typeof actions;

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
