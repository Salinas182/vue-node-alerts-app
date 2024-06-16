import { createStore } from 'vuex';
import getAlerts from '../api/alerts';
import getPriority from '../api/priority';

const store = createStore({
  state: {
    alerts: {},
    priority: {},
  },
  mutations: {
    setAlerts(state, alerts) {
      state.alerts = {
        ...state.alerts,
        ...alerts
      };
    },
    setPriority(state, priority) {
      state.priority = {
        ...state.priority,
        ...priority
      };
    },
    addAlert(state, { key, data }) {
      state.alerts = {
        ...state.alerts,
        [key]: data
      };
    },
    addPriority(state, { key, value }) {
      state.priority = {
        ...state.priority,
        [key]: value
      };
    }
  },
  actions: {
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
        console.error('Error fetching priority:', error);
      }
    },
    async addAlert({ commit }, { key, data }) {
      commit('addAlert', { key, data });
    },
    async addPriority({ commit }, { key, value }) {
      commit('addPriority', { key, value });
    }
  },
  getters: {
    getAllAlerts(state) {
      return state.alerts;
    },
    getPriority(state) {
      return state.priority;
    }
  }
});

export default store;
