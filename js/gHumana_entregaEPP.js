$(document).ready(gHumana_EntregaEPP);

function gHumana_EntregaEPP()
{
    var tFecha = obtenerFecha().substring(0, 10);
    $("#txtGHumana_EntregaEPP_Desde").val(tFecha.substring(0, 8) + "01");
    $("#txtGHumana_EntregaEPP_Hasta").val(tFecha);

    $("#frmGHumana_EntregaEPP_Buscar .datepicker").datepicker({
        clearBtn: true,
        language: "es",
        orientation: "top auto",
        daysOfWeekHighlighted: "0",
        autoclose: true,
        todayHighlight: true
    });

    $(document).delegate('.btnGHumana_VerEPPEntregados', 'click', function()
    {
    	cargarModulo('gHumana/entregaEPP.html', 'Entrega de EPP');
    });

    $("#cntGHumana_MatrizEPP_Imagen").iniciar_CargadorImagenes({idObj : 'gHumana_MatrizEPP_Imagen'});

    $("#frmGHumana_EntregaEPP_Buscar").on("submit", function(evento)
    {
        evento.preventDefault();

        $("#tblGHumana_EntregaEPP").limpiarDataTable();
        $(this).generarDatosEnvio('txtGHumana_EntregaEPP_', function(datos)
        {
            datos = JSON.parse(datos);
            datos.idEmpresa = $("#txtInicio_idEmpresa").val();

            $.post('../server/php/proyecto/gHumana_EPP_CargarPorEmpresa.php', datos, function(data, textStatus, xhr) 
            {
                if (data != 0)
                {
                    var tds = '';
                    $.each(data, function(index, val) 
                    {
                         tds += '<tr>';
                            tds += '<td></td>';
                            tds += '<td>' + val.fechaEntrega + '</td>';
                            tds += '<td>' + val.Nombres + ' ' + val.Apellidos + '</td>';
                            tds += '<td>' + val.Cargo + '</td>';
                            tds += '<td>' + val.Proyecto + '</td>';
                            tds += '<td>' + val.EPP + '</td>';
                            tds += '<td>' + val.Talla + '</td>';
                            tds += '<td>' + val.Cantidad + '</td>';
                        tds += '</tr>';
                    });
                    $("#tblGHumana_EntregaEPP").crearDataTable(tds);
                }
            }, 'json');
        });
    });

}

function gHumana_EntregaEPP_Datos()
{
	
}


function gHumana_EntregaEPP_cargarFicha()
{

}