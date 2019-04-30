const Util = {
  exportarAtendimentosCSV(atendimentos) {
    if (atendimentos.length === 0) return false;

    let csvContent = "data:text/csv;charset=utf8,\uFEFF";
    csvContent +=
      "\"Id\";" +
      //"\"Usuario\";" +
      "\"Data\";" +
      "\"Entrada\";" +
      "\"Saida\";" +
      "\"Total\";" +
      "\"Procedimento\";" +
      "\"Descricao\";" +
      "\"Cidade\";" +
      "\"Dt. Nasc.\";" +
      "\"ID Cismepar\";" +
      "\"Profissional\";" +
      "\"Atendimento\"\r\n";

    atendimentos.forEach(function (atendimento) {
      let row = "";
      row += "" + atendimento.id + ";";
      //row += "" + atendimento.criadorNome + ";";
      row += "" + atendimento.data + ";";
      row += "" + atendimento.horaEntrada + ";";
      row += "" + atendimento.horaSaida + ";";
      row += "" + atendimento.horaTotal + ";";
      row += "" + atendimento.procedimento.codigo + " - " + atendimento.procedimento.descricao + ";";
      row += "" + atendimento.descricao + ";";
      row += "" + atendimento.cidade + ";";
      row += "" + (!atendimento.paciente.dataNascimento ? "" : atendimento.paciente.dataNascimento) + ";";
      row += "\"" + atendimento.paciente.idCismepar + "\";";

      let profissional = "";
      let count = atendimento.valores.length;
      for (var i = 0; i < count; i++) {
        profissional += atendimento.valores[i].usuarioNome;
        profissional += i + 1 < count ? "," : "";
      }

      let tipo = "PRIMEIRA CONSULTA";
      if (atendimento.tipo === 2) tipo = "RETORNO";
      else if (atendimento.tipo === 3) tipo = "CANCELADO";

      row += "" + profissional + ";";
      row += "" + tipo + ";";
      csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "atendimentos.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
    return true;
  },

  exportarReunioesCSV(reunioes) {
    if (reunioes.length === 0) return false;

    let csvContent = "data:text/csv;charset=utf8,\uFEFF";
    csvContent +=
      "\"Id\";" +
      //"\"Usuario\";" +
      "\"Data\";" +
      "\"Entrada\";" +
      "\"Saida\";" +
      "\"Total\";" +
      "\"Procedimento\";" +
      "\"Pauta\";" +
      "\"Ata\";" +
      "\"Profissional\";" +
      "\"Reuniao\"\r\n";

    reunioes.forEach(function (reuniao) {
      let row = "";
      row += "" + reuniao.id + ";";
      //row += "" + reuniao.criadorNome + ";";
      row += "" + reuniao.data + ";";
      row += "" + reuniao.horaEntrada + ";";
      row += "" + reuniao.horaSaida + ";";
      row += "" + reuniao.horaTotal + ";";
      row += "" + reuniao.procedimento.codigo + " - " + reuniao.procedimento.descricao + ";";
      row += "" + reuniao.pauta + ";";
      row += "\"" + (reuniao.id < 10 ? '0' : '') + reuniao.id + "\";";

      let profissional = "";
      let count = reuniao.valores.length;
      for (var i = 0; i < count; i++) {
        profissional += reuniao.valores[i].usuarioNome;
        profissional += i + 1 < count ? "," : "";
      }

      let tipo = "CONFIRMADA";
      if (reuniao.tipo === 2) tipo = "CANCELADA";

      row += "" + profissional + ";";
      row += "" + tipo + ";";
      csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reunioes.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
    return true;
  }
};

export default Util;
