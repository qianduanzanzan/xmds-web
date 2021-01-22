const state: any = {
  token: "",
  userName: "",
  avatar: "",
  auths: null,
  id: null,
  isGet:false
};

const mutations = {
  SET_USER_INFO(state: any, userInfo: any) {
    state.token = userInfo.token;
    state.userName = userInfo.userName;
    state.avatar = userInfo.avatar;
    state.auths = userInfo.auths;
    state.id = userInfo.id;
    state.isGet = true
  },

  REMOVE_USER_INFO(state: any) {
    state.token = "";
    state.userName = "";
    state.avatar = "";
    state.auths = null;
    state.isGet = false
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
