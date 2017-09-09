$(document).ready(function()
{
	gHumana_EntregaEPP_Agregar();
});

function gHumana_EntregaEPP_Agregar()
{
  var tFecha = obtenerFecha().substring(0, 10); 
  $("#txtGHumana_EntregaEPP_fechaEntrega").val(tFecha);

  $("#txtGHumana_EntregaEPP_fechaEntrega.datepicker").datepicker({
        clearBtn: true,
        language: "es",
        orientation: "top auto",
        daysOfWeekHighlighted: "0",
        autoclose: true,
        todayHighlight: true
    });

  $("#frmGHumana_EntregaEPP").on("submit", function(evento)
    {
        evento.preventDefault();
        $(this).generarDatosEnvio('txtGHumana_EntregaEPP_', function(datos)
        {
          datos = JSON.parse(datos);
          datos.idEmpresa = $("#txtInicio_idEmpresa").val();
        });
    });

  $("#txtGHumana_EntregaEPP_Personal_Agregar").on('click', function(evento)
  {
    evento.preventDefault();
    $("#txtGHumana_EntregaEPP_idPersonal").val($("#txtGHumana_EntregaEPP_Personal").val());
    $("#lblGHumana_EntregaEPP_Nombre").text($("#txtGHumana_EntregaEPP_Personal option:selected").text());
    $("#lblGHumana_EntregaEPP_Cedula").text($("#txtGHumana_EntregaEPP_Personal option:selected").attr('Cedula'));

    $.post('../server/php/proyecto/gHumana_EPP_CargarPorPersona.php', 
      {
        Usuario : Usuario.id,
        idEmpresa : $("#txtInicio_idEmpresa").val(),
        idPersona : $("#txtGHumana_EntregaEPP_Personal").val()
      }, function(data, textStatus, xhr) 
      {
        if (data != 0)
        {
          $.each(data, function(index, val) 
          {
             gHumana_EntregaEPP_AgregarEPP(val);
          });
        }
      }, 'json');

  });

  $(document).delegate('.btnGHumana_EntregaEPP_Entregar', 'click', function(event) 
  {
    event.preventDefault();

    var idEPP = $(this).attr("idEPP");
    var EPP = $(this).attr("EPP");
    var contenedor = $(this).parent("td").parent("tr");

    var Talla = $(contenedor).find(".txtgHumana_EntregaEPP_Talla").val();
    var Cantidad = $(contenedor).find(".txtgHumana_EntregaEPP_Cantidad").val();

    bootbox.confirm({
        message: "Estas seguro de Registrar ésta entrega?",
        buttons: {
            confirm: {
                label: 'Si, registrar',
                className: 'btn-success'
            },
            cancel: {
                label: 'No, aún no',
                className: 'btn-default'
            }
        },
        callback: function (result) {
          if (result)
          {
            gHumana_EntregaEPP_GuardarEntregado(idEPP, EPP, Talla, Cantidad);
          }
        }
      });

    });

}

function gHumana_EntregaEPP_CargarEPP()
{
  $.post('../server/php/proyecto/gHumana_MatrizEPP_Cargar.php', 
    {
      Usuario : Usuario.id,
      idEmpresa : $("#txtInicio_idEmpresa").val()
    }, function(data, textStatus, xhr) 
    {
      var tds = '';
      $("#txtGHumana_EntregaEPP_idEPP option").remove();

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
        $("#txtGHumana_EntregaEPP_idEPP").append(tds);
      }
    }, 'json');
}

function gHumana_EntregaEPP_Cargar()
{
  gHumana_EntregaEPP_CargarEPP();
  $("#txtGHumana_EntregaEPP_idPersonal").val(0);
  $("#tblGHumana_EntregaEPP_Entregados tbody tr").remove();
  $("#lblGHumana_EntregaEPP_Cedula").text('');
  $("#lblGHumana_EntregaEPP_Nombre").text('');

  $.post('../server/php/proyecto/gHumana_Personal_Cargar.php', 
    {
      Usuario : Usuario.id,
      idEmpresa : $("#txtInicio_idEmpresa").val()
    }, function(data, textStatus, xhr) 
    {
      $("#txtGHumana_EntregaEPP_Personal option").remove();

      var tds = "";
      
      if (data != 0)
      {
        var tds = '';
        $.each(data, function(index, val) 
        {
          tds += '<option value="' + val.id + '" Cedula="' + val.Numero_id + '">' + val.Apellidos + ' ' + val.Nombres + '</option>';
        });
        $("#txtGHumana_EntregaEPP_Personal").append(tds);
      } else
      {
        Mensaje('Hey', 'Aún no has cargado el Personal', 'danger');
        cargarModulo('gHumana/personal.html', 'Personal', gHumana_Personal_Cargar());
      }
    }, 'json');
}

function gHumana_EntregaEPP_AgregarEPP(val)
{
  var Item = $("#tblGHumana_EntregaEPP_Entregados tbody tr").length + 1;
  var tds = '<tr>';
  tds += '<td></td>';
  tds += '<td>' + Item + '</td>';
  tds += '<td>' + val.EPP+ '</td>';
  tds += '<td><input type="text" placeholder="Talla" class="form-control txtgHumana_EntregaEPP_Talla" value="' + val.Talla + '"></td>';
  tds += '<td><input type="number" placeholder="Cantidad" class="form-control txtgHumana_EntregaEPP_Cantidad" value="' + val.Cantidad+ '"></td>';

  if (val.fechaEntrega != '')
  {
    tds += '<td>' + val.fechaEntrega+ '</td>';
    tds += '<td><button EPP=' + val.EPP+ ' idEPP="' + val.idEPP + '" class="btn btn-warning btnGHumana_EntregaEPP_Entregar">Entregar nuevo</button></td>';
  } else
  {
    tds += '<td><button EPP=' + val.EPP+ ' idEPP="' + val.idEPP + '" class="btn btn-primary  btnGHumana_EntregaEPP_Entregar">Entregar</button></td>';
    tds += '<td></td>';
  }

  tds += '</tr>';

  $("#tblGHumana_EntregaEPP_Entregados tbody").append(tds);

}

function gHumana_EntregaEPP_GuardarEntregado(idEPP, EPP, Talla, Cantidad)
{
  $.post('../server/php/proyecto/gHumana_EPP_Entregar.php', 
    {
      idEPP : idEPP, 
      Talla : Talla, 
      Cantidad : Cantidad, 
      fechaEntrega : $("#txtGHumana_EntregaEPP_fechaEntrega").val(),
      Proyecto : $("#txtGHumana_EntregaEPP_Proyecto").val(),
      idPersona : $("#txtGHumana_EntregaEPP_idPersonal").val(),
      Usuario : Usuario.id,
      idEmpresa : $("#txtInicio_idEmpresa").val()
    }, function(data, textStatus, xhr) 
    {
      if (isNaN(data))
      {
        Mensaje("Error", data, 'danger');
      } else
      {
        gHumana_EntregaEPP_AgregarEPP({
          idEPP : idEPP, 
          EPP : EPP, 
          Talla : Talla, 
          Cantidad : Cantidad, 
          fechaEntrega : $("#txtGHumana_EntregaEPP_fechaEntrega").val()
        });
      }
    });


}