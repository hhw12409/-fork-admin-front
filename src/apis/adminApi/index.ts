import { Config } from "@/shared/config";
// import getToken from "Apis/getToken";
import axios from "axios";
import ApiContainer from "..";

const Instance = axios.create({
  baseURL: Config.AdminHost.base,
});

const AdminApi = ApiContainer(Instance);

export default AdminApi;
