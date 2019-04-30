import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import UI from "../../../services/interface";
import API from "../../../services/api";
import DataUtil from "../../../services/util/datahora";

import DiretorioModal from "./DiretorioModal";

import "./css/documento.css";

class Documento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapa: [],
      local: { diretorio: "\\", diretorioPai: "" },
      documentos: []
    };

    this.criarMapa = this.criarMapa.bind(this);
    this.mudarDiretorio = this.mudarDiretorio.bind(this);
    this.criarDiretorio = this.criarDiretorio.bind(this);
    this.arquivoChange = this.arquivoChange.bind(this);
    this.getBase64 = this.getBase64.bind(this);
  }

  componentDidMount() {
    UI.loader("show", "Carregando documentos...");
    API.get("/documentos").then(
      (json) => {
        this.criarMapa(json.data);
        UI.loader("hide");
      })
    .catch(
      (json) => {
        UI.alert(false, json.message);
        UI.loader("hide");
      })
  }

  criarMapa(documentos) {
    let mapa = [];

    documentos.map(function(doc) {
      doc.diretorio = doc.diretorio.toUpperCase();
      let endereco = doc.diretorio.split("\\");
      let item = mapa.find(function(value) {
        return value.diretorio === doc.diretorio;
      })
      if (!item && doc.diretorio !== "\\") {
        let pai = endereco.slice(0, endereco.length - 1).join("\\");
        if (pai === "") pai = "\\";

        mapa.push({
          nome: endereco[endereco.length -1],
          diretorio: doc.diretorio,
          diretorioPai: pai,
          quantidade: 1
        });
      }
      else if (item) { 
        item.quantidade++;
      }
      return true;
    });
    this.setState({ mapa: mapa, documentos: documentos });
  }

  mudarDiretorio(diretorio) {
    if (diretorio === "") { return; };

    let endereco = diretorio.split("\\");
    let pai = endereco.slice(0, endereco.length - 1).join("\\");
    if (pai === "") pai = "\\";

    let local = {
      diretorio: diretorio,
      diretorioPai: pai
    }

    this.setState({ local: local });
  }

  criarDiretorio(diretorio) {
    let mapa = this.state.mapa;

    diretorio = this.state.local.diretorio + "\\" + diretorio;
    diretorio = diretorio.replace("\\\\", "\\");

    let existente = mapa.find(function(dir) { return dir.diretorio === diretorio; });
    if (existente) {
      UI.alert(false, "Já existe um diretório com esse nome no local selecionado.");
      return;
    }

    let endereco = diretorio.split("\\");
    let pai = endereco.slice(0, endereco.length - 1).join("\\");
    if (pai === "") pai = "\\";

    mapa.push({
      nome: endereco[endereco.length -1],
      diretorio: diretorio,
      diretorioPai: pai,
      quantidade: 0
    });
    this.mudarDiretorio(diretorio);
  }

  arquivoChange(event) {
    let documento = {
      arquivoNome: event.target.files[0].name,
      diretorio: this.state.local.diretorio,
      conteudo: this.getBase64(event.target.files[0]),
      dataEnvio: DataUtil.agora()
    }

    let documentos = this.state.documentos;
    documentos.push(documento);
    this.criarMapa(documentos);
  }

  getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    let local = this.state.local;
    let mudarDiretorio = this.mudarDiretorio;
    let subDiretorios = this.state.mapa.filter(function (item) { return item.diretorioPai === local.diretorio; });
    let documentos = this.state.documentos.filter(function (doc) { return doc.diretorio === local.diretorio; });

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
                <div className="row">
                  <div className="col-md-6">
                      <h4 className="card-title" style={{ cursor: "pointer" }} onClick={ () => { mudarDiretorio(local.diretorioPai)} }><i style={{ color: "#201E31"}} className="fa fa-folder-open fa-2x"></i>&nbsp;{ local.diretorio }</h4>
                    </div>
                    <div className="col-md-6 text-right">
                    <input id="documento-file" type="file" name="file" className="file-upload-default" style={{ display: "none" }} onChange={this.arquivoChange} />
                      <button
                        className="btn btn btn-primary"
                        type="button"
                        onClick={ ()=> { document.getElementById("documento-file").click(); }}
                      >
                        <i className="fa fa-upload"></i>&nbsp;
                        ENVIAR ARQUIVO
                      </button>
                      &nbsp;
                      <button
                        onClick={() => { UI.toggleModal("#diretorio-modal"); }}
                        className="btn btn btn-primary"
                        type="button"
                      >
                        <i className="fa fa-plus"></i>&nbsp;
                        CRIAR PASTA
                      </button>
                    </div>
                  </div>
                  <div className="row" style={{ border: "1px solid #ccc", padding: "10px", background: "#fff"}}>
                    <div className="col-12 table-responsive">
                      <table id="data-table" className="table">
                        {/* <thead>
                          <tr>
                            <th style={{ width: "1%"}}><i className="fa fa-ellipsis-h"></i></th>
                            <th>Nome</th>
                          </tr>
                        </thead> */}
                        <tbody>
                          { subDiretorios.map(
                            function(item) {
                              return (
                              <tr style={{ cursor: "pointer" }}> 
                                <td style={{ width: "1%" }}>&nbsp;<i className="fa fa-folder fa-2x" style={{ color: "#201E31"}}></i></td>
                                <td onClick={ () => { mudarDiretorio(item.diretorio); } }>{ item.nome }</td>
                                <td></td>
                                <td></td>
                                <td style={{ width: "1%" }}>{ item.quantidade } arquivo(s)</td>
                              </tr>);
                            }
                          ) }
                          { documentos.map(
                            function(doc) {
                              return (<tr style={{ cursor: "pointer" }}>
                                <td style={{ width: "1%" }}>&nbsp;<i className="fa fa-file-o fa-2x"></i></td>
                                <td>{ doc.arquivoNome }</td>
                                <td style={{ width: "1%" }}>0 downloads</td>
                                <td style={{ width: "1%" }}>{ doc.dataEnvio }</td>
                                <td style={{ textAlign: "right", width: "1%" }}><i style={{ color: "#7f0000"}} className="fa fa-remove fa-2x"></i></td>
                              </tr>);
                            }
                          ) }
                        </tbody>
                      </table>
                      { subDiretorios.length === 0 && documentos.length === 0 &&
                      <div style={{textAlign: "center", color: "#aaa", padding: "30px"}} className="col-12">Diretório vazio</div> }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DiretorioModal onCriarDiretorio={this.criarDiretorio} />
      </form>
    );
  }
}

export default withRouter(Documento);
