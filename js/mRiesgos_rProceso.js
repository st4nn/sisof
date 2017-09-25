$(document).ready(mRiesgos_rProceso);

function mRiesgos_rProceso()
{
    $("#btnMRiesgos_rProceso_Actualizar").on("click", function(evento)
    {   
        evento.preventDefault();
        mRiesgos_rProceso_RefescarTabla();        
    });
}

function mRiesgos_rProceso_RefescarTabla()
{
    $("#tblMRiesgos_rProceso tbody tr").remove();
    $.post('../server/php/proyecto/mRiesgos_CargarRProceso.php', 
        {
            Usuario : Usuario.id,
            idEmpresa : $("#txtInicio_idEmpresa").val()
        }, function(data, textStatus, xhr) 
        {
            if (data != 0)
            {
                var tds = '';

                var datos = {
                    C0 : 0,
                    C1 : 0,
                    C2 : 0,
                    C3 : 0,
                    C4 : 0,
                    Total : 0
                };

                $.each(data, function(index, val) 
                {
                    tds += '<tr>';
                        tds += '<td>' + val.Proceso + '</td>';
                        tds += '<td class="text-center font-size-20 font-weight-200 text-middle">' + val.C0 + '</td>';
                        tds += '<td class="text-center font-size-20 font-weight-200 text-middle bg-light-green-600 white">' + val.C1 + '</td>';
                        tds += '<td class="text-center font-size-20 font-weight-200 text-middle bg-yellow-600 white">' + val.C2 + '</td>';
                        tds += '<td class="text-center font-size-20 font-weight-200 text-middle bg-brown-600 white">' + val.C3 + '</td>';
                        tds += '<td class="text-center font-size-20 font-weight-200 text-middle bg-red-600 white">' + val.C4 + '</td>';
                        tds += '<td class="text-center font-size-20 font-weight-200 text-middle">' + parseInt(val.Total) + '</td>';
                    tds += '</tr>';

                    datos.C0 += parseInt(val.C0);
                    datos.C1 += parseInt(val.C1);
                    datos.C2 += parseInt(val.C2);
                    datos.C3 += parseInt(val.C3);
                    datos.C4 += parseInt(val.C4);
                    datos.Total += parseInt(val.Total);
                });

                $("#tblMRiesgos_rProceso").crearDataTable(tds);

                tds = '';
                tds += '<tr>';
                    tds += '<th>TOTAL</th>';
                    tds += '<th class="text-center font-size-20 font-weight-200 text-middle">' + datos.C0 + '</th>';
                    tds += '<th class="text-center font-size-20 font-weight-200 text-middle bg-light-green-600 white">' + datos.C1 + '</th>';
                    tds += '<th class="text-center font-size-20 font-weight-200 text-middle bg-yellow-600 white">' + datos.C2 + '</th>';
                    tds += '<th class="text-center font-size-20 font-weight-200 text-middle bg-brown-600 white">' + datos.C3 + '</th>';
                    tds += '<th class="text-center font-size-20 font-weight-200 text-middle bg-red-600 white">' + datos.C4 + '</th>';
                    tds += '<th class="text-center font-size-20 font-weight-200 text-middle">' + parseInt(datos.Total) + '</th>';
                tds += '</tr>';

                $("#tblMRiesgos_rProceso_Total thead tr").remove();
                $("#tblMRiesgos_rProceso_Total thead").append(tds);

            }
        }, 'json');
}