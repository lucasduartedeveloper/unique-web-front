import React, { Component } from "react";

import LoginForm from "./LoginForm";
import ResetarSenha from "./ResetarSenha";

import "./css/login.css";

import UI from "../../services/interface";

class Login extends Component {
  render() {
    return (
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
            <div className="row w-100 mx-auto">
              <div className="col-lg-4 mx-auto">
                <div className="login-logo-container">
                  <img src="/images/login-logo.png" alt="" />
                </div>
                <div className="auto-form-wrapper">
                  <LoginForm />
                  <div className="text-block text-center my-3">
                    <span
                      //data-toggle="modal"
                      //data-target="#esqueceu-senha-modal"
                      onClick={() => {UI.alert(false, "Opção desativada.")}}
                      className="text-small forgot-password link"
                    >
                      Esqueci minha senha
                    </span>
                  </div>
                </div>
                <p className="footer-text text-center">
                  Copyright © 2019 Londrisoft. Todos os direitos reservados.
                </p>
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
