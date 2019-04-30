import React, { Component } from "react";
import API from "../../actions/api-helper.js";
import UI from "../../actions/ui-helper.js";

class AlterarSenha extends Component {
  constructor(props) {
    super(props);
    this.state = { email: this.props.email, senha: "", confirmaSenha: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    UI.loader("show", "Um momento...");
    var data = {
      senha: this.state.senha,
      confirmaSenha: this.state.confirmaSenha
    };

    API.post("/acesso/alterarsenha", data)
      .then(function (json) {
        UI.toggleModal("#alterar-senha-modal");
        UI.alert(json.success, json.message);
        UI.loader("hide");
      })
      .catch(function (json) {
        UI.alert(json.success, json.message);
        UI.loader("hide");
      });

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} autoComplete="off" spellCheck="false">
        <div
          className="modal fade"
          id="alterar-senha-modal"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel-2">
                  Sua senha é provisória
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Preencha abaixo para criar uma senha definitiva</p>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Senha:
                  </label>
                  <input
                    id="senha-alterar-senha"
                    type="password"
                    className="form-control"
                    name="senha"
                    onChange={this.handleChange}
                  />
                  <label htmlFor="recipient-name" className="col-form-label">
                    Confirmar Senha:
                  </label>
                  <input
                    id="confirma-senha-alterar-senha"
                    type="password"
                    className="form-control"
                    name="confirmaSenha"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  data-dismiss="modal"
                >
                  Depois
                </button>
                <button type="submit" className="btn btn-success">
                  Pronto
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default AlterarSenha;
