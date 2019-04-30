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
  }
};

export default StringUtil;
