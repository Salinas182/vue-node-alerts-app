export function sortAlertsByName(alertsObject) {
  const sortedArray = Object.entries(alertsObject).sort((a, b) => {
    if (a[1].title < b[1].title) return -1;
    if (a[1].title > b[1].title) return 1;
    return 0;
  })
  return sortedArray;
}

export function sortAlertsByPriority(alertsObject, priorityObject) {
  const alertsArray = Object.entries(alertsObject);
  const sortedArray = alertsArray.sort((a, b) => {
    const priorityA = priorityObject[a[0]];
    const priorityB = priorityObject[b[0]];
    return priorityA - priorityB;
  })
  return sortedArray;
}
