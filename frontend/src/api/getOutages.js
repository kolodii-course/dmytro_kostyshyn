export function getOutages() {
  return fetch("/api/outages").then((date) => date.json());
}
