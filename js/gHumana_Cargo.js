$(document).ready(function()
{
	gHumana_Cargo();
});

function gHumana_Cargo()
{
  //$("#cntGProcesos_Hoja_Documentos").iniciarObjArchivos({objPrefijo : $("#txtGProcesos_Hoja_idProceso"), Proceso: "Documentos del Proceso", Usuario: Usuario.id});
}

function gHumana_Cargo_cargarCargo(idCargo)
{
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
      $("#txtGHumana_Cargo_idCargo").val(idProceso);
    }
  }, 'json');
}