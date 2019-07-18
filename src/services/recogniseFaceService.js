import http from "../services/httpService.js";
import config from "../config.json";

export function switchFaceRecognition(request) {
  const action = request ? "/recognise-on" : "/recognise-off";
  return http.get(config.recognise + action);
}
