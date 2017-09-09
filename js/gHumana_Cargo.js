$(document).ready(function()
{
	gHumana_Cargo();
});

function gHumana_Cargo()
{
  $("#cntGHumana_Cargo_Profesiograma").iniciarObjArchivos({objPrefijo : $("#txtGHumana_Cargo_idCargo"), Proceso: "Profesiograma", Usuario: Usuario.id});

  $("#frmGHumana_Cargo").on("submit", function(evento)
  {
    evento.preventDefault();

    $(this).generarDatosEnvio('txtGHumana_Cargo_', function(datos)
    {
      datos = JSON.parse(datos);
      datos.idEmpresa = $("#txtInicio_idEmpresa").val();

      $.post('../server/php/proyecto/gHumana_Cargo_Crear.php', datos, 
        function(data, textStatus, xhr) {
          if (!isNaN(data))
          {
            Mensaje("Hey", "Los datos han sido ingresados", "success");
          } else
          {
            Mensaje("Error", data, "danger");
          }
        });
    });
  });

  $("#btnGHumana_Cargo_AgregarEPP").on("click", function(evento)
    {
      evento.preventDefault();
      $.post('../server/php/proyecto/gHumana_Cargo_AsociarEPP.php', 
        {
          Usuario : Usuario.id,
          idEmpresa : $("#txtInicio_idEmpresa").val(),
          idCargo : $("#txtGHumana_Cargo_idCargo").val(),
          idEPP : $("#txtGHumana_Cargo_AgregarEPP").val()
        }, function(data, textStatus, xhr) 
        {
          if (isNaN(data))
          {
            Mensaje('Error', data, 'danger');
          } else
          {
            var val = {
              id : data,
              idEPP : $("#txtGHumana_Cargo_AgregarEPP").val(),
              EPP : $("#txtGHumana_Cargo_AgregarEPP option:selected").text()
            };
            gHumana_Cargo_AgregarEPP(val);
          }
        });
    });

  $(document).delegate('.btnHumana_Cargo_QuitarEPP', 'click', function(evento)
    {
      evento.preventDefault();
      var fila = $(this).parent('li');
      var idCargoEPP = $(this).attr("idCargoEPP");
      bootbox.confirm({
        message: "Estas seguro de quitar este EPP del Listado?",
        buttons: {
            confirm: {
                label: 'Si, quitarlo',
                className: 'btn-danger'
            },
            cancel: {
                label: 'No',
                className: 'btn-default'
            }
        },
        callback: function (result) {
          if (result)
          {
            $.post('../server/php/proyecto/gHumana_Cargo_EPPQuitar.php', {idCargoEPP: idCargoEPP}, function(data, textStatus, xhr) 
            {
              $(fila).remove();
            });
          }
        }
      });

    });
}

function gHumana_Cargo_cargarCargo(idCargo)
{
  $("#frmGHumana_Cargo")[0].reset();
  $.post('../server/php/proyecto/gHumana_cargarCargo.php', 
    {
      Usuario: Usuario.id,
      idDiagrama : $("#txtGHumana_Organigrama_id").val(),
      idKey : idCargo
    }, function(data, textStatus, xhr) {
    if (data == 0)
    {
      cargarModulo('gHumana/organigrama.html', 'Organigrama de Gestión Humana', function()
      {
        Mensaje("Error", 'No se encontró información guardada acerca del proceso', 'danger'); 
      });
    } else
    {
      $("#lblGHumana_Cargo_Titulo").text(data.Texto);
      $("#txtGHumana_Cargo_idCargo").val(idCargo);
      
      $("#cntGHumana_Cargo_Profesiograma").cargarArchivos({Prefijo : $("#txtGHumana_Cargo_idCargo").val(), Proceso : 'Profesiograma'});
      $.post('../server/php/proyecto/gHumana_Cargo_Cargar.php', {Usuario: Usuario.id, idEmpresa : $("#txtInicio_idEmpresa").val(), idCargo : idCargo}, 
        function(data, textStatus, xhr) 
        {
          $.each(data.datos, function(numFila, fila) 
          {
             $.each(fila, function(index, val) 
             {
                if ($("#txtGHumana_Cargo_" + index).length > 0)
                {
                  $("#txtGHumana_Cargo_" + index).val(val);
                }
             });
          });

          $.each(data.EPP, function(numFila, fila) 
          {
             gHumana_Cargo_AgregarEPP(fila);
          });
        }, 'json');

      $("#cntGHumana_Cargo_EPP li").remove();

      $.post('../server/php/proyecto/gHumana_MatrizEPP_Cargar.php', 
      {
        Usuario : Usuario.id,
        idEmpresa : $("#txtInicio_idEmpresa").val()
      }, function(data, textStatus, xhr) 
      {
        var tds = '';
        $("#txtGHumana_Cargo_AgregarEPP option").remove();

        if (data == 0)
        {
          Mensaje('Hey', 'Aún no se ha agregado ningún elementro a la Matriz de EPP', 'danger');
          cargarModulo('gHumana/matrizEPP.html', 'Matriz de EPP');
        } else
        {
          $.each(data, function(index, val) 
          {
             tds += '<option value="' + val.id + '">' + val.EPP + '</option>';
          });
          $("#txtGHumana_Cargo_AgregarEPP").append(tds);
        }
      }, 'json');

      
    }
  }, 'json');

}

function gHumana_Cargo_AgregarEPP(datos)
{
  if ($("#cntGHumana_Cargo_EPP li[idEPP=" + datos.idEPP + "]").length == 0)
  {
    var tds = '';
    tds += '<li idEPP="' + datos.idEPP + '" class="list-group-item list-group-dividered">';
      tds += '<button idCargoEPP="' + datos.id + '" class="btn btn-pure btn-danger pull-right icon fa-close btnHumana_Cargo_QuitarEPP"></button>';
      tds += datos.EPP;
    tds += '</li>';

    $("#cntGHumana_Cargo_EPP").append(tds);
  }
}