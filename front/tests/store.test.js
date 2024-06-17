import { createApp } from 'vue';
import { createStore } from 'vuex';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import actions from '../src/store/actions';
import mutations from '../src/store/mutations';
import getters from '../src/store/getters';
import state from '../src/store/state';

describe('Vuex Store', () => {
  let store;
  const mockAlerts = {
    id1: { title: 'Test Alert 1', image: 'https://mockImage.svg' } ,
    id2: { title: 'Test Alert 2', image: 'https://mockImage2.svg' } ,
  };
  const mockPriority = { mockKey1: 1, mockKey2: 2, mockKey3: 3 };
  const mockNewAlert = { key: 'New', data: { title: 'New Alert', image: 'new_alert.jpg' } };
  const mockNewPriority = { key: 'mockNewKey', value: 1 };

  beforeEach(() => {
    const app = createApp({});
    app.use(store);
    store = createStore({
      state: { ...state },
      mutations,
      actions,
      getters
    });
    vi.clearAllMocks();
  });

  describe('Mutations', () => {
    it('setAlerts saves the existing alerts to the state', () => {
      store.commit('setAlerts', mockAlerts);
      expect(store.state.alerts).toEqual(mockAlerts);
    });

    it('setPriority saves the existing priority info to the state', () => {
      store.commit('setPriority', mockPriority);
      expect(store.state.priority).toEqual(mockPriority);
    });

    it('addAlert adds a new alert to the state', () => {
      store.commit('addAlert', mockNewAlert);
      expect(store.state.alerts['New']).toEqual(mockNewAlert.data);
    });

    it('addPriority adds a new priority info to the state', () => {
      store.commit('addPriority', mockNewPriority);
      expect(store.state.priority['mockNewKey']).toEqual(mockNewPriority.value);
    });
  });

  describe('Actions', () => { 
    it('addAlert action calls the addAlert mutation', async () => {
      await store.dispatch('addAlert', mockNewAlert);
      expect(store.state.alerts['New']).toEqual(mockNewAlert.data);
    });

    it('addPriority action calls the addPriority mutation', async () => {
      await store.dispatch('addPriority', mockNewPriority);
      expect(store.state.priority['mockNewKey']).toEqual(mockNewPriority.value);
    });
  });
  
  describe('Getters', () => {
    beforeEach(() => {
      store.state.alerts = mockAlerts
      store.state.priority = mockPriority
    });

    it('getAllAlerts returns all the alerts', () => {
      const result = store.getters.getAllAlerts;
      expect(result).toEqual(store.state.alerts);
    });

    it('getPriority returns the priority info', () => {
      const result = store.getters.getPriority;
      expect(result).toEqual(store.state.priority);
    });
  });
});
