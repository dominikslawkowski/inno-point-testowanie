import { GET, PUT, POST, DELETE } from "../utils/constants";
import createApiRequest from "../utils/createApiRequest";
import axios from "axios";
import config from "../config";

const readNews = () => {
  return axios.put(`${config.api}/news`, {
    token: localStorage.getItem("token")
  });
};

const createNews = news =>
  createApiRequest(POST, "/news", {
    token: localStorage.getItem("token"),
    news
  });

const updateNews = (id, news) =>
  createApiRequest(PUT, `/news/${id}`, {
    token: localStorage.getItem("token"),
    news
  });

const deleteNews = id =>
  createApiRequest(DELETE, `/news/${id}`, {
    token: localStorage.getItem("token")
  });

const verifyNews = id =>
  createApiRequest(PUT, `/news/verify/${id}`, {
    token: localStorage.getItem("token")
  });

export { readNews, createNews, updateNews, deleteNews, verifyNews };
