import React, { Component } from "react";

import API from "../../services/api";
import UI from "../../services/interface";

class ResetarSenha extends Component {
  constructor(props) {
    super(props);
    this.state = { email: this.props.email };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value.toUpperCase() });
  }

  handleSubmit(event) {
    var data = this.state;

    UI.loader("show", "Um momento...");
    API.post("/acesso/resetarsenha", data)
      .then(function (json) {
        UI.toggleModal("#esqueceu-senha-modal");
        UI.loader("hide");
        UI.alert(json.success, json.message);
      })
      .catch(function (json) {
        UI.loader("hide");
        UI.alert(false, json.message);
      });

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div
          className="modal fade"
          id="esqueceu-senha-modal"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel-2">
                  Esqueceu sua senha?
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
                <p>Preencha abaixo para enviarmos uma nova senha</p>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    E-mail:
                  </label>
                  <input
                    id="email-esqueceu-senha"
                    type="text"
                    className="form-control"
                    autoComplete="off"
                    name="email"
                    spellCheck="false"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  data-dismiss="modal"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
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

export default ResetarSenha;
