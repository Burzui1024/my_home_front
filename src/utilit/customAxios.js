import axios from "axios";

export function customAxios(method, url, token, data, blob = false, callback, errorcallback) {

  let axiosConfig = {};
  if (!blob) {
    axiosConfig = {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: "Bearer " + token
      },
    };
  } else {
    axiosConfig = {
      headers: {
        Authorization: "Bearer " + token
      },
      responseType: "blob",
    };
  }
  axios.defaults.withCredentials = true;
  if (method === "GET") {
    axios.get(url, axiosConfig)
      .then(res => {
        if (callback != null) {
          callback(res);
        }
      })
      .catch(err => {
        if (errorcallback != null) {
          errorcallback(err);
        }
      });
  }
  if (method === "POST") {
    axios.post(url, data, axiosConfig)
      .then(res => {
        if (callback != null) {
          callback(res);
        }
      })
      .catch(err => {
        // catch error
        if (errorcallback != null) {
          errorcallback(err);
        }
      });
  }
  if (method === "PUT") {
    axios.put(url, data, axiosConfig)
      .then(res => {
        if (callback != null) {
          callback(res);
        }
      })
      .catch(err => {
        if (errorcallback != null) {
          errorcallback(err);
        }
      });
  }
  if (method === "DELETE") {
    axios.delete(url, axiosConfig)
      .then(res => {
        if (callback != null) {
          callback(res);
        }
      })
      .catch(err => {
        if (errorcallback != null) {
          errorcallback(err);
        }
      });
  }
}
