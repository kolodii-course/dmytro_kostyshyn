export function getOutages() {
  return fetch("/api/outage").then((date) => date.json());
}
