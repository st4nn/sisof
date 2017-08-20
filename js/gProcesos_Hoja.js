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
    $("#txtGProcesos_Hoja_Personal option").remove();

    var tds = '<option value="0">Seleccione un Cargo de la lista</option>';
    cargarCargos(function(datos)
    {
      $.each(datos, function(index, val) 
      {
        tds += '<option value="' + val.idInterno + '">' + val.Texto + '</option>';
      });
      $("#txtGProcesos_Hoja_Responsable").append(tds);
      $("#txtGProcesos_Hoja_Personal").append(tds);
      
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
                  id : data.trim(), 
                  Clasificacion : $("#txtGProcesos_Hoja_Riesgo_Clasificacion option:selected").text(),
                  Riesgo : $("#txtGProcesos_Hoja_Riesgo option:selected").text()
                })
            }
          });
      }
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

  $("#btnGProcesos_Hoja_AgregarActividad").on("click", function(evento)
  {
    evento.preventDefault();
    $("#frmGProcesos_Hoja_Actividad")[0].reset();
    $("#txtGProcesos_Hoja_Actividad_id").val("NULL")
    $("#cntGProcesos_Hoja_Actividad").modal('show');
  });

  $("#frmGProcesos_Hoja_Actividad").on("submit", function(evento)
  {
    evento.preventDefault();
    $(this).generarDatosEnvio('txtGProcesos_Hoja_Actividad_', function(datos)
      {
        datos = $.parseJSON(datos);
        datos.idEmpresa = $("#txtInicio_idEmpresa").val();
        datos.idDiagrama = $("#txtGProcesos_Mapa_id").val();
        datos.idKey = $("#txtGProcesos_Hoja_idProceso").val();
        
        $.post('../server/php/proyecto/gProcesos_Hoja_ActividadCrear.php', datos, 
          function(data, textStatus, xhr) 
          {
            if (isNaN(data))
            {
              Mensaje("Error", data, "danger");
            } else
            {
              $("#tblGProcesos_Hoja_Actividades tbody tr[idActividad=" + data + "]").remove();
              $("#cntGProcesos_Hoja_Actividad").modal('hide');
              gProcesos_Hoja_ponerActividad({
                id : data.trim(), 
                Nombre : $("#txtGProcesos_Hoja_Actividad_Nombre").val(),
                Recursos : $("#txtGProcesos_Hoja_Actividad_Recursos").val(),
                Insumos : $("#txtGProcesos_Hoja_Actividad_Insumos").val(),
                RSST : $("#txtGProcesos_Hoja_Actividad_RSST").val()
                });
            }
          });
      });
  });

  $(document).delegate('.btnGprocesos_Hoja_EditarActividad', 'click', function(evento)
  {
    evento.preventDefault();
    var fila = $(this).parent('td').parent('tr').find('td');
    $("#txtGProcesos_Hoja_Actividad_id").val($(this).attr('idActividad'));
    $("#txtGProcesos_Hoja_Actividad_Nombre").val($(fila[0]).text());
    $("#txtGProcesos_Hoja_Actividad_Recursos").val($(fila[1]).text());
    $("#txtGProcesos_Hoja_Actividad_Insumos").val($(fila[2]).text());
    $("#txtGProcesos_Hoja_Actividad_RSST").val($(fila[3]).text());

    $("#cntGProcesos_Hoja_Actividad").modal('show');
  });

  $(document).delegate('.btnGprocesos_Hoja_QuitarActividad', 'click', function(evento)
  {
    evento.preventDefault();
    var fila = $(this).parent('td').parent('tr');
    var idActividad = $(this).attr("idActividad");
    bootbox.confirm({
      message: "Estas seguro de quitar esta Actividad del Listado?",
      buttons: {
          confirm: {
              label: 'Si, quitarla',
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
          $.post('../server/php/proyecto/gProcesos_ActividadQuitar.php', {idActividad: idActividad}, function(data, textStatus, xhr) 
          {
            $(fila).remove();
          });
        }
      }
    });
  });

  $("#btnGProcesos_Hoja_AgregarPersonal").on('click', function(evento)
  {
    evento.preventDefault();
    var idPersonal = $("#txtGProcesos_Hoja_Personal").val();
    if ($("#txtGProcesos_Hoja_Personal").val() != '')
    {
      if ($("#tblGProcesos_Hoja_Personal li[idCargo=" + idPersonal + "]").length == 0)
      {
        var datos = {idCargo : idPersonal, Usuario : Usuario.id};
        datos.idEmpresa = $("#txtInicio_idEmpresa").val();
        datos.idDiagrama = $("#txtGProcesos_Mapa_id").val();
        datos.idKey = $("#txtGProcesos_Hoja_idProceso").val();

        $.post('../server/php/proyecto/gProcesos_Hoja_PersonalCrear.php', datos, 
        function(data, textStatus, xhr) {
          if (isNaN(data))
          {
            Mensaje("Error", data, "danger");
          } else
          {
            gProcesos_Hoja_ponerPersonal({
              id : data.trim(),
              idCargo : idPersonal,
              Cargo : $("#txtGProcesos_Hoja_Personal option:selected").text()
            });
          }
        });
      }      
    }
  });

  $(document).delegate('.btnGprocesos_Hoja_QuitarPersonal', 'click', function(evento)
    {
      evento.preventDefault();
      var fila = $(this).parent('li');
      var idPersonal = $(this).attr("idPersonal");
      bootbox.confirm({
        message: "Estas seguro de quitar este Cargo del Listado?",
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
            $.post('../server/php/proyecto/gProcesos_PersonalQuitar.php', {idPersonal: idPersonal}, function(data, textStatus, xhr) 
            {
              $(fila).remove();
            });
          }
        }
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
      if (data.Riesgos.length > 0)
      {
        $.each(data.Riesgos, function(index, val) 
        {
          gProcesos_Hoja_ponerRiesgo(val);  
        });
      }
      
      if (Object.keys(data.Info).length > 0)
      {
        $("#txtGProcesos_Hoja_Objetivo").val(data.Info.Objetivo);
        $("#txtGProcesos_Hoja_Responsable").val(data.Info.idResponsable);
      }

      $("#tblGProcesos_Hoja_Actividades tbody tr").remove();
      if (data.Actividades.length > 0)
      {
        $.each(data.Actividades, function(index, val) 
        {
          gProcesos_Hoja_ponerActividad(val);  
        });
      }

      $("#tblGProcesos_Hoja_Personal li").remove();
      if (data.Personal.length > 0)
      {
        $.each(data.Personal, function(index, val) 
        {
          gProcesos_Hoja_ponerPersonal(val);  
        });
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

function gProcesos_Hoja_ponerActividad(datos)
{
  var tds = '';
  tds += '<tr idActividad="' + datos.id + '">';
    tds += '<td>';
      tds += datos.Nombre;
    tds += '</td> ';
    tds += '<td>';
      tds += datos.Recursos;
    tds += '</td>';
    tds += '<td>';
      tds += datos.Insumos;
    tds += '</td>';
    tds += '<td>';
      tds += datos.RSST;
    tds += '</td>';
    tds += '<td class="text-center">';
      tds += '<button idActividad="' + datos.id + '" type="button" class="btn btn-pure btn-primary icon wb-edit btnGprocesos_Hoja_EditarActividad"></button>';
      tds += '<button idActividad="' + datos.id + '" type="button" class="btn btn-pure btn-danger icon wb-close btnGprocesos_Hoja_QuitarActividad"></button>';
    tds += '</td>';
  tds += '</tr>';

  $("#tblGProcesos_Hoja_Actividades tbody").append(tds);
}

function gProcesos_Hoja_ponerPersonal(datos)
{
  if ($("#tblGProcesos_Hoja_Personal li[idCargo=" + datos.idCargo + "]").length == 0)
  {
    var tds = '';
    tds += '<li idCargo="' + datos.idCargo + '" class="list-group-item list-group-dividered">';
      tds += '<button idPersonal="' + datos.id + '" class="btn btn-pure btn-danger pull-right icon fa-user-times btnGprocesos_Hoja_QuitarPersonal"></button> ';
      tds += datos.Cargo;
    tds += '</li>';

    $("#tblGProcesos_Hoja_Personal").append(tds);
  }
  
}