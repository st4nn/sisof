$(document).ready(mRiesgos_rRiesgos);

function mRiesgos_rRiesgos()
{
    $("#btnMRiesgos_rRiesgos_Actualizar").on("click", function(evento)
    {   
        evento.preventDefault();
        mRiesgos_rRiesgos_RefescarTabla();        
    });
}

function mRiesgos_rRiesgos_RefescarTabla()
{
    $("#tblMRiesgos_rRiesgos tbody tr").remove();
    $.post('../server/php/proyecto/mRiesgos_CargarRRiesgo.php', 
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

                var mDatos = {
                    C1 : {cantidad : 0, Descripcion : '', Clasificacion : '', Texto : 'Mayor cantidad de actividades con riesgos Aceptable'},
                    C2 : {cantidad : 0, Descripcion : '', Clasificacion : '', Texto : 'Mayor cantidad de actividades con riesgos Mejorable'},
                    C3 : {cantidad : 0, Descripcion : '', Clasificacion : '', Texto : 'Mayor cantidad de actividades con riesgos No aceptable o Aceptable con control'},
                    C4 : {cantidad : 0, Descripcion : '', Clasificacion : '', Texto : 'Mayor cantidad de actividades con riesgos No aceptable'}
                };

                $.each(data, function(index, val) 
                {
                    tds += '<tr>';
                        tds += '<td>' + val.Descripcion + '</td>';
                        tds += '<td>' + val.Clasificacion + '</td>';
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

                    for (var i = 1; i <= 4; i++) 
                    {
                        if (val['C' + i] > mDatos['C' + i].cantidad)
                        {
                            mDatos['C' + i].cantidad = val['C' + i];
                            mDatos['C' + i].Descripcion = val.Descripcion;
                            mDatos['C' + i].Clasificacion = val.Clasificacion;
                        }
                    }

                });

                $("#tblMRiesgos_rRiesgos").crearDataTable(tds);

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

                $("#tblMRiesgos_rRiesgos_Total thead tr").remove();
                $("#tblMRiesgos_rRiesgos_Total thead").append(tds);

                

                tds = '';

                $.each(mDatos, function(index, val) 
                {
                    tds += '<tr>';
                        tds += '<td>' + val.Texto + '</td>';
                        tds += '<td class="text-center font-size-20 font-weight-200 text-middle">' + val.cantidad + '</td>';
                        tds += '<td>' + val.Descripcion + '</td>';
                        tds += '<td>' + val.Clasificacion + '</td>';
                    tds += '</tr>';                     
                });

                $("#tblMRiesgos_rRiesgos_Resumen").crearDataTable(tds);

            }
        }, 'json');
}