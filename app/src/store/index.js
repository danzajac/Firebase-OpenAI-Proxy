import { createStore } from 'vuex';
import { getFirestore, collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const db = getFirestore();

export default createStore({
  state: {
    usageData: [],
    loading: false,
    error: null
  },
  mutations: {
    setUsageData(state, payload) {
      state.usageData = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    fetchUsageData({ commit }, timeRangeInHours) {
      commit('setLoading', true);

      let q;
      if (typeof timeRangeInHours === 'number') {
        const currentTime = Timestamp.now();
        const startTime = Timestamp.fromMillis(currentTime.toMillis() - (timeRangeInHours * 3600 * 1000));
        q = query(
          collection(db, "openaiUsage"), 
          where("createdAt", ">=", startTime),
          orderBy("createdAt", "desc")
        );
      } else {
        q = query(
          collection(db, "openaiUsage"),
          orderBy("createdAt", "desc")
        );
      }
      
      const unsubscribe = onSnapshot(q,
        (querySnapshot) => {
          const allData = [];
          querySnapshot.forEach((doc) => {
            allData.push(doc.data());
          });
          commit('setUsageData', allData);
          if (this.state.loading === true) {
            commit('setLoading', false);
          }
          
        },
        (error) => {
          commit('setError', error.message);
          commit('setLoading', false);
        }
      );

      return unsubscribe;
    }
  }
});
