const alertsInfo = require('./alerts.json');
const priorityInfo = require('./priority.json');

function getAlertsInfo() {
  return alertsInfo.alerts;
}

function getPriorityInfo() {
  return priorityInfo.priority;
}

module.exports = { getAlertsInfo, getPriorityInfo };