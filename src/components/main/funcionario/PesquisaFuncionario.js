import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

class PesquisaFuncionario extends Component {
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
                        placeholder="DIGITE ALGUMA INFORMAÇÃO DO FUNCIONÁRIO..."
                        name="pesquisa"
                        className="form-control"
                      />
                    </div>
                  </div>
                <div className="row">
                  <div className="col-md-12 text-right">
                    <button type="submit" className="btn btn-primary mb-2">
                        <i className="fa fa-search"></i>
                        &nbsp;
                      Pesquisar
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

export default withRouter(PesquisaFuncionario);
