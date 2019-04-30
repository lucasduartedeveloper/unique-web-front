import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

class Inicio extends Component {
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
                    <h4 className="card-title">ESCRITÓRIO VIRTUAL v2.0</h4>
                  </div>
                </div>
                <div className="form-group row">
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(Inicio);
