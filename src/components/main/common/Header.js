import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import "./css/header.css";
import API from "../../../services/api";
import UI from "../../../services/interface";
import StringUtil from "../../../services/util/string";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  }

  render() {
    let cursorStyle = {
      cursor: "pointer"
    }

    let menuStyle = {
      paddingTop: "5px",
      paddingBottom: "5px",
      border: "1px solid #999",
      cursor: "pointer"
    }

    let selectEmpresa = {
      fontWeight: "700",
      background: "#eee", 
      border: "0px"
    }

    return (
      <nav className="navbar horizontal-layout col-lg-12 col-12 p-0">
        <div className="nav-top flex-grow-1">
          <div className="container d-flex flex-row h-100">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center">
              <a className="navbar-brand brand-logo" href="/">
                <img src="/images/header-logo.png" alt="logo" />
              </a>
              <a className="navbar-brand brand-logo-mini" href="/">
                <img src="/images/header-logo-mini.png" alt="logo" />
              </a>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-stretch justify-content-between flex-grow-1">
              <ul className="navbar-nav navbar-nav-right mr-0 ml-auto">
                <li className="nav-item nav-profile dropdown">
                  <span
                    style={cursorStyle}
                    className="nav-link dropdown-toggle link"
                    data-toggle="dropdown"
                    id="profileDropdown"
                  >
                    <div className="profile-picture">
                      {API.usuario && API.usuario.nome[0]}
                    </div>
                    <span className="nav-profile-name">
                      {API.usuario && API.usuario.nome}
                    </span>
                  </span>
                  <div className="dropdown-menu navbar-dropdown" style={menuStyle}>
                    <span onClick={this.logout} className="dropdown-item">
                      <i className="fa fa-sign-out"></i>&nbsp; Logout
                    </span>
                  </div>
                </li>
              </ul>
              <button
                className="navbar-toggler align-self-center"
                type="button"
                data-toggle="minimize"
              >
                <span className="icon-menu text-light" />
              </button>
            </div>
          </div>
        </div>
        <div className="nav-bottom">
          <div className="container">
          <div className="row">
          <div className="col-md-7">
            <ul className="nav page-navigation">
              <li className="nav-item">
                <Link to="/inicio" className="nav-link">
                  <i className="link-icon icon-home" />
                  <span className="menu-title">Inicio</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/folha/funcionario/cadastro" className="nav-link">
                  <i className="link-icon icon-grid" />
                  <span className="menu-title">Folha</span>
                  <i className="menu-arrow" />
                </Link>
                <div className="submenu">
                  <ul className="submenu-item">
                    <li className="nav-item">
                      <Link className="nav-link" to="/folha/funcionario/cadastro">
                        Cadastrar Funcionário
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/folha/funcionario/pesquisa">
                        Pesquisar Funcionário
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <Link to="/documento" className="nav-link">
                  <i className="link-icon icon-docs" />
                  <span className="menu-title">Documentos</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-5" style={{ paddingTop: "12px"}}>
            <select
              name="situacao"
              className="form-control"
              style={selectEmpresa}
            >
              { API.empresas && API.empresas.map(function(emp) {
                return (
                  <option value={emp.id}>{ StringUtil.mask(emp.cnpj,"99.999.999/9999-99") } - { emp.razaoSocial }</option>
                );
              })}
            </select>
          </div>
        </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
