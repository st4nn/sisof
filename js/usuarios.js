$(document).ready(function()
{

	$("#lnkUsuarios_VolverABusqueda").on("click", function(evento)
	{
		evento.preventDefault();
		$("#cntUsuarios_Creacion").hide();
		$("#cntUsuarios_Listado").slideDown();
	});

	$("#btnUsuarios_CrearUsuario").on("click", function(evento)
	{
		evento.preventDefault();
		$("#lblUsuarios_Creacion_Titulo").text('Crear Usuario');
		$("#cntUsuarios_Listado").hide();
		$("#cntUsuarios_Creacion").slideDown();	

		$("#btnUsuarios_Crear_Borrar").hide();
	});

	$("#cntUsuarios_Imagen").iniciar_CargadorImagenes({idObj : 'Usuarios_Crear'});

	$("#btnUsuarios_Crear_Limpiar").on("click", function(evento)
	{
		evento.preventDefault();
		$("#frmUsuarios_Crear")[0].reset();
		$('#txtUsuarios_Crear_Etiqueta').val('');
        $('#txtUsuarios_Crear_Archivo').val('');
        $('#imgUsuarios_Crear_Preview').attr('src', '');  
	});

	var vFrmUsuarios_Crear = false;

	$("#frmUsuarios_Crear").on("submit", function(evento)
	{
		evento.preventDefault();

		if (!vFrmUsuarios_Crear)
		{
			vFrmUsuarios_Crear = true;
			if ($("#txtUsuarios_Crear_Archivo").val() == '')
			{
				Mensaje("Error", 'Por favor seleccione una imagen que identifique a la Usuario', 'danger');
				vFrmUsuarios_Crear = false;
			} else
			{
				if ($("#txtUsuarios_Crear_Nombre").val() == '')
				{
					Mensaje("Error", 'No es posible crear una Usuario sin nombre', 'danger');
					$("#txtUsuarios_Crear_Nombre").focus();
					vFrmUsuarios_Crear = false;
				} else
				{
					if ($("#txtUsuarios_Crear_Correo").val() == '')
					{
						Mensaje("Error", 'Es importante poner un correo de Contacto', 'danger');
						$("#txtUsuarios_Crear_Correo").focus();
						vFrmUsuarios_Crear = false;
					} else
					{
						$("#frmUsuarios_Crear").generarDatosEnvio("txtUsuarios_Crear_", function(datos)
						{
							datos = JSON.parse(datos);
							vFrmUsuarios_Crear = false;
							$.post('../server/php/proyecto/Usuarios_Crear.php', datos, function(data, textStatus, xhr) 
							{
								vFrmUsuarios_Crear = false;
								if (!isNaN(data))
								{
									subirArchivos(files, {
										Prefijo : data,
										Proceso : 'Usuario_Logo',
										Observaciones : '',
										Usuario : Usuario.id
									}, function()
									{
										Mensaje("Hey", "Los datos han sido ingresados", "success");
										$("#txtUsuarios_Crear_id").val(data);
									});
								} else
								{
									Mensaje("Error", data, "danger");
									vFrmUsuarios_Crear = false;
								}
							});
						});
					}
				}
			}
		}

	});

	$("#btnUsuarios_Guardar").on("click", function()
	{
		$("#frmUsuarios_Crear").trigger("submit");
	});

	$("#frmUsuarios_Buscar").on("submit", function(evento)
	{
		evento.preventDefault();

		$("#tblUsuarios_Listado").slideDown();

		var l = Ladda.create(this);
		l.start();

		$("#tblUsuarios_Listado li").remove();


		$.post('../server/php/proyecto/Usuarios_Buscar.php', {Usuario : Usuario.id, Parametro : $("#txtReportes_OT_Buscar").val()}, function(data, textStatus, xhr) 
		{
			var tds = '';
			if (data != 0)
			{
				$.each(data, function(index, val) 
				{
					tds += '<li class="list-group-item">';
	                    tds += '<div class="media">';
	                      tds += '<div class="media-left">';
	                        tds += '<div class="avatar avatar-online">';
	                          tds += '<img src="../assets/portraits/5.png" alt="...">';
	                          tds += '<i class="avatar avatar-online"></i>';
	                        tds += '</div>';
	                      tds += '</div>';
	                      tds += '<div class="media-body">';
	                        tds += '<h4 class="media-heading">';
	                          tds += '<span>' + val.Nombre + '</span>';
	                          tds += '<small> ' + val.fechaCargue + '</small>';
	                        tds += '</h4>';
	                        tds += '<p class="col-lg-3 col-md-4 col-sm-6">';
	                          tds += '<i class="icon icon-color fa-credit-card" aria-hidden="true"></i>' + val.Cargo;
	                        tds += '</p>';
	                        tds += '<p class="col-lg-3 col-md-4 col-sm-6">';
	                          tds += '<i class="icon icon-color wb-envelope" aria-hidden="true"></i>' + val.Correo;
	                        tds += '</p>';
	                        tds += '<p class="col-lg-3 col-md-4 col-sm-6">';
	                          tds += '<i class="icon icon-color fa-user" aria-hidden="true"></i>' + val.Usuario;
	                        tds += '</p>';
	                        tds += '<p class="col-lg-3 col-md-4 col-sm-6">';
	                          tds += '<small>' + val.Perfil +'</small> ' + val.Empresa;
	                        tds += '</p>';
	                      tds += '</div>';
	                      tds += '<div class="media-footer">';
	                        tds += '<button type="button" idUsuario="' + val.id + '"class="btn btn-outline btn-success btn-sm btnUsuarios_Abrir"><i class="icon wb-play"></i>Abrir</button>';
	                        tds += '<button type="button" idUsuario="' + val.id + '"class="btn btn-outline btn-info btn-sm"><i class="icon wb-edit"></i>Editar</button>';
	                        tds += '<button type="button" idUsuario="' + val.id + '"class="btn btn-outline btn-warning btn-sm"><i class="icon wb-stop"></i>Desactivar</button>';
	                      tds += '</div>';
	                    tds += '</div>';
	                tds += '</li>';
				});
			} else
			{
				tds += '<li class="list-group-item">';
                    tds += '<h1>No hay datos para mostras</h1>';
                tds += '</li>';
			}

			$("#tblUsuarios_Listado").append(tds);

		}, 'json').always(function() { l.stop(); });
	});

	$(document).delegate('.btnUsuarios_Abrir', 'click', function(evento)
		{
			evento.preventDefault();
			var contenedor = $(this).parent("div").parent('div');
			var tmp = $(contenedor).find("img").attr("src");
			$(".imgLogoUsuario").attr("src", tmp);
			
			tmp = $(contenedor).find(".media-heading").find("span");
			$(".lblUsuario_Nombre").text($(tmp).text());
			
			tmp = $(contenedor).find(".media-body").find("p");

			$(".lblUsuario_Direccion").text($(tmp[0]).text());
			$(".lblUsuario_Telefono").text($(tmp[2]).text());
			$(".lblUsuario_Responsable").text($(tmp[1]).text());

			tmp = $(this).attr("idUsuario");

			$("#txtInicio_idUsuario").val(tmp);

			cargarModulo("Inicio.html", 'Inicio');
		});
});
