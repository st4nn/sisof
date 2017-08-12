$(document).ready(function()
{
	$("#cntGHumana_Procedimiento_Archivos").iniciarObjArchivos({objPrefijo : $("#txtGProcesos_Mapa_id"), Proceso: "Procedimientos de Gestión Humana", Usuario: Usuario.id});
});

function gHumana_Procedimiento_cargarArchivos()
{
	$("#cntGHumana_Procedimiento_Archivos").cargarArchivos({Prefijo : '0', Proceso : 'Procedimientos de Gestión Humana'});
}