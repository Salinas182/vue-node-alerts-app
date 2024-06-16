const { getAlertsInfo, getPriorityInfo } = require('../api');

describe('API Functions', () => {
  describe('getAlertsInfo', () => {
    it('should return alerts data', () => {
      const alerts = getAlertsInfo();
      expect(alerts).toBeDefined();
      expect(alerts.length).toBeGreaterThan(0); 
    });
  });

  describe('getPriorityInfo', () => {
    it('should return priority data', () => {
      const priority = getPriorityInfo();
      expect(priority).toBeDefined();
    });
  });
});
