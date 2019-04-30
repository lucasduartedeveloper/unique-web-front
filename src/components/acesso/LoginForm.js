import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import API from "../../services/api.js";
import UI from "../../services/interface.js";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: localStorage.getItem("login"),
      senha: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var data = this.state;

    UI.loader("show", "Aguarde...");
    API.post("/login", data)
      .then((json) => {
        if (json.success && json.data) {
          localStorage.setItem("login", data.login);
          localStorage.setItem("accessToken", json.data.accessToken);
          window.location.href = "/inicio";
        } else {
          UI.loader("hide");
          UI.alert(json.success, json.message);
        }
      })
      .catch((json) => {
        UI.loader("hide");
        UI.alert(false, json.message);
      });
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: name === "login" ? value.toLowerCase() : value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} autoComplete="off" spellCheck="false">
        <div className="form-group">
          <label className="label">E-mail</label>
          <div className="input-group">
            <input
              name="login"
              type="text"
              className="form-control"
              placeholder="Digite seu e-mail"
              onChange={this.handleChange}
              autoFocus
              value={this.state.login}
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="icon-user" />
              </span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="label">Senha</label>
          <div className="input-group">
            <input
              name="senha"
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              onChange={this.handleChange}
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="icon-key" />
              </span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <button className="btn btn-primary submit-btn btn-block">
            Entrar
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(LoginForm);
