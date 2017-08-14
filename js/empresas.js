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

	var vFrmEmpresas_Crear = false;

	$("#frmEmpresas_Crear").on("submit", function(evento)
	{
		evento.preventDefault();

		if (!vFrmEmpresas_Crear)
		{
			vFrmEmpresas_Crear = true;
			if ($("#txtEmpresas_Crear_Archivo").val() == '')
			{
				Mensaje("Error", 'Por favor seleccione una imagen que identifique a la Empresa', 'danger');
				vFrmEmpresas_Crear = false;
			} else
			{
				if ($("#txtEmpresas_Crear_Nombre").val() == '')
				{
					Mensaje("Error", 'No es posible crear una Empresa sin nombre', 'danger');
					$("#txtEmpresas_Crear_Nombre").focus();
					vFrmEmpresas_Crear = false;
				} else
				{
					if ($("#txtEmpresas_Crear_Correo").val() == '')
					{
						Mensaje("Error", 'Es importante poner un correo de Contacto', 'danger');
						$("#txtEmpresas_Crear_Correo").focus();
						vFrmEmpresas_Crear = false;
					} else
					{
						$("#frmEmpresas_Crear").generarDatosEnvio("txtEmpresas_Crear_", function(datos)
						{
							datos = JSON.parse(datos);
							vFrmEmpresas_Crear = false;
							$.post('../server/php/proyecto/Empresas_Crear.php', datos, function(data, textStatus, xhr) 
							{
								vFrmEmpresas_Crear = false;
								if (!isNaN(data))
								{
									subirArchivos(files, {
										Prefijo : data,
										Proceso : 'empresa_Logo',
										Observaciones : '',
										Usuario : Usuario.id
									}, function()
									{
										Mensaje("Hey", "Los datos han sido ingresados", "success");
										$("#txtEmpresas_Crear_id").val(data);
									});
								} else
								{
									Mensaje("Error", data, "danger");
									vFrmEmpresas_Crear = false;
								}
							});
						});
					}
				}
			}
		}

	});

	$("#btnEmpresas_Guardar").on("click", function()
	{
		$("#frmEmpresas_Crear").trigger("submit");
	});
});
