import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import UI from "./services/interface";
import API from "./services/api";
import Loader from "./components/loader/Loader"

import Login from "./components/acesso/Login";
import Main from "./components/main/Main";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { pronto: true, conectado: false, usuario: { nome: "ADRIANO ZANON" } };
  }

  componentWillMount() {
    UI.loader("show", "Iniciando aplicação...");
    if (localStorage.getItem("accessToken")) {
      API.get("/perfil")
        .then((json) => {
          API.usuario = json.data.usuario;
          API.empresa = json.data.empresa;
          API.empresas = json.data.empresas;

          if (API.empresas.length === 0) {
            UI.loader("hide");
            UI.alert(false, "Este usuário não tem permissão para acessar nenhuma empresa.");
            return;
          }

          if (!API.empresa) {
            localStorage.setItem("accessToken", API.empresas[0].accessToken);
          }

          this.setState({ pronto: true, usuario: json.data });
          UI.loader("hide");
        })
        .catch((json) => {
          this.props.history.push("/login");
          this.setState({ pronto: true, usuario: false });
          UI.loader("hide");
        });
    }
    else {
      this.props.history.push("/login");
      this.setState({ pronto: true, usuario: false });
      UI.loader("hide");
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.pronto &&
          <Switch>
            {!this.state.usuario && <Route path="/" component={Login} />}
            <Route path="/login" component={Login}></Route>
            <Route path="/" render={() => <Main usuario={this.state.usuario} />} />
          </Switch>}
        <Loader />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
