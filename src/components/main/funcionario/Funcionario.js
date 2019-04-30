import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import InputMask from "react-input-mask";

class Funcionario extends Component {
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
                    <h4 className="card-title">CADASTRAR FUNCIONÁRIO</h4>
                  </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-3">
                      <label>CPF</label>
                      <InputMask
                        placeholder="CPF"
                        name="cpf"
                        className="form-control"
                        mask="999.999.999-99"
                      />
                    </div>
                    <div className="col-md-3">
                      <label>Data Nascimento</label>
                      <InputMask
                        placeholder="DATA NASCIMENTO"
                        name="dataNascimento"
                        className="form-control"
                        mask="99/99/9999"
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Nome</label>
                      <input
                        placeholder="NOME"
                        name="nome"
                        className="form-control"
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

export default withRouter(Funcionario);
