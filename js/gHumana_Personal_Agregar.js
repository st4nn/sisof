$(document).ready(gHumana_Personal_Agregar);

function gHumana_Personal_Agregar()
{
    $("#frmGHumana_Personal_Agregar .datepicker").datepicker({
        clearBtn: true,
        language: "es",
        orientation: "top auto",
        daysOfWeekHighlighted: "0",
        autoclose: true,
        todayHighlight: true
    });

    $("#frmGHumana_Personal_Agregar").on("submit", function(evento)
    {
    	evento.preventDefault();
    	$(this).generarDatosEnvio("txtGHumana_Personal_", function(datos)
    	{
    		$.post('../server/php/proyecto/gHumana_Personal_Crear.php', 
    			{
    				datos: datos,
    				Usuario : Usuario.id,
    				idEmpresa : $("#txtInicio_idEmpresa").val()
    			}, function(data, textStatus, xhr) 
    			{
    				if (isNaN(data))
    				{
    					Mensaje("Error", data, "danger");
    				}	else
    				{
    					Mensaje("Ok", "Los datos han sido ingresados", "success");
    					gHumana_Personal_Cargar();
    				}
    			});
    	});
    });

    $("#btnGHumana_Personal_Agregar_QuitarPersona").on("click", function(evento)
    {
        var id = $("#txtGHumana_Personal_Prefijo").val();
        bootbox.confirm({
            message: "Estas seguro de quitar esta Persona?",
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
                $.post('../server/php/proyecto/gHumana_Personal_Quitar.php', {id: id}, function(data, textStatus, xhr) 
                {
                  gHumana_Personal_Cargar();
                  cargarModulo('gHumana/personal.html', 'Personal');
                });
              }
            }
          });        
    });

}	

function gHumana_Personal_CargarPersona(Prefijo)
{
    gHumana_Personal_LlenarCargos();
	if (Prefijo === undefined)
	{
		$("#frmGHumana_Personal_Agregar")[0].reset();
		$("#txtGHumana_Personal_Prefijo").val('NULL');
	} else
	{
		$("#imggHumana_Personal_Imagen_Preview").attr("src", "");
		$.post('../server/php/proyecto/gHumana_Personal_CargarElemento.php', 
		{
			Usuario : Usuario.id,
			Prefijo : Prefijo
		}, function(data, textStatus, xhr) 
		{
            $("#txtGHumana_Personal_Prefijo").val(data.id);
            $.each(data, function(index, val) 
            {
				 if ($("#txtGHumana_Personal_" + index).length > 0)
                 {
                    $("#txtGHumana_Personal_" + index).val(val);
                 }
			});
		}, 'json');
	}
}

function gHumana_Personal_LlenarCargos()
{
    $("#txtGHumana_Personal_idCargo option").remove();
    $("#txtGHumana_Personal_idCargo").append(tdsOpersonal_Option);
}


