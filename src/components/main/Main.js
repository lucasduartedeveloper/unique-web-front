import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./common/Header";
import Footer from "./common/Footer";

import Inicio from "./inicio/Inicio";
import Funcionario from "./funcionario/Funcionario";
import PesquisaFuncionario from "./funcionario/PesquisaFuncionario";
import Documento from "./documento/Documento";

import NotFound from "./error/NotFound";

class Main extends Component {
  render() {
    return (
      <div className="container-scroller">
        <Header usuario={this.props.usuario} />
        <div className="container-fluid page-body-wrapper">
          <div className="main-panel">
            <div className="content-wrapper">
              <Switch>
                <Route exact path="/" component={Inicio} />
                <Route exact path="/inicio" component={Inicio} />
                <Route exact path="/folha/funcionario/cadastro" component={Funcionario} />
                <Route exact path="/folha/funcionario/pesquisa" component={PesquisaFuncionario} />
                <Route exact path="/documento" component={Documento} />
                <Route path="/" component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
