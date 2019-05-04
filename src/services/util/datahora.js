const DataUtil = {
  diaSemana: function (dataStr) {

    var arr = dataStr.substr(0, 10).split("/");
    var dd = parseInt(arr[0]);
    var mm = parseInt(arr[1]);
    var aaaa = parseInt(arr[2]);

    var date = new Date(aaaa, mm - 1, dd);

    var weekday = new Array(7);
    weekday[0] = "Domingo";
    weekday[1] = "Segunda-Feira";
    weekday[2] = "Terça-Feira";
    weekday[3] = "Quarta-Feira";
    weekday[4] = "Quinta-Feira";
    weekday[5] = "Sexta-Feira";
    weekday[6] = "Sábado";

    return weekday[date.getDay()];
  },

  fimDeSemana: function (dataStr) {
    var diaSemana = this.diaSemana(dataStr);
    return diaSemana === "Sábado" || diaSemana === "Domingo";
  },

  formatarData: function (data) {
    var dd = data.getDate();
    var mm = data.getMonth() + 1;
    var aaaa = data.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return "dd/mm/aaaa".replace("dd", dd).replace("mm", mm).replace("aaaa", aaaa);
  },

  formatarHora: function (hora) {
    var hh = hora.getHours();
    var mm = hora.getMinutes();
    var ss = hora.getSeconds();

    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;
    if (ss < 10) ss = '0' + ss;

    return "hh:mm:ss".replace("hh", hh).replace("mm", mm).replace("ss", ss);
  },

  formatarMinutos: function (minutos) {
    let mm = minutos % 60;
    let hh = Math.floor(minutos / 60);

    if (mm < 10) mm = '0' + mm;
    if (hh < 10) hh = '0' + hh;

    return "hh:mm".replace("hh", hh).replace("mm", mm);
  },

  validarData: function (dataStr) {

    if (!dataStr) return false;

    // Verifica se esta no formato aceitado pelo sistema
    // dd/mm/aaaa
    // Também separa em 3 variáveis dia, mês e ano
    var datePat = /^(\d{2,2})(\/)(\d{2,2})\2(\d{4}|\d{4})$/;

    var matchArray = dataStr.match(datePat); // is the format ok?
    if (matchArray === null) {
      //alert("Data não esta no formato dd/mm/aaaa");
      return false;
    }

    let dia = matchArray[1]; // parse date into variables
    let mes = matchArray[3];
    let ano = matchArray[4];
    if (mes < 1 || mes > 12) {
      // Verificar se o mes esta entre 1 e 12
      //alert("Mês precisa ser entre 1 e 12");
      return false;
    }
    if (dia < 1 || dia > 31) {
      //alert("Dia precisa estar entre 1 e 31");
      return false;
    }
    if ((mes === 4 || mes === 6 || mes === 9 || mes === 11) && dia === 31) {
      //alert("Mês " + mes + " não tem 31 dias!");
      return false;
    }
    if (mes === 2) {
      // Verificar 29 de fevereiro
      var bissexto = ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0);
      if (dia > 29 || (dia === 29 && !bissexto)) {
        // alert("Fevereiro " + ano + " não tem " + dia + " dias!");
        return false;
      }
    }
    return (ano >= 1900 && ano <= parseInt(this.hoje().substring(7, 10))); // data esta correta
  },

  validarHora: function (hora) {
    let isValido = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(hora);
    return isValido;
  },

  agora: function () {
    return this.formatarData(new Date()) + " " + this.formatarHora(new Date());
  },

  hoje: function () {
    return this.formatarData(new Date());
  },

  primeiroDiaMes: function () {
    var data = new Date();
    var primeiroDia = new Date(data.getFullYear(), data.getMonth(), 1);
    return this.formatarData(primeiroDia);
  },

  ultimoDiaMes: function (dataStr) {
    dataStr = this.validarData(dataStr) ? dataStr : this.primeiroDiaMes();
    let dataArr = dataStr.split("/");
    let mm = parseInt(dataArr[1]) - 1;
    let aaaa = parseInt(dataArr[2]);

    var data = new Date(aaaa, mm, 1);
    var ultimoDia = new Date(data.getFullYear(), data.getMonth() + 1, 0);
    return this.formatarData(ultimoDia);
  },

  mesPorExtenso(dataStr) {
    let data = dataStr.split("/");
    let mm = parseInt(data[1]);
    let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    return meses[mm - 1] + " de " + data[2];
  },

  dataPorExtenso(dataStr) {
    let data = dataStr.split("/");
    let dd = parseInt(data[0]);
    return dd + " de " + this.mesPorExtenso(dataStr);
  }
};

export default DataUtil;
