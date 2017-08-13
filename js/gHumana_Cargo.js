$(document).ready(function()
{
	gHumana_Cargo();
});

function gHumana_Cargo()
{
  $("#cntGHumana_Cargo_Profesiograma").iniciarObjArchivos({objPrefijo : $("#txtGHumana_Cargo_idCargo"), Proceso: "Profesiograma", Usuario: Usuario.id});
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
      $("#txtGHumana_Cargo_idCargo").val(idCargo);
      $("#cntGHumana_Cargo_Profesiograma").cargarArchivos({Prefijo : $("#txtGHumana_Cargo_idCargo").val(), Proceso : 'Profesiograma'});
    }
  }, 'json');
}