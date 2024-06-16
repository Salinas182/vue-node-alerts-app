export default async function getAlerts() {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/alerts`);
  const data = await response.json();
  return data.alerts;
}
