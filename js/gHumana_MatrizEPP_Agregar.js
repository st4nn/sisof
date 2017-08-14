$(document).ready(gHumana_MatrizEPP_Agregar);

function gHumana_MatrizEPP_Agregar()
{

	$("#cntGHumana_MatrizEPP_Imagen").iniciar_CargadorImagenes({idObj : 'gHumana_MatrizEPP_Imagen'});

	$('#btnGHumana_MatrizEPP_Tipo_de_Proteccion_Agregar').on('click', function() {
      bootbox.prompt({
        title: "Por favor ingrese el nuevo nombre",
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
        callback: function(result) {
          if (result !== null) {
            if (result != "")
            {	
            	var tds = '<option value="' + result + '">' + result + '</option>';
            	$("#txtGHumana_MatrizEPP_Tipo_de_Proteccion").append(tds);
            	$("#txtGHumana_MatrizEPP_Tipo_de_Proteccion").val(result);
            }
          }
        }
      });
    });

    $("#frmGHumana_MatrizEPP_Agregar").on("submit", function(evento)
    {
    	evento.preventDefault();
    	$(this).generarDatosEnvio("txtGHumana_MatrizEPP_", function(datos)
    	{
    		$.post('../server/php/proyecto/gHumana_MatrizEPP_Crear.php', 
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
                        if ($("#txtGHumana_MatrizEPP_EPP").val() != "")
                        {
                            subirArchivo(data, 'imagen_EPP', $("#txtGHumana_MatrizEPP_EPP").val(), function(data)
                            {
            					Mensaje("Ok", "Los datos han sido ingresados", "success");
            					gHumana_MatrizEPP_Cargar();
                            });
                        } else
                        {
                            Mensaje("Ok", "Los datos han sido ingresados", "success");
                            gHumana_MatrizEPP_Cargar();
                        }
    				}
    			});
    	});
    });
}	

function gHumana_MatrizEPP_Cargar(Prefijo)
{
	if (Prefijo === undefined)
	{
		$("#frmGHumana_MatrizEPP_Agregar")[0].reset();
		$("#txtGHumana_MatrizEPP_Prefijo").val(obtenerPrefijo());
		$("#imggHumana_MatrizEPP_Imagen_Preview").attr("src", "");
	} else
	{
		$("#imggHumana_MatrizEPP_Imagen_Preview").attr("src", "");
		$.post('../server/php/proyecto/gHumana_MatrizEPP_CargarElemento.php', 
		{
			Usuario : Usuario.id,
			Prefijo : Prefijo
		}, function(data, textStatus, xhr) 
		{
			$.each(data, function(index, val) 
			{
				 if ($("#txtGHumana_MatrizEPP_" + index).length > 0)
                 {
                    $("#txtGHumana_MatrizEPP_" + index).val(val);
                 }
			});
		}, 'json');
	}


}
