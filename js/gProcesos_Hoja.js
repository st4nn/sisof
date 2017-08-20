$(document).ready(function()
{
	gProcesos_Hoja();
});

function gProcesos_Hoja()
{
  $("#cntGProcesos_Hoja_Documentos").iniciarObjArchivos({objPrefijo : $("#txtGProcesos_Hoja_idProceso"), Proceso: "Documentos del Proceso", Usuario: Usuario.id});
  
  $("#btnGProcesos_Hoja_CargarResponsables").on("click", function(evento)
  {
    evento.preventDefault();
    $("#txtGProcesos_Hoja_Responsable option").remove();
    var tds = '<option value="0">Seleccione un Cargo de la lista</option>';
    cargarCargos(function(datos)
    {
      $.each(datos, function(index, val) 
      {
        tds += '<option value="' + val.idInterno + '">' + val.Texto + '</option>';
      });
      $("#txtGProcesos_Hoja_Responsable").append(tds);
    });
  });

  cargarRiesgos_Clasificacion(function(data)
  {
    $("#txtGProcesos_Hoja_Riesgo_Clasificacion option").remove();
    var tds = '<option value=""></option>';
    $.each(data, function(index, val) {
       tds += '<option value="' + val.id  + '">' + val.Nombre + '</option>';
    });

    $("#txtGProcesos_Hoja_Riesgo_Clasificacion").append(tds);

    $("#txtGProcesos_Hoja_Riesgo_Clasificacion, #txtGProcesos_Hoja_Riesgo").select2({
      language: "es",
      placeholder: 'Selecciona una opción de la Lista'
    });

    $('#txtGProcesos_Hoja_Riesgo_Clasificacion').on('change', function(evt) 
    {
      var idRiesgo = $(this).val();
      $("#txtGProcesos_Hoja_Riesgo").select2("destroy");
      var tds = '';
      $("#txtGProcesos_Hoja_Riesgo option").remove();
      if (idRiesgo != '')
      {
        $.post('../server/php/proyecto/gProcesos_cargarRiesgos.php', {idClasificacion : idRiesgo}, function(data, textStatus, xhr) 
        {
          $.each(data, function(index, val) 
          {
            tds += '<option value="' + val.id + '">' + val.Nombre + '</option>';
          });

          $("#txtGProcesos_Hoja_Riesgo").append(tds);
          $("#txtGProcesos_Hoja_Riesgo").select2({
            language: "es",
            placeholder: 'Selecciona una opción de la Lista'
          });
        }, 'json');
      }

    });
  });


  $("#btnGProcesos_Hoja_AgregarRiesgo").on("click", function(evento)
    {
      if ($("#txtGProcesos_Hoja_Riesgo").val() != null)
      {
        $.post('../server/php/proyecto/gProcesos_RiesgoAsociar.php', 
          {
            Usuario: Usuario.id,
            idEmpresa : $("#txtInicio_idEmpresa").val(),
            idProceso : $("#txtGProcesos_Hoja_idProceso").val(),
            idRiesgo : $("#txtGProcesos_Hoja_Riesgo").val()
          }, function(data, textStatus, xhr) 
          {
            if (isNaN(data))
            {
              Mensaje("Error", data, "danger");
            } else
            { 
              gProcesos_Hoja_ponerRiesgo(
                {
                  id : data, 
                  Clasificacion : $("#txtGProcesos_Hoja_Riesgo_Clasificacion option:selected").text(),
                  Riesgo : $("#txtGProcesos_Hoja_Riesgo option:selected").text()
                })
            }
          });
      }
        /*
        bootbox.confirm({message:"<form id='infos' action=''>\
                        First name:<input type='text' name='first_name' /><br/>\
                        Last name:<input type='text' name='last_name' />\
                    </form>", 
                    buttons: {
                confirm: {
                    label: 'Agregar',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Cancelar',
                    className: 'btn-danger btn-inverse'
                }
            },
            callback : function(result) {
                if(result)
                {
                    //$('#infos').submit();
                }
            }});  
        */
    });

  $(document).delegate('.btnGprocesos_Hoja_QuitaRiesgo', 'click', function(evento)
    {
      evento.preventDefault();
      var fila = $(this).parent('td').parent('tr');
      var idRiesgo = $(this).attr("idRiesgo");
      bootbox.confirm({
        message: "Estas seguro de quitar este riesgo del Listado?",
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
            $.post('../server/php/proyecto/gProcesos_RiesgoQuitar.php', {idRiesgo: idRiesgo}, function(data, textStatus, xhr) 
            {
              $(fila).remove();
            });
          }
        }
      });
    });

  $("#frmGProcesos_Hoja_Info").on("submit", function(evento)
  {
    evento.preventDefault();
    $(this).generarDatosEnvio("txtGProcesos_Hoja_", function(datos)
    {
      datos = $.parseJSON(datos);
      datos.idEmpresa = $("#txtInicio_idEmpresa").val();
      datos.idDiagrama = $("#txtGProcesos_Mapa_id").val();
      datos.idKey = $("#txtGProcesos_Hoja_idProceso").val();
      $.post('../server/php/proyecto/gProcesos_Hoja_InfoGuardar.php', datos, function(data, textStatus, xhr) {
        if (isNaN(data))
        {
          Mensaje("Error", data, "danger");
        } else
        {
          Mensaje("Hey", 'Los cambios han sido ingresados', 'success');
        }
      });
    });
  });


}

function gProcesos_Hoja_cargarProceso(idProceso)
{
  $("#btnGProcesos_Hoja_CargarResponsables").trigger("click");
  $.post('../server/php/proyecto/gProcesos_CargarHoja.php', 
    {
      Usuario: Usuario.id,
      idDiagrama : $("#txtGProcesos_Mapa_id").val(),
      idKey : idProceso
    }, function(data, textStatus, xhr) {
    if (data == 0)
    {
      cargarModulo('gProcesos/mapa.html', 'Gestión de Procesos', function()
      {
        Mensaje("Error", 'No se encontró información guardada acerca del proceso', 'danger'); 
      });
    } else
    {
      $("#lblGProcesos_Hoja_Titulo").text(data.Datos.Texto);
      
      $("#txtGProcesos_Hoja_idProceso").val(idProceso);

      $("#tblGProcesos_Hoja_Riesgos tbody tr").remove();
      $.each(data.Riesgos, function(index, val) 
      {
        gProcesos_Hoja_ponerRiesgo(val);  
      });
      
      if (Object.keys(data.Info).length > 0)
      {
        $("#txtGProcesos_Hoja_Objetivo").val(data.Info.Objetivo);
        $("#txtGProcesos_Hoja_Responsable").val(data.Info.idResponsable);
      }
    }
  }, 'json');
}

function gProcesos_Hoja_ponerRiesgo(datos)
{
  var tds = '';
  tds += '<tr idProcesoRiesgo="' + datos.id + '">';
    tds += '<td>';
      tds += datos.Clasificacion;
    tds += '</td> ';
    tds += '<td>';
      tds += datos.Riesgo;
    tds += '</td>';
    tds += '<td class="text-center">';
      tds += '<button idRiesgo="' + datos.id + '" type="button" class="btn btn-pure btn-danger icon wb-close btnGprocesos_Hoja_QuitaRiesgo"></button>';
    tds += '</td>';
  tds += '</tr>';

  $("#tblGProcesos_Hoja_Riesgos tbody").append(tds);
}