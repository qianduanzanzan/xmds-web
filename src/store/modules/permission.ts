import {getRouter} from "@/api/menu"

const state: any = {
    routers:[]
  };
  
  const mutations = {
    SET_ROUTERS:(state:any,data:any) => {
        state.routers = data
    },
    REMOVE_ROUTERS:(state:any) => {
      state.routers = []
  }
  };
  
  const actions = {
      getRoute:async function({commit}:any,data:any) {
        const res = await getRouter(data)
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
  