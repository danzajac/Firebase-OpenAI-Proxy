import { createStore } from 'vuex';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { orderBy, query } from 'firebase/firestore';


const db = getFirestore();

export default createStore({
  state: {
    usageData: []
  },
  mutations: {
    setUsageData(state, payload) {
      state.usageData = payload;
    }
  },
  actions: {
    async fetchUsageData({ commit }) {
      const q = query(collection(db, "openaiUsage"), orderBy("createdAt", "desc")); // Replace "someField" with the field you want to sort by
      const querySnapshot = await getDocs(q);
      const allData = [];
      querySnapshot.forEach((doc) => {
        allData.push(doc.data());
      });
      commit('setUsageData', allData);
    }
  }
});
