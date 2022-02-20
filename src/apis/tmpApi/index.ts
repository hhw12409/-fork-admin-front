import { Config } from "@/shared/config";
// import getToken from "Apis/getToken";
import axios from "axios";
import ApiContainer from "..";

const Instance = axios.create({
  baseURL: Config.TmpHost.base,
});

Instance.interceptors.request.use(async (config) => {
  // const authorization = await getToken();
  if (config?.headers) {
    config.headers["content-type"] = "application/json; charset=utf-8";
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    config.headers["Accept"] = "*/*";
    // if (authorization) config.headers["authorization"] = authorization;
  }
  return config;
});
const TmpApi = ApiContainer(Instance);

export default TmpApi;
