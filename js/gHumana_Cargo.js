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
          $.each(data, function(numFila, fila) 
          {
             $.each(fila, function(index, val) 
             {
                if ($("#txtGHumana_Cargo_" + index).length > 0)
                {
                  $("#txtGHumana_Cargo_" + index).val(val);
                }
             });
          });
        }, 'json');

      
    }
  }, 'json');
}