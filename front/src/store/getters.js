const getters = {
  getAllAlerts(state) {
    return state.alerts;
  },
  getPriority(state) {
    return state.priority;
  }
};

export default getters;
