import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import InputMask from "react-input-mask";

import UI from "../../../../services/interface";
import StringUtil from "../../../../services/util/string";
import DataUtil from "../../../../services/util/datahora";
import API from "../../../../services/api";

class FuncionarioEditar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      id: 0,
      nome: "",
      dataNascimento: "",
      documentacao: {
        numeroCpf: ""
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDocumentacao = this.handleChangeDocumentacao.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeDocumentacao(event) {
    let doc = this.state.documentacao;
    doc[event.target.name] = event.target.value;
    this.setState({ documentacao: doc });
  }

  handleSubmit(event) {
    event.preventDefault();

    let func = this.state;
    func.documentacao.numeroCpf = StringUtil.unmask(func.documentacao.numeroCpf);

    if (!StringUtil.validarCpf(func.documentacao.numeroCpf)) {
      UI.alert(false, "Verifique o número de CPF informado!", "warning").then((json) => document.getElementsByName("numeroCpf")[0].focus());
      return;
    }
    if (!DataUtil.validarData(func.dataNascimento)) {
      UI.alert(false, "Verifique a data de nascimento informada!", "warning").then((json) => document.getElementsByName("dataNascimento")[0].focus());
      return;
    }    
    if (func.nome.length < 3 || !func.nome.includes(" ")) {
      UI.alert(false, "Informe o nome completo do funcionário!", "warning").then((json) => document.getElementsByName("nome")[0].focus());
      return;
    }

    UI.loader("show", "Cadastrando funcionário...");
    API.post("/funcionarios", func)
    .then((json) => {
      UI.alert(json.success, json.message);
      UI.loader("hide");
    })
    .catch((json) => {
      UI.alert(false, json.message);
      UI.loader("hide");
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
                  <div className="col-md-4">
                    <h4 className="card-title">[ NOME DO COLABORADOR ]</h4>
                  </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-3">
                      <label>CPF</label>
                      <InputMask
                        placeholder="Número do CPF"
                        name="numeroCpf"
                        className="form-control"
                        mask="999.999.999-99"
                        onChange={this.handleChangeDocumentacao}
                      />
                    </div>
                    <div className="col-md-3">
                      <label>Data Nascimento</label>
                      <InputMask
                        placeholder="Data de nascimento"
                        name="dataNascimento"
                        className="form-control"
                        mask="99/99/9999"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Nome Completo</label>
                      <input
                        placeholder="Nome completo"
                        name="nome"
                        className="form-control"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                <div className="row">
                  <div className="col-md-12 text-right">
                    <button type="submit" className="btn btn-primary mb-2">
                      Concluido
                    </button>
                  </div>
              </div>
                </div>
              </div>
            </div>
          </div>
      </form>
    );
  }
}

export default withRouter(FuncionarioEditar);
