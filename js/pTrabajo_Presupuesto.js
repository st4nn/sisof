pTrabajo_Presupuesto();

function pTrabajo_Presupuesto()
{
	$("#txtPTrabajo_Home_Anio").val(obtenerFecha().substring(0, 4));

	var tds = '';
	var idx = 1;
	for (var i = 0; i < 48; i++) 
	{
		if (idx > 4)
		{
			idx = 1;
		}
		tds += '<th class="text-center text-middle" colspan="2">' + idx + '</th>';
		idx++;
	}

	$("#tblPTrabajo_Presupuesto_Actividades_thead2").append(tds);

	tds = '';
	for (var i = 0; i < 48; i++) 
	{
		tds += '<th class="text-center text-middle">P</th>';
		tds += '<th class="text-center text-middle">E</th>';
	}

	$("#tblPTrabajo_Presupuesto_Actividades_thead3").append(tds);

	$(document).delegate('.objPTrabajo_Presupuesto_Actividad', 'click', function(event) 
	{
		pTrabajo_Presupuesto_lanzarPopUp(this);
	});
}

function pTrabajo_Presupuesto_cargarTabla()
{
	var Anio = $("#txtPTrabajo_Home_Anio").val();

	$("#tblPTrabajo_Presupuesto_Actividades tbody tr").remove();

	$.post('../server/php/proyecto/pTrabajo_CargarRiesgos.php', {Usuario : Usuario.id, idEmpresa : $("#txtInicio_idEmpresa").val(), Anio : Anio}, 
		function(data, textStatus, xhr) {
			if (data != 0)
			{
				var tds = '';
				var mes = 0;
				var semana = 0;
				var mod = 0;
				$.each(data, function(index, val) 
				{
					mes = 0;
					semana = 1;
					 tds += '<tr>';
					 	tds += '<td>' + val.Descripcion + '</td>';
					 	tds += '<td>' + val.Clasificacion + '</td>';
					 	tds += '<td>' + val.MedidasDeIntervencion + '</td>';

					 	for (var i = 0; i < 48; i++) 
						{
					 		mod = ((i+1)%4);
							if (mod == 1)
							{
								mes++;
								semana = 1;
							}


							tds += '<td idRiesgo="' + val.id + '" Tipo="P" Mes="' + mes + '" Semana="' + semana + '" class="text-center text-middle objPTrabajo_Presupuesto_Actividad"></td>';
							tds += '<td idRiesgo="' + val.id + '" Tipo="E" Mes="' + mes + '" Semana="' + semana + '" class="text-center text-middle objPTrabajo_Presupuesto_Actividad"></td>';
							semana++;
						}
					 tds += '</tr>';
				});

				$("#tblPTrabajo_Presupuesto_Actividades tbody").append(tds);

				$.post('../server/php/proyecto/pTrabajo_CargarPresupuesto.php', {Usuario : Usuario.id, idEmpresa : $("#txtInicio_idEmpresa").val(), Anio : Anio}, 
				function(data, textStatus, xhr) {
					if (data != 0)
					{
						$.each(data, function(index, val) 
						{
							 $('.objPTrabajo_Presupuesto_Actividad[idRiesgo=' + val.idRiesgo+ '][Tipo="' + val.Tipo + '"][Mes=' + val.Mes + '][Semana=' + val.Semana + ']').text(val.Valor);
						});
					}
				}, 'json');
			}
		}, 'json');
}

function pTrabajo_Presupuesto_lanzarPopUp(obj)
{
	var datos = {};

	datos.idRiesgo = $(obj).attr("idRiesgo");
	datos.Mes = $(obj).attr("Mes");
	datos.Semana = $(obj).attr("Semana");
	datos.Tipo = $(obj).attr("Tipo");
	datos.Anio = $("#txtPTrabajo_Home_Anio").val();


	var Meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	var Semanas = ["", "Primera", "Segunda", "Tercera", "Cuarta"];
	var Tipos = {"P" : "Presupuestado", "E" : "Ejecutado"};

	bootbox.prompt({
			title : 'Ingresa el valor ' + Tipos[datos.Tipo] + ' para la ' + Semanas[datos.Semana] + ' semana de ' + Meses[datos.Mes] + ' de ' + datos.Anio, 
			inputType: 'number',
			buttons: {
            confirm: {
                label: 'Ingresar,',
                className: 'btn-success'
            },
            cancel: {
                label: 'Cancelar',
                className: 'btn-default'
            }},
			callback : function(dato)
		{
			if (!isNaN(dato) && dato != '' && dato != null)
			{
				datos.idUsuario = Usuario.id;
				datos.idEmpresa = $("#txtInicio_idEmpresa").val();
				datos.Valor = dato;

				$.post('../server/php/proyecto/pTrabajo_Presupuesto_IngresarValor.php', datos, function(data, textStatus, xhr) 
				{
					if (!isNaN(data))
					{
						$(obj).text(dato);
						$(obj).fadeTo(500, .1).fadeTo(500, 1);
					} else
					{
						Mensaje("Error", data, 'danger');
					}
				});

			} else
			{
				if (dato != '' && dato != null)
				{
					bootbox.alert(datos + ' No es un valor válido, por favor ingresa unicamente números');
				}
			}
		}});

}