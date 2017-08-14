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

	$("#frmEmpresas_Buscar").on("submit", function(evento)
	{
		evento.preventDefault();

		$("#tblEmpresas_Listado").slideDown();

		var l = Ladda.create(this);
		l.start();

		$("#tblEmpresas_Listado li").remove();


		$.post('../server/php/proyecto/Empresas_Buscar.php', {Usuario : Usuario.id, Parametro : $("#txtReportes_OT_Buscar").val()}, function(data, textStatus, xhr) 
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
	                          tds += '<img src="../server/php/' + val.Ruta + '/' + val.Archivo + '" alt="...">';
	                          tds += '<i class="avatar avatar-online"></i>';
	                        tds += '</div>';
	                      tds += '</div>';
	                      tds += '<div class="media-body">';
	                        tds += '<h4 class="media-heading">';
	                          tds += '<span>' + val.Nombre + '</span>';
	                          tds += '<small> ' + val.fechaCargue + '</small>';
	                        tds += '</h4>';
	                        tds += '<p class="col-lg-3 col-md-4 col-sm-6">';
	                          tds += '<i class="icon icon-color wb-map" aria-hidden="true"></i>' + val.Direccion;
	                        tds += '</p>';
	                        tds += '<p class="col-lg-3 col-md-4 col-sm-6">';
	                          tds += '<i class="icon icon-color wb-envelope" aria-hidden="true"></i>' + val.Correo;
	                        tds += '</p>';
	                        tds += '<p class="col-lg-3 col-md-4 col-sm-6">';
	                          tds += '<i class="icon icon-color wb-mobile" aria-hidden="true"></i>' + val.Telefono;
	                        tds += '</p>';
	                        tds += '<p class="col-lg-3 col-md-4 col-sm-6">';
	                          tds += '<small><strong>Creado por:</strong> <a href="mailto:' + val.Correo + '">' + val.Usuario +'</a></small>';
	                        tds += '</p>';
	                      tds += '</div>';
	                      tds += '<div class="media-footer">';
	                        tds += '<button type="button" idEmpresa="' + val.id + '"class="btn btn-outline btn-success btn-sm btnEmpresas_Abrir"><i class="icon wb-play"></i>Abrir</button>';
	                        tds += '<button type="button" idEmpresa="' + val.id + '"class="btn btn-outline btn-info btn-sm"><i class="icon wb-edit"></i>Editar</button>';
	                        tds += '<button type="button" idEmpresa="' + val.id + '"class="btn btn-outline btn-warning btn-sm"><i class="icon wb-stop"></i>Desactivar</button>';
	                        tds += '<button type="button" idEmpresa="' + val.id + '"class="btn btn-outline btn-danger btn-sm"><i class="icon fa-trash-o"></i>Borrar</button>';
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

			$("#tblEmpresas_Listado").append(tds);

		}, 'json').always(function() { l.stop(); });
	});

	$(document).delegate('.btnEmpresas_Abrir', 'click', function(evento)
		{
			evento.preventDefault();
			var contenedor = $(this).parent("div").parent('div');
			var tmp = $(contenedor).find("img").attr("src");
			$(".imgLogoEmpresa").attr("src", tmp);
			
			tmp = $(contenedor).find(".media-heading").find("span");
			$(".lblEmpresa_Nombre").text($(tmp).text());
			
			tmp = $(contenedor).find(".media-body").find("p");

			$(".lblEmpresa_Direccion").text($(tmp[0]).text());
			$(".lblEmpresa_Telefono").text($(tmp[2]).text());
			$(".lblEmpresa_Responsable").text($(tmp[1]).text());

			tmp = $(this).attr("idEmpresa");

			$("#txtInicio_idEmpresa").val(tmp);

			cargarModulo("Inicio.html", 'Inicio');
		});
});
