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

	$("#frmEmpresas_Crear").on("submit", function(evento)
	{
		evento.preventDefault();

		if ($("#txtEmpresas_Crear_Archivo").val() == '')
		{
			Mensaje("Error", 'Por favor seleccione una imagen que identifique a la Empresa', 'Error');
		} else
		{
			if ($("#txtEmpresas_Crear_Nombre").val() == '')
			{
				Mensaje("Error", 'No es posible crear una Empresa sin nombre', 'Error');
				$("#txtEmpresas_Crear_Nombre").focus();
			} else
			{
				if ($("#txtEmpresas_Crear_Correo").val() == '')
				{
					Mensaje("Error", 'Es importante poner un correo de Contacto', 'Error');
					$("#txtEmpresas_Crear_Correo").focus();
				} else
				{

				}
			}
		}
	});

	$("#btnEmpresas_Guardar").on("click", function()
	{
		$("#frmEmpresas_Crear").trigger("submit");
	});
});
