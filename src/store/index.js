import Vuex from "vuex";
import VuexPersistance from "vuex-persist";

const vuexLocal = new VuexPersistance({
  storage: window.localStorage
});
export default new Vuex.Store({
  state: {
    noteList:[],
  },
  plugins: [vuexLocal.plugin],
  mutations: {
    addNote: function (state, note) {
      
      state.noteList.push(note); // Add a new note
    },
    updateNote: function (state, { index, note }) {
      state.noteList[index] = note; // Update a specific note by index
    },
    deleteNote: function (state, index) {
      state.noteList.splice(index, 1); // Remove a note by index
    },
  },
  actions: {}
});
