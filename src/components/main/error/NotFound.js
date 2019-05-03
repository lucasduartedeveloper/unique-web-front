import { Component } from "react";
import { withRouter } from 'react-router-dom';

import UI from "../../../services/interface";

class NotFound extends Component {
  componentDidMount() {
    UI.alert(false, "Opa! Este recurso não existe.", "warning");
    this.props.history.push("/");
  }
  render() {
    return false;
  }
}

export default withRouter(NotFound);
