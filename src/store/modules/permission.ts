import {getRouter} from "@/api/menu"

// export const filterAsyncRoutes = (routes: any[]) => {
//     return routes.map((route) => {
//       if(route.pid == 0){
//           if(route.status == 0){
//               route.children = []
//           }
//       }
//     })
//   }

const state: any = {
    routers:[]
  };
  
  const mutations = {
    SET_ROUTERS:(state:any,data:any) => {
        state.routers = data
    }
  };
  
  const actions = {
      getRoute:async function({commit}:any,data:any) {
        const res = await getRouter(data)
        commit("SET_ROUTERS",res.data)
        console.log(res)
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
  