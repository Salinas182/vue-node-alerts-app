import getAlerts from '../api/alerts';
import getPriority from '../api/priority';

const actions = {
  async fetchAlerts({ commit }) {
    try {
      const alertsResponse = await getAlerts();
      commit('setAlerts', alertsResponse[0]);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  },
  async fetchPriority({ commit }) {
    try {
      const priorityResponse = await getPriority();
      const priorityObject = priorityResponse.reduce((acc, item) => {
        const key = Object.keys(item)[0];
        acc[key] = item[key];
        return acc;
      }, {});
      commit('setPriority', priorityObject);
    } catch (error) {
      console.error('Error fetching priority info:', error);
    }
  },
  async addAlert({ commit }, { key, data }) {
    commit('addAlert', { key, data });
  },
  async addPriority({ commit }, { key, value }) {
    commit('addPriority', { key, value });
  }
};

export default actions;
