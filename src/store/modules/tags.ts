import router from "@/router";

const state: any = {
    tags:[],
    actived:{}
  };
  
  const mutations = {
    ADD_TAG:(state:any,data:any) => {
        state.actived = data
        const flag = state.tags.findIndex((item:any) => item.id == data.id)
        if(flag == -1) {
            state.tags.push(data)
        }
    },
    REMOVE_TAG:(state:any,id:number) => {
        const index = state.tags.findIndex((item:any) => item.id == id)
        state.tags.splice(index,1)
        if(state.tags[index-1]){
            state.actived = state.tags[index-1]
            router.push(`/${state.tags[index-1].route}`)
        }else if(state.tags[index+1]){
            state.actived = state.tags[index+1]
            router.push(`/${state.tags[index+1].route}`)
        }else{
            state.actived = {}
            router.push(`/`)
        }
    },
    ACTIVED:(state:any,data:any) => {
        state.actived = data
    },
  };
  
  const actions = {

  };
  
  const getters = {};
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  