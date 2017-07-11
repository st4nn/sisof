$(document).ready(function()
{
	$("#lnkEmpresas_VolverABusqueda").on("click", function(evento)
	{
		evento.preventDefault();
		$("#cntEmpresas_Creacion").hide();
		$("#cntEmpresas_Listado").slideDown();
	});

	$("#btnEmpresas_CrearEmpresa").on("click", function(evento)
	{
		evento.preventDefault();
		$("#lblEmpresas_Creacion_Titulo").text('Crear Empresa');
		$("#cntEmpresas_Listado").hide();
		$("#cntEmpresas_Creacion").slideDown();	

		$("#btnEmpresas_Crear_Borrar").hide();
	});

	$("#cntEmpresas_Imagen").iniciar_CargadorImagenes({idObj : 'Empresas_Crear'});

	$("#btnEmpresas_Crear_Limpiar").on("click", function(evento)
	{
		evento.preventDefault();
		$("#frmEmpresas_Crear")[0].reset();
		$('#txtEmpresas_Crear_Etiqueta').val('');
        $('#txtEmpresas_Crear_Archivo').val('');
        $('#imgEmpresas_Crear_Preview').attr('src', '');  
	});
});
