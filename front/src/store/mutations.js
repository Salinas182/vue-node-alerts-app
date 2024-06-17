const mutations = {
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
};

export default mutations;
