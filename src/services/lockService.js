import http from "../services/httpService.js";
import config from "../config.json";

export function getLockStatus() {
  return http.get(config.getStatus);
}

export function lock(isLocked) {
  const action = isLocked ? "/unlock" : "/lock";
  console.log(config.lock + action);
  return http.get(config.lock + action);
}
