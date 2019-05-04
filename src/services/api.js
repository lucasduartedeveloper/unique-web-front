const API = {

  usuario: null,
  empresas: null,

  //baseUrl: "http://teste-londrisoft.orienta.com.br:5000/api",
  baseUrl: "http://192.168.0.179:5000/api",

  setAccessToken: function (token) {
    localStorage.setItem("accessToken", token);
  },

  getAccessToken: function () {
    // Alteração para emulação de usuários
    let token = localStorage.getItem("accessToken");
    //let emulado_token = localStorage.getItem("emulado_accessToken");
    //return emulado_token ? emulado_token : token ? token : false;
    return token;
  },

  call: function (method, path, payload, autoType) {
    let headers = {
      "Accept": "application/json"
    };
    if (!autoType) headers["Content-Type"] = "application/json";

    let token = this.getAccessToken();
    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }

    return fetch(this.baseUrl + path, {
      method: method,
      headers,
      body: !autoType ? JSON.stringify(payload) : payload
    })
      .then(res => {
        return res.json().then(json => ({ json, res }));
      })
      .then(({ json, res }) => {
        if (!res.ok) {
          console.log("--- Ocorreu um erro. Log RES e JSON:");
          console.log(res);
          console.log(json);
          console.log("---");
          return Promise.reject(json);
        }
        return json;
      });
  },

  get: function (path) {
    return this.call("GET", path);
  },

  post: function (path, payload, autoType) {
    return this.call("POST", path, payload, autoType);
  },

  put: function (path, payload) {
    return this.call("PUT", path, payload);
  },

  delete: function (path) {
    return this.call("DELETE", path);
  }
};

export default API;
