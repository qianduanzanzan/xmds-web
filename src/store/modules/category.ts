import { getAllCate } from "@/api/category";

const state: any = {
  category: [],
};

const mutations = {
  SET_CATEGORY: (state: any, data: any) => {
    state.category = data.map((item: any) => {
      return {
        id: item.id,
        categoryName: item.categoryName,
      };
    });
  },
};

const actions = {
  getCategory: async function({ commit }: any) {
    const res = await getAllCate();
    commit("SET_CATEGORY", res.data || []);
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
