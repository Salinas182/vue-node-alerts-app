export default async function getPriority() {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/priority`);
  const data = await response.json();
  return data.priority;
}
