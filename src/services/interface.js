/* global $, swal */

const UI = {
  loader: (action, text) => {
    if (action === "show") {
      $("#loader").show();
      $("#loader-text").text(text ? text : "");
    } else {
      $("#loader").hide();
    }
  },

  toggleModal: id => {
    $(id).modal("toggle");
  },

  alert: (success, message, icon) => {
    let object = {
      text: message,
      icon: !icon ? (success ? "success" : "error") : icon,
      button: {
        text: "Entendi",
        value: true,
        visible: true,
        className: "btn " + (success ? "btn-primary" : "btn-danger")
      }
    }
    return swal(object);
  },

  confirm: (title, message) => {
    let object = {
      title: title,
      text: message,
      icon: "info",
      showCancelButton: true,
      buttons: {
        cancel: {
          text: "Cancelar",
          value: null,
          visible: true,
          className: "btn btn-danger",
          closeModal: true,
        },
        confirm: {
          text: "Tenho",
          value: true,
          visible: true,
          className: "btn btn-primary",
          closeModal: true
        }
      }
    }
    return swal(object);
  },

  inputHelpers: () => {
    $(".form-check .form-check-label,.form-radio .form-check-label")
      .not(".todo-form-check .form-check-label")
      .append('<i class="input-helper"></i>');
  },

  dataTable: (id) => {
    if (!$.fn.dataTable.isDataTable(id)) {
      $(id).DataTable({
        "iDisplayLength": 100,
        "bFilter": false,
        "bLengthChange": false,
        "language": {
          "emptyTable": "Nenhum registro encontrado",
          "infoEmpty": "Página 1 de 1",
          "paginate": {
            "previous": "<",
            "next": ">"
          },
          "info": "Página _PAGE_ de _PAGES_"
        }
      });
    }
  }
};

export default UI;
