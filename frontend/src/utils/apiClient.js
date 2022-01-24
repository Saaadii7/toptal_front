import axios from './axios';
import { logout, checkAuth } from './auth';
import withQuery from "with-query";
import { Router } from 'react-router-dom'

const apiUrl = process.env.REACT_APP_API_URL;

const checkStatus = (response) => {
  if (response.status == 200) {
    return response.data;
  } else {
    const error = new Error(response.status);
    error.response = response;
    return Promise.reject(error);
  }
};

const handleError = (error) => {
  if (error.response.status === 401) {
    // logout()
  }
  if (error.response.status === 403) {
    Router.push("/");
  }
  return Promise.reject(error.response.data);
};

class ApiClient {
  constructor(apiUrl) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    this.config = config;
    this.apiUrl = apiUrl;
  }

  doRequest(method, path, data) {
    const token = checkAuth();
    switch (method) {
      case "get":
      case "GET":
        return this.get(path, data, token);

      case "post":
      case "POST":
        return this.post(path, data, token);

      case "patch":
      case "PATCH":
        return this.patch(path, data, token);

      case "put":
      case "PUT":
        return this.put(path, data, token);

      case "delete":
      case "DELETE":
        return this.delete(path, data, token);

      default:
        return this.get(path, data, token);
    }
  }

  setHeader(config, token){
    const { headers } = config;
    return token ? { ...config, headers: { ...headers, 'Authorization': `Bearer ${token}` } } : config
  }

  get(path, data, token) {
    const url = withQuery(this.apiUrl + path, data);
    const config = this.setHeader({ ...this.config, method: "GET" }, token);
    return axios.get(url, { headers: config.headers }).then(checkStatus).catch(handleError);
  }

  post(path, data, token) {
    const url = this.apiUrl + path;
    const config = this.setHeader({ ...this.config, method: "POST", body: data }, token);
    return axios.post(url, config.body, config.headers).then(checkStatus).catch(handleError);
  }

  delete(path, data, token) {
    const url = this.apiUrl + path;
    const config = this.setHeader({ ...this.config, method: "DELETE", body: data }, token);
    return axios.delete(url, config.body, config.headers).then(checkStatus).catch(handleError);
  }

  patch(path, data, token) {
    const url = this.apiUrl + path;
    const config = this.setHeader({ ...this.config, method: "PATCH", body: data }, token);
    return axios.patch(url, config.body, config.headers).then(checkStatus).catch(handleError);
  }

  put(path, data, token) {
    const url = this.apiUrl + path;
    const config = this.setHeader({ ...this.config, method: "PUT", body: data }, token);
    return axios.put(url, config.body, config.headers).then(checkStatus).catch(handleError);
  }
}

export default new ApiClient(apiUrl)