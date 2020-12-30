const state: any = {
  token: "",
  userName: "",
  avatar: "",
  role: null,
  auths: null,
};

const mutations = {
  SET_USER_INFO(state: any, userInfo: any) {
    state.token = userInfo.token;
    state.userName = userInfo.userName;
    state.avatar = userInfo.avatar;
    state.role = userInfo.role;
    state.auths = userInfo.auths;
  },

  REMOVE_USER_INFO(state: any) {
    state.token = "";
    state.userName = "";
    state.avatar = "";
    state.role = null;
    state.auths = null;
  },
};

const actions = {};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
