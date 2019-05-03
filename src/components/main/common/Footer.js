import React, { Component } from "react";
import "./css/footer.css";

class Footer extends Component {
  render() {
    let styleLink = {
      color: '#DA9315',
      fontWeight: '700'
    }

    return (
      <footer style={{ zIndex: "9999"}} className="footer">
        <div className="w-100 clearfix">
          <span className="float-none d-block mt-1 mt-sm-0 text-center">
            Copyright © 2019{" "}
            <a style={styleLink}
              href="http://www.londrisoft.com.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Londrisoft
            </a>
            .{" "}Todos os direitos reservados.
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
