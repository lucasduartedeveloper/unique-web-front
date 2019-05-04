import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom';

import "./css/inicio.css";

class Inicio extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="tile-container">
            <div className="animate-once">
              <Link to="/folha/funcionario/pesquisa">
                <div className="tile text-center">
                  <i className="fa fa-users"></i>
                  <span>Colaboradores</span>
                </div>
              </Link>
            </div>
            <div className="animate-once a05s">
              <div className="tile text-center">
                <img src="/images/icons/money-bag-128.png" alt="" />
                <span>Folha</span>
              </div>
            </div>
            <div className="animate-once">
              <div className="tile text-center">
                <img src="/images/icons/beach-128.png" alt="" />
                <span>Férias</span>
              </div>
            </div>
            <div className="animate-once a15s">
              <div className="tile text-center">
                <i className="fa fa-legal"></i>
                <span>Rescisão</span>
              </div>
            </div>
            <div className="animate-once a05s">
            <Link to="/documento">
              <div className="tile text-center">
                <i className="fa fa-hdd-o"></i>
                <span>Documentos</span>
              </div>
            </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Inicio);
