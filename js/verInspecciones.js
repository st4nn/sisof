function funVerInspecciones()
{
	verInspecciones_cargarInspecciones();
}

var verInspecciones_cargarInspecciones = function ()
{
	$.post('../server/php/proyecto/inspecciones_cargarInspecciones.php', 
	{
		Usuario : Usuario.id
	}, 
	function(data, textStatus, xhr) 
	{
		$("#tblVerInspecciones tbody tr").remove();
		if (data != 0)
		{
			var tds = '';
			$.each(data, function(index, val) 
			{
				tds += '<tr>';
					tds += '<td>' + val.id + '</td>';
					tds += '<td>' + val.Empresa + '</td>';
					tds += '<td>' + val.Bombero + '</td>';
					tds += '<td>' + val.Usuario + '</td>';
					tds += '<td>' + val.fechaCargue + '</td>';
					tds += '<td>' + val.Producto + '</td>';
					tds += '<td>' + val.Norma + '</td>';
					tds += '<td>' + val.Serie + '</td>';
					tds += '<td>' + val.TipoInspeccion + '</td>';
					tds += '<td>' + val.Descripcion + '</td>';
					tds += '<td>' + val.fechaBajoNorma + '</td>';
					tds += '<td>' + val.fechaFinalInspeccion + '</td>';
					tds += '<td>' + val.Detalles + '</td>';
				tds += '</tr>';
			});

			$("#tblVerInspecciones").crearDataTable(tds);

		} else
		{
			Mensaje("Hey", "Aún no hay trajes creados", 'danger');
		}
	}, 'json');
}