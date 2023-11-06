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
    fetchData({ commit }) {
      // Set loading to true when starting to fetch or set up the subscription
      commit('setLoading', true);
      
      const docRef = doc(db, "widgets", "widgetId"); // Replace "widgetId" with actual ID
      
      // Subscribe to real-time updates
      const unsubscribe = docRef.onSnapshot(
        (docSnap) => {
          if (docSnap.exists()) {
            commit('setData', docSnap.data());
          } else {
            commit('setError', 'No such document!');
          }
          // Set loading to false only the first time when subscription is successfully set up
          if (commit.state.loading === true) {
            commit('setLoading', false);
          }
        },
        (error) => {
          commit('setError', error.message);
          commit('setLoading', false); // Set loading to false if an error occurs
        }
      );
      
      // Return the unsubscribe function to stop listening to changes
      return unsubscribe;
    }
  }
  
  
}
