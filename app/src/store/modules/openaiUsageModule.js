import { getFirestore, doc, getDoc } from "firebase/firestore"; 

const db = getFirestore();

const openaiUsageModule = {
  state: () => ({
    data: null,
    loading: false,
    error: null
  }),
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    async fetchData({ commit }) {
      commit('setLoading', true);
      try {
        const docRef = doc(db, "widgets", "widgetId");  // Replace "widgetId" with actual ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          commit('setData', docSnap.data());
        } else {
          commit('setError', 'No such document!');
        }
      } catch (error) {
        commit('setError', error.message);
      } finally {
        commit('setLoading', false);
      }
    }
  }
}
