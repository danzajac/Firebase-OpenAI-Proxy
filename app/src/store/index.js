import { createStore } from 'vuex';
import { getFirestore, collection, onSnapshot, query, orderBy, where, Timestamp } from 'firebase/firestore';

const db = getFirestore();

export default createStore({
  state: {
    usageData: [],
    loading: false,
    error: null,
    startDate: null,
    endDate: null
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
    },
    setDateRange(state, { startDate, endDate }) {
      state.startDate = startDate;
      state.endDate = endDate;
    }
  },
  actions: {
    fetchUsageData({ commit }, { startDate, endDate }) {
      commit('setLoading', true);

      // Convert dates to Timestamps if they are not already
      const startTimestamp = startDate instanceof Timestamp ? startDate : Timestamp.fromDate(new Date(startDate));
      const endTimestamp = endDate instanceof Timestamp ? endDate : Timestamp.fromDate(new Date(endDate));
      
      let q = query(
        collection(db, "openaiUsage"),
        orderBy("createdAt", "desc")
      );

      if (startDate && endDate) {
        q = query(
          collection(db, "openaiUsage"), 
          where("createdAt", ">=", startTimestamp),
          where("createdAt", "<=", endTimestamp),
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
          commit('setLoading', false);
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
