import Vue from "vue";
import Vuex from "vuex";

import cities from "../assets/cities.json";
import books from "../assets/books.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    city: { data: cities, selected: "" },
    book: { data: books, selected: { title: "", author: "" } },
  },

  mutations: {
    selectItem(state, payload) {
      state[payload.name].selected = payload.value;
    },
  },

  getters: {
    city: (state) => {
      return state.city.selected;
    },

    book: (state) => {
      return state.book.selected.title;
    },

    cityFilter: (state) => (value) => {
      return state.city.data.filter((i) =>
        i.toLowerCase().includes(value.toLowerCase())
      );
    },

    bookFilter: (state) => (value) => {
      return state.book.data.filter((i) =>
        i.title.toLowerCase().includes(value.toLowerCase())
      );
    },
  },
});
