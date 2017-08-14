$(document).ready(function()
{
	gProcesos_Hoja();
});

function gProcesos_Hoja()
{
  $("#cntGProcesos_Hoja_Documentos").iniciarObjArchivos({objPrefijo : $("#txtGProcesos_Hoja_idProceso"), Proceso: "Documentos del Proceso", Usuario: Usuario.id});

  $("#btnGProcesos_Hoja_AgregarRiesgo").on("click", function(evento)
    {
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
    });
}

function gProcesos_Hoja_cargarProceso(idProceso)
{
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
      $("#lblGProcesos_Hoja_Titulo").text(data.Texto);
      $("#txtGProcesos_Hoja_idProceso").val(idProceso);
    }
  }, 'json');
}