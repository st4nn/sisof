$(document).ready(function()
{
	$("#cntPObjetivos_Procedimiento_Archivos").iniciarObjArchivos({objPrefijo : $("#txtInicio_idEmpresa"), Proceso: "Procedimientos de Política Objetivos", Usuario: Usuario.id});
});

function PObjetivos_Procedimiento_cargarArchivos()
{
	$("#cntPObjetivos_Procedimiento_Archivos").cargarArchivos({Prefijo : $("#txtInicio_idEmpresa").val(), Proceso : 'Procedimientos de Política Objetivos'});
}