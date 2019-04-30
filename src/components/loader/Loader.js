import React, { Component } from "react";
import "./css/loader.css";

class Loader extends Component {
  state = {};
  render() {
    let textColor = {
      color: "#fff"
    }

    return (
      <div
        id="loader"
        className="loader-container fade show"
        style={{ display: "none" }}
      >
        <div className="square-box-loader">
          <div className="bar-loader">
            <span />
            <span />
            <span />
            <span />
          </div>
          <b><span style={textColor} id="loader-text"></span></b>
        </div>
      </div>
    );
  }
}

export default Loader;
