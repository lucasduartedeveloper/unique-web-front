import React, { Component } from "react";

import LoginForm from "./LoginForm";
import ResetarSenha from "./ResetarSenha";

import "./css/login.css";

import UI from "../../services/interface";

class Login extends Component {
  render() {
    return (
      <div className="container-scroller">
      <div className="wave"></div>
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex auth auth-bg-1 theme-one">
            <div className="row w-100 mx-auto">
              <div className="col-lg-4 mx-auto">
                <div className="login-logo-container logo-escritorio">
                  <img src="/images/login-logo.png" alt="" />
                </div>
                <div className="auto-form-wrapper">
                  <LoginForm />
                  <div className="text-block text-center my-3">
                    <span
                      onClick={() => { UI.toggleModal("#esqueceu-senha-modal") }}
                      className="text-small forgot-password link"
                    >
                      Esqueci minha senha
                    </span>
                  </div>
                </div>
              <div className="login-logo-container logo-londrisoft">
                <img src="/images/logo-londrisoft.png" alt="" />
              </div>
              </div>
            </div>
          </div>
        </div>
        <ResetarSenha />
      </div>
    );
  }
}

export default Login;
