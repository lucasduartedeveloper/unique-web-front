const StringUtil = {
  // TODO: Implementar validação mais criteriosa se necessário
  validarEmail(email) {
    return email.includes("@");
  },

  // TODO: Implementar validação real se necessário
  validarCpf(cpf) {
    cpf = this.unmask(cpf);
    return cpf.length >= 11;
  },

  mask(texto, mask) {
    var textoMasked = "";
    var posicao = 0;
    for (var i = 0; i < mask.length; i++) {
      var chr = mask.charAt(i);

      // Substitui os caracteres da máscara
      if (posicao === texto.length) {
        return textoMasked;
      }
      else if (chr === "9") {
        textoMasked += texto.charAt(posicao);
        posicao++;
      }
      else textoMasked += chr;
    }
    return textoMasked;
  },

  unmask(texto) {
    return texto.replace(/[^a-zA-Z0-9]/g, "");
  },

  nomeVinculo(codigo) {
    switch (codigo) {
      case 0:
        return "Indefinido";
      case 1:
        return "CLT";
      case 2:
        return "Autônomo";
      case 3:
        return "Sócio/Proprietário";
      case 4:
        return "Estágiario";
      case 5:
        return "Prestador de Serviço";
      default:
        return "";
    }
  },

  nomePerfil(codigo) {
    switch (codigo) {
      case 0:
        return "X-Brain";
      case 1:
        return "Administrador";
      case 2:
        return "Operador";
      default:
        return "";
    }
  },

  faFileIcon(nome) {
    let pos = nome.lastIndexOf(".");
    let extensao = nome.substring(pos).toUpperCase();

    switch (extensao) {
      case ".PDF":
        return "fa-file-pdf-o";
      case ".JPG":
        return "fa-file-image-o";
      case ".PNG":
        return "fa-file-image-o";
      case ".BMP":
          return "fa-file-image-o";
      case ".XLS":
        return "fa-file-excel-o";
      case ".XLSX":
        return "fa-file-excel-o";
      case ".CSV":
        return "fa-file-excel-o";
      case ".DOC":
        return "fa-file-word-o";
      case ".DOCX":
        return "fa-file-word-o";
      case ".ZIP":
        return "fa-file-zip-o";
      case ".RAR":
        return "fa-file-archive-o";
      case ".7Z":
        return "fa-file-archive-o";
      default:
        return "fa-file-o";
    }
  }
};

export default StringUtil;
