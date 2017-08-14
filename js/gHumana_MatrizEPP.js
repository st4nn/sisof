$(document).ready(gHumana_MatrizEPP);

function gHumana_MatrizEPP()
{
	$("#tblGHumana_MatrizEPP").crearDataTable("");
	//gHumana_MatrizEPP_Cargar();

	$("#btnGHumana_MatrizEPP_Actualizar").on("click", function(evento)
	{
		evento.preventDefault();
		gHumana_MatrizEPP_Cargar();	
	});

	$(document).delegate('.btnGHumana_MatrizEPP_AbrirElemento', 'click', function(evento)
	{
		evento.preventDefault();
		var pPrefijo = $(this).attr("Prefijo");
		cargarModulo('gHumana/matrizEPP_Agregar.html', 'EPP', function()
		{
			$("#txtGHumana_MatrizEPP_Tipo_de_Proteccion option").remove();
			$("#txtGHumana_MatrizEPP_Tipo_de_Proteccion").append(tdsGHumana_MatrizEPP_TPOption);
			gHumana_MatrizEPP_Cargar(pPrefijo);
		});
	});
}

var tdsGHumana_MatrizEPP_TPOption = '';

function gHumana_MatrizEPP_Cargar()
{
	$.post('../server/php/proyecto/gHumana_MatrizEPP_Cargar.php', 
		{
			Usuario : Usuario.id,
			idEmpresa : $("#txtInicio_idEmpresa").val()
		}, function(data, textStatus, xhr) 
		{
			$("#tblGHumana_MatrizEPP").limpiarDataTable();
			var tds = "";
			var opcionesTipo_De_Proteccion = [];
			tdsGHumana_MatrizEPP_TPOption = '';

			if (data != 0)
			{
				$.each(data, function(index, val) 
				{
					if (opcionesTipo_De_Proteccion.indexOf(val.Tipo_de_Proteccion) < 0)
					{
						opcionesTipo_De_Proteccion.push(val.Tipo_de_Proteccion);
						tdsGHumana_MatrizEPP_TPOption += '<option value="' + val.Tipo_de_Proteccion + '">' + val.Tipo_de_Proteccion + '</option>';
					}

					tds += '<tr>';
						tds += '<td><button Prefijo="' + val.Prefijo + '" class="btn btn-info btnGHumana_MatrizEPP_AbrirElemento"><i class="icon wb-edit"></i></button></td>';
						tds += '<td>' + val.Tipo_de_Proteccion + '</td>';
						tds += '<td>' + val.EPP + '</td>';
						tds += '<td>';
							tds += '<div class="avatar avatar-online">';
	                          tds += '<img src="../server/php/' + val.Ruta + '/' + val.Archivo + '" alt="...">';
	                          tds += '<i class="avatar avatar-online"></i>';
	                        tds += '</div>';
						tds += '</td>';
						tds += '<td>' + val.Norma + '</td>';
						tds += '<td>' + val.Limitaciones + '</td>';
						tds += '<td>' + val.Mantenimiento + '</td>';
						tds += '<td>' + val.Tiempo_de_Reposicion + '</td>';
					tds += '</tr>';
				});

				$("#tblGHumana_MatrizEPP").crearDataTable(tds);
			}
			
		}, 'json');
}