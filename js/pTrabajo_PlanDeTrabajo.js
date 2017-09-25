pTrabajo_PlanDeTrabajo();

function pTrabajo_PlanDeTrabajo()
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

	$("#tblPTrabajo_PlanDeTrabajo_Actividades_thead2").append(tds);

	tds = '';
	for (var i = 0; i < 48; i++) 
	{
		tds += '<th class="text-center text-middle">P</th>';
		tds += '<th class="text-center text-middle">E</th>';
	}

	$("#tblPTrabajo_PlanDeTrabajo_Actividades_thead3").append(tds);

	$(document).delegate('.objPTrabajo_PlanDeTrabajo_Actividad', 'click', function(event) 
	{
		pTrabajo_PlanDeTrabajo_lanzarPopUp(this);
	});
}

function pTrabajo_PlanDeTrabajo_cargarTabla()
{
	var Anio = $("#txtPTrabajo_Home_Anio").val();

	$("#tblPTrabajo_PlanDeTrabajo_Actividades tbody tr").remove();

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


							tds += '<td idRiesgo="' + val.id + '" Tipo="P" Mes="' + mes + '" Semana="' + semana + '" class="text-center text-middle objPTrabajo_PlanDeTrabajo_Actividad"></td>';
							tds += '<td idRiesgo="' + val.id + '" Tipo="E" Mes="' + mes + '" Semana="' + semana + '" class="text-center text-middle objPTrabajo_PlanDeTrabajo_Actividad"></td>';
							semana++;
						}
					 tds += '</tr>';
				});

				$("#tblPTrabajo_PlanDeTrabajo_Actividades tbody").append(tds);

				$.post('../server/php/proyecto/pTrabajo_CargarPTrabajo.php', {Usuario : Usuario.id, idEmpresa : $("#txtInicio_idEmpresa").val(), Anio : Anio}, 
				function(data, textStatus, xhr) {
					if (data != 0)
					{
						data = [{id : 1, idEmpresa : 48, idRiesgo : 1, idUsuario : 1, fechaCargue : '', Anio : 2017, Mes : 2, Semana : 2, Tipo : 'P', Valor : 90}];
						$.each(data, function(index, val) 
						{
							 $('.objPTrabajo_PlanDeTrabajo_Actividad[idRiesgo=' + val.idRiesgo+ '][Tipo="' + val.Tipo + '"][Mes=' + val.Mes + '][Semana=' + val.Semana + ']').text(val.Valor);
						});
					}
				}, 'json');
			}
		}, 'json');
}

function pTrabajo_PlanDeTrabajo_lanzarPopUp(obj)
{
	var datos = {};

	datos.idRiesgo = $(obj).attr("idRiesgo");
	datos.Mes = $(obj).attr("Mes");
	datos.Semana = $(obj).attr("Semana");
	datos.Tipo = $(obj).attr("Tipo");


	var Meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	var Semanas = ["", "Primera", "Segunda", "Tercera", "Cuarta"];
	var Tipos = {"P" : "Presupuestado", "E" : "Ejecutado"};

	bootbox.prompt({
			title : 'Ingresa el valor ' + Tipos[datos.Tipo] + ' para la ' + Semanas[datos.Semana] + ' semana de ' + Meses[datos.Mes], 
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
				$(obj).text(dato);
				$(obj).fadeTo(500, .1).fadeTo(500, 1);
			} else
			{
				bootbox.alert(datos + ' No es un valor válido, por favor ingresa unicamente números');
			}
		}});

}