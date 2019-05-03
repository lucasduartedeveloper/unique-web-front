import React, { Component } from "react";


class DiretorioModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        diretorio: "NOVA PASTA"
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value.toUpperCase() });
  }

  render() {
    return (
    <div
        className="modal fade"
        id="diretorio-modal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
    >
        <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel-2">
                Qual o nome do novo diretório?
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
                <div className="form-group">
                    <input
                    id="email-esqueceu-senha"
                    type="text"
                    className="form-control"
                    autoComplete="off"
                    name="diretorio"
                    spellCheck="false"
                    onChange={this.handleChange}
                    value={this.state.diretorio}
                    />
                </div>
                <p style={{ color: "#D94A38" }}>** Pastas sem documentos são excluídas automáticamente.</p>
            </div>
            <div className="modal-footer">
            <button
                type="button"
                className="btn btn-light"
                data-dismiss="modal"
            >
                Cancelar
            </button>
            <button 
                type="button"
                onClick={() => { this.props.onCriarDiretorio(this.state.diretorio); }} 
                className="btn btn-primary"
                data-dismiss="modal">
                Pronto
            </button>
            </div>
        </div>
        </div>
    </div>
    );
  }
}

export default DiretorioModal;
