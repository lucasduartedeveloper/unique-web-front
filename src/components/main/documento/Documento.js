import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import UI from "../../../services/interface";
import API from "../../../services/api";
import StringUtil from "../../../services/util/string";

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
    this.downloadDocumento = this.downloadDocumento.bind(this);
    this.removerDocumento = this.removerDocumento.bind(this);
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
    let mapa = [{
      nome: "FOLHA",
      diretorio: "\\FOLHA",
      diretorioPai: "\\",
      quantidade: 0,
      padrao: true
    },{
      nome: "CONTABIL",
      diretorio: "\\CONTABIL",
      diretorioPai: "\\",
      quantidade: 0,
      padrao: true
    },{
      nome: "FISCAL",
      diretorio: "\\FISCAL",
      diretorioPai: "\\",
      quantidade: 0,
      padrao: true
    }];

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
    UI.loader("show", "Enviando arquivo...");
    this.getBase64(event.target.files[0])
  }

  enviarDocumento(doc) {
    API.post("/documentos", doc).then((json) => {
      this.state.documentos.push(json.data);
      this.criarMapa(this.state.documentos);
      UI.alert(true, "Documento enviado com sucesso.");
      UI.loader("hide");
    })
    .catch((json) => {
      UI.alert(false, json.message);
      UI.loader("hide");
    })
  }

  getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let conteudo = reader.result;
      conteudo = conteudo.substring(conteudo.indexOf("base64,") + 7);

      let doc = {
        arquivoNome: file.name,
        diretorio: this.state.local.diretorio,
        conteudo: conteudo,
        observacoes: "Sem observações."
      }
      this.enviarDocumento(doc)
    };
    reader.onerror = (error) => {
      UI.alert(false, "O arquivo é muito grande para o envio.");
    };
  }

  downloadDocumento(doc) {
    doc.quantidadeDownload++;

    var link = document.createElement("a");
    link.setAttribute("href", doc.linkDownload);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);

    this.forceUpdate();
  }

  removerDocumento(doc) {
    UI.confirm("Atenção", "Tem certeza que deseja apagar este arquivo?")
      .then((value) => {
        if (value) {
          UI.loader("show", "Excluindo arquivo...");
          API.delete("/documentos/" + doc.id)
          .then((json) => {
            let docs = this.state.documentos.filter((obj, i) => { return obj.id != doc.id; });
            this.setState({ documentos: docs });
            UI.alert(true, json.message);
            UI.loader("hide");
          })
          .catch((json) => {
            UI.alert(false, json.message);
            UI.loader("hide");
          })
        }
      });
  }

  render() {
    let local = this.state.local;
    let mudarDiretorio = this.mudarDiretorio;
    let downloadDocumento = this.downloadDocumento;
    let removerDocumento = this.removerDocumento;

    let subDiretorios = this.state.mapa.filter(function (item) { return item.diretorioPai === local.diretorio; });
    let documentos = this.state.documentos.filter(function (doc) { return doc.diretorio === local.diretorio; });

    return (
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6" style={{ cursor: "pointer" }} onClick={ () => { mudarDiretorio(local.diretorioPai)} }>
                    <h4 className="card-title"><i style={{ color: "#201E31"}} className="fa fa-folder-open fa-2x"></i>&nbsp;{ local.diretorio }</h4>
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
                    <table id="data-table" className="table table-doc">
                      <tbody>
                        { subDiretorios.map(
                          function(item, i) {
                            return (
                            <tr key={"d_" + i} style={{ cursor: "pointer" }}> 
                              <td style={{ width: "1%" }}>&nbsp;<i className="fa fa-folder fa-2x" style={{ color: item.padrao ? "#201E31" : "#6c6c6c" }}></i></td>
                              <td onClick={ () => mudarDiretorio(item.diretorio) }>{ item.nome }</td>
                              <td></td>
                              <td></td>
                              <td style={{ width: "1%" }}>{ item.quantidade } arquivo(s)</td>
                            </tr>);
                          }
                        ) }
                        { documentos.map(
                          function(doc, i) {
                            let iconClass = "fa " + StringUtil.faFileIcon(doc.arquivoNome) + " fa-2x";
                            return (<tr key={"a_" + i} style={{ cursor: "pointer" }}>
                              <td style={{ width: "1%" }}>&nbsp;<i className={iconClass}></i></td>
                              <td onClick={ () => downloadDocumento(doc) }>{ doc.arquivoNome }</td>
                              <td style={{ width: "1%" }}>{ doc.quantidadeDownload } downloads</td>
                              <td style={{ width: "1%" }}>{ doc.dataEnvio }</td>
                              <td onClick={ () => removerDocumento(doc) } style={{ textAlign: "right", width: "1%" }}><i style={{ color: "#7f0000"}} className="fa fa-remove fa-2x"></i></td>
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
        <DiretorioModal onCriarDiretorio={this.criarDiretorio} />
        </div>
    );
  }
}

export default withRouter(Documento);
