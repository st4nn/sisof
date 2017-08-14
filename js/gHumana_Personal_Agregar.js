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
}	

function gHumana_Personal_CargarPersona(Prefijo)
{
    gHumana_Personal_LlenarCargos();
	if (Prefijo === undefined)
	{
		$("#frmGHumana_Personal_Agregar")[0].reset();
		$("#txtGHumana_Personal_Prefijo").val(obtenerPrefijo());
	} else
	{
		$("#imggHumana_Personal_Imagen_Preview").attr("src", "");
		$.post('../server/php/proyecto/gHumana_Personal_CargarElemento.php', 
		{
			Usuario : Usuario.id,
			Prefijo : Prefijo
		}, function(data, textStatus, xhr) 
		{
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
    console.log(tdsOpersonal_Option);
    $("#txtGHumana_Personal_idCargo").append(tdsOpersonal_Option);
}


