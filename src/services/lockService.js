import http from "../services/httpService.js";
import config from "../config.json";

export function getLockStatus() {
  return http.get(config.lockServiceEndPoint);
}
