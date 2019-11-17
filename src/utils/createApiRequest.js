import axios from "axios";
import config from "../config/index";

export default (method, endpoint, data) =>
  axios({ method, url: config.api + endpoint, data });
