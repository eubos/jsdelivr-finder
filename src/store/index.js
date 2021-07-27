import Vue from 'vue';
import Vuex from 'vuex';

const algoliasearch = require('algoliasearch');

const client = algoliasearch('OFCNCOG2CU', 'f54e21fa3a2a0160595bb058179bfb1e', { protocol: 'https:' });
const index = client.initIndex('npm-search');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchReq: '',
    searchRes: [],
    onLoad: false,
    isError: false,
    isEmpty: false,
  },
  mutations: {
    setSearchReq(state, payload) {
      state.searchReq = payload;
    },
    setSearchRes(state, payload) {
      state.searchRes = payload;
    },
    setOnLoad(state, payload) {
      state.onLoad = payload;
    },
    setIsError(state, payload) {
      state.isError = payload;
    },
    setIsEmpty(state, payload) {
      state.isEmpty = payload;
    },
  },
  actions: {
    async getPackage({ commit }, payload) {
      commit('setOnLoad', true);
      index
        .search(payload, {
          hitsPerPage: 100,
        })
        .then(({ hits }) => {
          commit('setSearchRes', hits);
          commit('setOnLoad', false);
          commit('setIsError', false);
          commit('setIsEmpty', !hits.length);
        })
        .catch((err) => {
          console.log(err);
          commit('setIsError', true);
        });
    },
  },
  getters: {
    getSearchRes(state) {
      return state.searchRes;
    },
    getOnLoad(state) {
      return state.onLoad;
    },
    getIsError(state) {
      return state.isError;
    },
    getIsEmpty(state) {
      return state.isEmpty;
    },
  },
});
