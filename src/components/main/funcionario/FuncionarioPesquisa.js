import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import UI from "../../../services/interface";
import API from "../../../services/api";

import StringUtil from "../../../services/util/string";

class FuncionarioPesquisa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: "",
      funcionarios: []
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    
    UI.loader("show", "Buscando funcionários...")
    console.log(this.state.texto);

    API.get("/funcionarios/pesquisa?texto=" + encodeURIComponent(this.state.texto))
    .then((json) => {
      this.setState({funcionarios: json.data});
      UI.loader("hide");
    })
    .catch((json) => {
      UI.alert(false, json.message);
      UI.loader("hide");
    })
  }

  removerFuncionario(func) {
    UI.loader("show", "Removendo funcionario...");
    API.delete("/funcionarios/" + func.id)
    .then((json) => {
      this.state.funcionarios.pop(func);
      this.forceUpdate();
      console.log(json);
      UI.loader("hide");
      UI.alert(json.success, json.message);
    })
    .catch((json) => {
      UI.loader("hide");
      UI.alert(false, json.message);
    })
  }

  render() {
    return (
      <form
        className="form-sample"
        autoComplete="off"
        spellCheck="false"
        onSubmit={this.handleSubmit}
      >
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="form-group row">
                  <div className="col-md-12">
                    <h4 className="card-title">PESQUISAR FUNCIONÁRIO</h4>
                      <input
                        placeholder="Digite alguma informação do funcionário ou deixe em branco para ver todos..."
                        name="texto"
                        className="form-control"
                        value={this.state.texto}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12 text-right">
                      <button type="submit" className="btn btn-primary mb-2">
                        <i className="fa fa-search"></i>
                        &nbsp;Pesquisar
                      </button>
                    </div>
                  </div>

                  { this.state.funcionarios.length > 0 &&
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ width: "1%", whiteSpace: "nowrap" }}>CPF</th>
                        <th style={{ width: "1%", whiteSpace: "nowrap" }}>Data Nascimento</th>
                        <th>Nome Completo</th>
                        <th style={{ width: "1%" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.funcionarios.map((func) => {
                        return (
                          <tr key={func.id}>
                            <td style={{ whiteSpace: "nowrap" }}>{ StringUtil.mask(func.documentacao.numeroCpf, "999.999.999-99") }</td>
                            <td style={{ whiteSpace: "nowrap" }}>{ func.dataNascimento }</td>
                            <td>{ func.nome }</td>
                            <td>
                              <button type="button" className="btn btn-default btn-option icon-btn" id="dropdown1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-gear"></i>
                              </button>
                              <div className="dropdown-menu" aria-labelledby="dropdown1">
                                <span className="dropdown-item"><i className="fa fa-edit"></i>&nbsp;Editar</span>
                                <span onClick={ () => this.removerFuncionario(func) } className="dropdown-item"><i className="fa fa-times"></i>&nbsp;Excluir</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>}

                </div>
              </div>
            </div>
          </div>
      </form>
    );
  }
}

export default withRouter(FuncionarioPesquisa);
