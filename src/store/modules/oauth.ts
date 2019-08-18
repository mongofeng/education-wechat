// TODO: 应用管理Vuex相关逻辑，待移除
import * as api from '@/api/wechat';
import * as apiStu from '@/api/student';
import * as type from '@/const/type/student';
import { ActionContext } from 'vuex';

const ADD_OPENID = 'ADD_OPENID';
export const ADD_USERID = 'ADD_USERID';

const ADD_USER_MESSAGE = 'ADD_USER_MESSAGE';
const ADD_USER_MESSAGE_LIST = 'ADD_USER_MESSAGE_LIST';
export interface IState {
  openid: string;
  userid: string;
  userMsg: type.IStudent | null;
  userList: type.IStudent[];
}

// initial state
const state: IState = {
  openid: localStorage.getItem('openid') || '',
  userid: '',
  userMsg: null,
  userList: [],
};

// getters
const getters = {
  openid: (state: IState) => state.openid,
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
    const { data } = await api.fetchOpenId({
      code,
    });

    // {
    //   access_token: "21_PfvmJCQ0lfGVhF2_rT-Cc44OOZ2snNM52iDKBOwl0CRAsc4BlqwiTQmuEwg5fa1UrJLe4G3Adny27h1kcGbPag",
    //   expires_in: 7200,
    //   refresh_token: "21_paF-7xYUSMPWbLpZG7bYod9w9LKRUUuvXmE8axVF5uJ-I-RGr5N3dqpqidAy4cw58MA0HaG1mQmsQr1_pp8q7Q",
    //   openid: "oVB5OwyVDKfTZq4T61_p2roSg1tA",
    //   scope: "snsapi_base"}
    console.log(data);
    localStorage.setItem('openid', data.openid);
    localStorage.setItem('wechat', JSON.stringify(data));
    commit(ADD_OPENID, data.openid);
  },

  async fetchUserId({ commit, state }: ActionContext<IState, any>) {
    if (!state.openid) {
      console.error('必须要有openid才可以获取userId');
      return;
    }
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
    const [first] = list;
    commit(ADD_USER_MESSAGE_LIST, list);
    if (!first) { return; }
    commit(ADD_USERID, first._id);
    commit(ADD_USER_MESSAGE, first);
  },


  onChangeUser({ commit, state }: ActionContext<IState, any>, id: string) {
    const find = state.userList.filter((item) => item._id === id);
    if (!find || !find.length) {
      return;
    }

    const [first] = find;
    if (!first) { return; }
    commit(ADD_USERID, first._id);
    commit(ADD_USER_MESSAGE, first);
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
  [ADD_USER_MESSAGE](state: IState, user: type.IStudent) {
    state.userMsg = user;
  },
  [ADD_USER_MESSAGE_LIST](state: IState, list: type.IStudent[]) {
    state.userList = list;
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
