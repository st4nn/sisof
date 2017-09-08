$(document).ready(function()
{
	$("#cntGHumana_Procedimiento_Archivos").iniciarObjArchivos({objPrefijo : $("#txtInicio_idEmpresa"), Proceso: "Procedimientos de Gestión Humana", Usuario: Usuario.id});
});

function gHumana_Procedimiento_cargarArchivos()
{
	$("#cntGHumana_Procedimiento_Archivos").cargarArchivos({Prefijo : $("#txtInicio_idEmpresa").val(), Proceso : 'Procedimientos de Gestión Humana'});
}