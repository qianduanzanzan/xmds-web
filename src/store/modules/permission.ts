import {getAuthMenu} from "@/api/menu"

const state: any = {
    routers:[],
    isGet:false
  };
  
  const mutations = {
    SET_ROUTERS:(state:any,data:any) => {
        state.routers = data
        state.isGet = true
    },
    REMOVE_ROUTERS:(state:any) => {
      state.routers = []
      state.isGet = false
  }
  };
  
  const actions = {
      getRoute:async function({commit}:any,data:any) {
        const res = await getAuthMenu(data)
        commit("SET_ROUTERS",res.data || [])
      }
  };
  
  const getters = {};
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  