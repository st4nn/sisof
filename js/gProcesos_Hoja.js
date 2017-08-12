$(document).ready(function()
{
	gProcesos_Hoja();
});

function gProcesos_Hoja()
{
  $("#cntGProcesos_Hoja_Documentos").iniciarObjArchivos({objPrefijo : $("#txtGProcesos_Hoja_idProceso"), Proceso: "Documentos del Proceso", Usuario: Usuario.id});
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