$(document).ready(gHumana_Personal);

function gHumana_Personal()
{
	$("#tblGHumana_Personal").crearDataTable("", undefined, false);

	$("#btnGHumana_Personal_Actualizar").on("click", function(evento)
	{
		evento.preventDefault();
		gHumana_Personal_Cargar();	
	});

	$(document).delegate('.btnGHumana_Personal_AbrirElemento', 'click', function(evento)
	{
		evento.preventDefault();
		var pPrefijo = $(this).attr("Prefijo");
		cargarModulo('gHumana/Personal_Agregar.html', 'Personal', function()
		{
			gHumana_Personal_LlenarCargos();
			gHumana_Personal_CargarPersona(pPrefijo);
		});
	});
}

function gHumana_Personal_Cargar()
{
	gHumana_Personal_CargarCargos();
	$.post('../server/php/proyecto/gHumana_Personal_Cargar.php', 
		{
			Usuario : Usuario.id,
			idEmpresa : $("#txtInicio_idEmpresa").val()
		}, function(data, textStatus, xhr) 
		{
			$("#tblGHumana_Personal").limpiarDataTable();
			var tds = "";
			
			if (data != 0)
			{
				$.each(data, function(index, val) 
				{
					tds += '<tr>';
						tds += '<td><button Prefijo="' + val.id + '" class="btn btn-info btnGHumana_Personal_AbrirElemento"><i class="icon wb-edit"></i></button></td>';
						tds += '<td>' + val.Numero_id + '</td>';
						tds += '<td>' + val.Apellidos + '</td>';
						tds += '<td>' + val.Nombres + '</td>';
						tds += '<td>' + val.talla_Camisa + '</td>';
						tds += '<td>' + val.talla_Pantalon + '</td>';
						tds += '<td>' + val.talla_Zapatos + '</td>';
						tds += '<td>' + val.fecha_de_Ingreso + '</td>';
						tds += '<td>' + val.idCargo + '</td>';
						tds += '<td>' + val.RH + '</td>';
						tds += '<td>' + val.Telefono + '</td>';
						tds += '<td>' + val.email + '</td>';
						tds += '<td>' + val.Direccion + '</td>';
						tds += '<td>' + val.estado_Civil + '</td>';
					tds += '</tr>';
				});

				$("#tblGHumana_Personal").crearDataTable(tds, undefined, false);
			}
		}, 'json');
}

var tdsOpersonal_Option = '';

function gHumana_Personal_CargarCargos()
{
	cargarCargos(function(data)
	{
		tdsOpersonal_Option = '';
        if (data != 0)
        {
            $.each(data, function(index, val) 
            {
                tdsOpersonal_Option += '<option value="' + val.idInterno + '">'  + val.Texto + '</option>';
            });
        }
	});
}