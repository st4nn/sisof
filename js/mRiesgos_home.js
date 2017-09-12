$(document).ready(mRiesgos_Home);

function mRiesgos_Home()
{
    $("#btnMRiesgos_Home_Actualizar").on("click", function(evento)
    {   
        evento.preventDefault();
        mRiesgos_Home_RefescarTabla();        
    });
    

    $(document).delegate('.txtMRiesgos_Matriz_Descripcion', 'change', function(event) 
    {
       var obj = fun_MRiesgos_Home_Peligo_Clasificaciones($(this).val());

       var contenedor = $(this).parent('td').parent('tr');
       var idActividad = $(contenedor).attr('idActividad');

       var tds = '';
       tds += '<option value=""></option>';
       $.each(obj, function(index, val) 
       {
            tds += '<option value="' + val +'">' + val + '</option>';
       });

       var combo = $(contenedor).find(".txtMRiesgos_Matriz_Clasificacion");

       $(combo).find("option").remove();
       $(combo).append(tds);
    });

    $(document).delegate('.txtMRiesgos_Matriz_NivelDeDeficiencia, .txtMRiesgos_Matriz_NivelDeExposicion, .txtMRiesgos_Matriz_NivelDeConsecuencia', 'change', function(event) {
        txtMRiesgos_Matriz_NDxNE_Change(this);
    });

    $(document).delegate('.txtMRiesgos_Matriz_EfectosPosibles', 'change', function(event) {
        var contenedor = $(this).parent('td').parent('tr');
        var objPC = $(contenedor).find('.txtMRiesgos_Matriz_PeorConsecuecia');
        $(objPC).text($(this).val());
    });

    $(document).delegate('.btnMRiesgos_Matriz_Copiar', 'click', function(event) 
    {
        var contenedor = $(this).parent('td').parent('tr');
        var vHtml = $(contenedor).clone(true, true); 

        $(vHtml).find(".txtMRiesgos_Matriz_Rutinario").val($(contenedor).find(".txtMRiesgos_Matriz_Rutinario").val());
        $(vHtml).find(".txtMRiesgos_Matriz_Descripcion").val($(contenedor).find(".txtMRiesgos_Matriz_Descripcion").val());
        $(vHtml).find(".txtMRiesgos_Matriz_Tipo").val($(contenedor).find(".txtMRiesgos_Matriz_Tipo").val());
        $(vHtml).find(".txtMRiesgos_Matriz_NivelDeDeficiencia").val($(contenedor).find(".txtMRiesgos_Matriz_NivelDeDeficiencia").val());
        $(vHtml).find(".txtMRiesgos_Matriz_NivelDeExposicion").val($(contenedor).find(".txtMRiesgos_Matriz_NivelDeExposicion").val());
        $(vHtml).find(".txtMRiesgos_Matriz_NivelDeConsecuencia").val($(contenedor).find(".txtMRiesgos_Matriz_NivelDeConsecuencia").val());
        $(vHtml).find(".txtMRiesgos_Matriz_RequisitoLegal").val($(contenedor).find(".txtMRiesgos_Matriz_RequisitoLegal").val());
        $(vHtml).find(".txtMRiesgos_Matriz_TipoMedida").val($(contenedor).find(".txtMRiesgos_Matriz_TipoMedida").val());
        $(vHtml).find(".txtMRiesgos_Matriz_Programa").val($(contenedor).find(".txtMRiesgos_Matriz_Programa").val());

        $(vHtml).find(".txtMRiesgos_Matriz_Clasificacion").val($(contenedor).find(".txtMRiesgos_Matriz_Clasificacion").val());

        $(vHtml).attr("idObj", 0);
        
        $(contenedor).after(vHtml);
    });

    $(document).delegate('.btnMRiesgos_Matriz_Quitar', 'click', function(event) 
    {
        var contenedor = $(this).parent('td').parent('tr');
        var idRiesgo = $(contenedor).attr("idActividad");
        var btnObj = this;

        
        bootbox.confirm({
        message: "Estas seguro de quitar este Elemento?",
        buttons: {
            confirm: {
                label: 'Si, quitarlo',
                className: 'btn-danger'
            },
            cancel: {
                label: 'No',
                className: 'btn-default'
            }
        },
        callback: function (result) {
          if (result)
          {
            $.post('../server/php/proyecto/mRiesgos_QuitarFila.php', {Usuario : Usuario.id, idRiesgo: idRiesgo}, function(data, textStatus, xhr) 
            {
                if (isNaN(data))
                {
                    Mensaje("Error", data, 'danger');
                } else
                {
                    $(btnObj).parent('td').parent('tr').remove();
                }
            });
          }
        }
      });
    });

    

    $(document).delegate('#tblMRiesgos_Home tbody tr input, #tblMRiesgos_Home tbody tr select, #tblMRiesgos_Home tbody tr textarea', 'change', function(event) 
    {
        var contenedor = $(this).parent('td').parent('tr');
        $(contenedor).find('.btnMRiesgos_Matriz_Guardar').slideDown();
        $("#cntMRiesgos_ActionButtons").slideDown();
    });

    $(document).delegate('.btnMRiesgos_Matriz_Guardar', 'click', function(event) 
    {
        var contenedor = $(this).parent('td').parent('tr');
        var btnObj = this;

        var obj = $(contenedor).find(".guardar");
        var datos = {};
        datos['id'] = $(contenedor).attr("idObj");
        datos['Usuario'] = Usuario.id;
        datos['idEmpresa'] = $("#txtInicio_idEmpresa").val();
        datos['idActividad'] = $(contenedor).attr("idActividad");
        

        $.each(obj, function(index, val) 
        {
            if ($(val).attr("data-indice") != undefined)
            {
              if ($(val).prop("tagName") == "SPAN" || $(val).prop("tagName") == "TD")
              {
                datos[$(val).attr("data-indice")] = $(val).text();
              } else
              {
                datos[$(val).attr("data-indice")] = $(val).val();
              }
            }
        });

        datos = JSON.stringify(datos);  
        datos = JSON.parse(datos);

        $.post('../server/php/proyecto/mRiesgos_CrearFila.php', datos, function(data, textStatus, xhr) 
        {
            if (isNaN(data))
            {
                Mensaje("Error", data, 'danger');
            } else
            {
                $(btnObj).hide();

                if($(".showSweetAlert:visible").length == 0)
                {
                    Mensaje("Hey", "Los datos han sido guardados", 'success');
                }

                $(contenedor).attr("idObj", parseInt(data));

                if ($(".btnMRiesgos_Matriz_Guardar:visible").length == 0)
                {
                    $("#cntMRiesgos_ActionButtons").hide();
                }
            }
        });


    });

    $("#btnMRiesgos_Matriz_Guardar").on("click", function(evento)
        {
            evento.preventDefault();
            $(".btnMRiesgos_Matriz_Guardar:visible").trigger('click');
        });

    //mRiesgos_Home_RefescarTabla();
}

function txtMRiesgos_Matriz_NDxNE_Change(obj)
{
    var contenedor = $(obj).parent('td').parent('tr');

    var objND = $(contenedor).find('.txtMRiesgos_Matriz_NivelDeDeficiencia');
    var objNE = $(contenedor).find('.txtMRiesgos_Matriz_NivelDeExposicion');
    var objNP = $(contenedor).find('.txtMRiesgos_Matriz_NivelDeProbabilidad');
    var objIP = $(contenedor).find('.txtMRiesgos_Matriz_InterpretacionDeProbabilidad');
    var objNC = $(contenedor).find('.txtMRiesgos_Matriz_NivelDeConsecuencia');    
    var objNR = $(contenedor).find('.txtMRiesgos_Matriz_NivelDeRiesgo');
    var objINR = $(contenedor).find('.txtMRiesgos_Matriz_iNivelDeRiesgo');
    var objANR = $(contenedor).find('.txtMRiesgos_Matriz_aNivelDeRiesgo');
    
    
    var tmp = parseInt($(objND).val()) * parseInt($(objNE).val());

    $(objNP).text(tmp);

    if (isNaN(tmp))
    {
        tmp = 0;
    }

    if (tmp > 23)
    {
        $(objIP).text('Muy Alto');
    } else
    {
        if (tmp > 9)   
        {
            $(objIP).text('Alto');
        } else
        {
            if (tmp > 5)   
            {
                $(objIP).text('Medio');
            } else
            {
                $(objIP).text('Bajo');
            }
        }
    }

    tmp = tmp * parseInt($(objNC).val());

    $(objNR).text(tmp);

    if (tmp > 501)
    {
        $(objINR).text('I');
    } else
    {
        if (tmp > 149)   
        {
            $(objINR).text('II');
        } else
        {
            if (tmp > 39)   
            {
                $(objINR).text('III');
            } else
            {
                $(objINR).text('IV');
            }
        }
    }

    $(objANR).removeClass('success');
    $(objANR).removeClass('info');
    $(objANR).removeClass('warning');
    $(objANR).removeClass('danger');

    if (tmp < 40)
    {
        $(objANR).text('Aceptable');
        $(objANR).addClass('success');
    } else
    {
        if (tmp < 121)   
        {
            $(objANR).text('Mejorable');
            $(objANR).addClass('info');
        } else
        {
            if (tmp < 501)   
            {
                $(objANR).text('No Aceptable o Aceptable con Control Específico');
                $(objANR).addClass('warning');
            } else
            {
                $(objANR).text('No Aceptable');
                $(objANR).addClass('danger');
            }
        }
    }

}

function mRiesgos_Home_RefescarTabla()
{
    if ($(window).width() < 767)
    {
        $.site.menubar.hide();
    } else
    {
        $.site.menubar.fold();
    }

    $("#tblMRiesgos_Home tbody tr").remove();
    $.post('../server/php/proyecto/mRiesgos_CargarActividades.php', 
        {
            Usuario : Usuario.id,
            idEmpresa : $("#txtInicio_idEmpresa").val()
        }, function(data, textStatus, xhr) 
        {
            if (data != 0)
            {
                var tds = '';
                var ids = [];
                var arrValores = [];
                $.each(data, function(index, val) 
                {
                    ids.push(val.id);
                    if (!isNaN(val.id))
                    {
                        arrValores[val.id] = val;
                    }

                    tds += '<tr idObj="' + val.id + '" idActividad="' + val.RidActividad + '">';
                        tds += '<td class="text-nowrap text-middle">';
                            tds += '<button class="btn btn-icon btn-flat text-primary btnMRiesgos_Matriz_Copiar"><i class="icon wb-copy"></i></button>';
                            tds += '<button class="btn btn-icon btn-flat text-danger btnMRiesgos_Matriz_Quitar"><i class="icon wb-close"></i></button>';
                            tds += '<button class="btn btn-icon btn-flat text-success btnMRiesgos_Matriz_Guardar hide"><i class="icon fa-floppy-o"></i></button>';
                        tds += '</td>';
                        tds += '<td class="text-nowrap text-middle">' + val.Proceso + '</td>';
                        tds += '<td class="text-nowrap text-middle">' + val.Actividad + '</td>';
                        tds += '<td class="text-middle">';
                            tds += '<select class="form-control width-100 guardar txtMRiesgos_Matriz_Rutinario" data-indice="Rutinario">';
                                tds += '<option value=""></option>';
                                tds += '<option value="Si">Si</option>';
                                tds += '<option value="No">No</option>';
                            tds += '</select>';
                        tds += '</td>';
                        tds += '<td class="text-middle">';
                            tds += '<select class="form-control width-150 guardar txtMRiesgos_Matriz_Descripcion" data-indice="Descripcion">';
                                tds += '<option value=""></option>';
                                tds += '<option value="Biológico">Biológico</option>';
                                tds += '<option value="Físico">Físico</option>';
                                tds += '<option value="Químico">Químico</option>';
                                tds += '<option value="Clasificación Psicosocial">Clasificación Psicosocial</option>';
                                tds += '<option value="Biomecánicos">Biomecánicos</option>';
                                tds += '<option value="Condiciones de Seguridad">Condiciones de Seguridad</option>';
                                tds += '<option value="Fenómenos Naturales">Fenómenos Naturales</option>';
                            tds += '</select>';
                        tds += '</td>';
                        tds += '<td class="text-middle">';
                            tds += '<select class="form-control width-200 guardar txtMRiesgos_Matriz_Clasificacion" data-indice="Clasificacion">';
                                tds += '<option value=""></option>';
                            tds += '</select>';
                        tds += '</td>';
                        tds += '<td><textarea class="form-control width-200 guardar txtMRiesgos_Matriz_EfectosPosibles" data-indice="EfectosPosibles" rows="2"></textarea></td>';
                        tds += '<td class="text-middle">';
                            tds += '<select class="form-control width-150 guardar txtMRiesgos_Matriz_Tipo" data-indice="Tipo">';
                                tds += '<option value=""></option>';
                                tds += '<option value="Fuente">Fuente</option>';
                                tds += '<option value="Medio">Medio</option>';
                                tds += '<option value="Individuo">Individuo</option>';
                            tds += '</select>';
                        tds += '</td>';
                        tds += '<td><textarea class="form-control width-200 guardar txtMRiesgos_Matriz_Control" data-indice="Control" rows="2"></textarea></td>';
                        tds += '<td class="text-middle">';
                            tds += '<select class="form-control width-200 guardar txtMRiesgos_Matriz_NivelDeDeficiencia" data-indice="NivelDeDeficiencia">';
                                tds += '<option value=""></option>';
                                tds += '<option value="10">Se ha(n) detectado peligro(s) que determina(n) como posible la generación de incidentes o consecuencias muy significativas, o la eficacia del conjunto de medidas preventivas existentes respecto al riesgo es nula o no existe, o ambos.</option>';
                                tds += '<option value="6">Se ha(n) detectado algún(os) peligro(s) que pueden dar lugar a consecuencias significativa(s), o la eficacia del conjunto de medidas preventivas existentes es baja, o ambos.</option>';
                                tds += '<option value="2">Se han detectado peligros que pueden dar lugar a consecuencias poco significativa(s) o de menor importancia, o la eficacia del conjunto de medidas preventivas existentes es moderada, o ambos.</option>';
                                tds += '<option value="1">No se ha detectado consecuencia alguna, o la eficacia del conjunto de medidas preventivas existentes es alta, o ambos. El riesgo está controlado.</option>';
                            tds += '</select>';
                        tds += '</td>';
                        tds += '<td class="text-middle">';
                            tds += '<select class="form-control width-200 guardar txtMRiesgos_Matriz_NivelDeExposicion" data-indice="NivelDeExposicion">';
                                tds += '<option value=""></option>';
                                tds += '<option value="4">La situación de exposición se presenta sin interrupción o varias veces con tiempo prolongado durante la jornada laboral.</option>';
                                tds += '<option value="3">La situación de exposición se presenta varias veces durante la jornada laboral por tiempos cortos.</option>';
                                tds += '<option value="2">La situación de exposición se presenta alguna vez durante la jornada laboral y por un periodo de tiempo corto.</option>';
                                tds += '<option value="1">La situación de exposición se presenta de manera eventual.</option>';
                            tds += '</select>';
                        tds += '</td>';
                        tds += '<td class="text-middle text-center"><span class="guardar txtMRiesgos_Matriz_NivelDeProbabilidad" data-indice="NivelDeProbabilidad"></span></td>';
                        tds += '<td class="text-middle text-center"><span class="guardar txtMRiesgos_Matriz_InterpretacionDeProbabilidad" data-indice="InterpretacionDeProbabilidad"></span></td>';
                        tds += '<td class="text-middle">';
                            tds += '<select class="form-control width-200 guardar txtMRiesgos_Matriz_NivelDeConsecuencia" data-indice="NivelDeConsecuencia">';
                                tds += '<option value="100">Muerte (s)</option>';
                                tds += '<option value="60">Lesiones o enfermedades graves irreparables (Incapacidad permanente parcial o invalidez)</option>';
                                tds += '<option value="25">Lesiones o enfermedades con incapacidad laboral temporal (ILT)</option>';
                                tds += '<option value="10">Lesiones o enfermedades que no requieren incapacida</option>';
                            tds += '</select>';
                        tds += '</td>';
                        tds += '<td class="text-middle text-center"><span class="guardar txtMRiesgos_Matriz_NivelDeRiesgo" data-indice="NivelDeRiesgo"></span></td>';
                        tds += '<td class="text-middle text-center"><span class="guardar txtMRiesgos_Matriz_iNivelDeRiesgo" data-indice="iNivelDeRiesgo"></span></td>';
                        tds += '<td class="success guardar txtMRiesgos_Matriz_aNivelDeRiesgo text-center text-middle" data-indice="aNivelDeRiesgo">Aceptable</td>';
                        tds += '<td class="text-middle"><input class="form-control width-100 guardar txtMRiesgos_Matriz_NroExpuestos" data-indice="NroExpuestos" type="number"></td>';
                        tds += '<td class="text-middle text-center"><span class="guardar txtMRiesgos_Matriz_PeorConsecuecia" data-indice="PeorConsecuecia"></span></td>';
                        tds += '<td class="text-middle">';
                            tds += '<select class="form-control width-100 guardar txtMRiesgos_Matriz_RequisitoLegal" data-indice="RequisitoLegal">';
                                tds += '<option value=""></option>';
                                tds += '<option value="Si">Si</option>';
                                tds += '<option value="No">No</option>';
                            tds += '</select>';
                        tds += '</td>';
                        tds += '<td><textarea class="form-control width-200 guardar txtMRiesgos_Matriz_MedidasDeIntervencion" data-indice="MedidasDeIntervencion" rows="2"></textarea></td>';
                        tds += '<td class="text-middle">';
                            tds += '<select class="form-control width-200 guardar txtMRiesgos_Matriz_TipoMedida" data-indice="TipoMedida">';
                                tds += '<option value=""></option>';
                                tds += '<option value="Eliminación">Eliminación</option>';
                                tds += '<option value="Sustitución">Sustitución</option>';
                                tds += '<option value="Controles de Ingeniería">Controles de Ingeniería </option>';
                                tds += '<option value="Señalización, Advertencia, Controles Administrativos">Señalización, Advertencia, Controles Administrativos </option>';
                                tds += '<option value="Equipos / elementos de Protección Personal">Equipos / elementos de Protección Personal </option>';
                            tds += '</select>';
                        tds += '</td>';
                        tds += '<td class="text-middle">';
                            tds += '<select class="form-control width-200 guardar txtMRiesgos_Matriz_Programa" data-indice="Programa">';
                                tds += '<option value=""></option>';
                                tds += '<option value="Medicina Preventiva y del Trabajo">Medicina Preventiva y del Trabajo</option>';
                                tds += '<option value="Seguridad Industrial">Seguridad Industrial</option>';
                                tds += '<option value="Higiene Industrial">Higiene Industrial</option>';
                            tds += '</select>';
                        tds += '</td>';
                    tds += '</tr>';
                });

                $("#tblMRiesgos_Home tbody").append(tds);

                $.each(ids, function(index, indice) 
                {
                    var valores = arrValores[indice];

                    if (!isNaN(indice) && indice != '')
                    {
                        var contenedor = $('#tblMRiesgos_Home tbody tr[idObj=' + indice + ']');

                        var obj = $(contenedor).find(".guardar");

                        $.each(obj, function(index, val) 
                        {
                            if ($(val).attr("data-indice") != undefined)
                            {
                              if ($(val).prop("tagName") == "SPAN" || $(val).prop("tagName") == "TD")
                              {
                                $(val).text(valores[$(val).attr('data-indice')]);
                              } else
                              {
                                $(val).val(valores[$(val).attr('data-indice')]);
                              }

                              if ($(val).attr('data-indice') == 'Descripcion')
                              {
                                $(val).trigger('change');
                              }
                            }
                        });

                        $(contenedor).find('.txtMRiesgos_Matriz_NivelDeConsecuencia').trigger('change');
                    }
                });

                $(".btnMRiesgos_Matriz_Guardar").hide();
                $("#cntMRiesgos_ActionButtons").hide();
            }
        }, 'json');
}

function fun_MRiesgos_Home_Peligo_Clasificaciones(Descripcion)
{
    var mRiesgos_Home_Peligo_Clasificaciones = {
        'Biológico' : [
            'Virus',
            'Bacterias',
            'Hongos',
            'Ricketsias',
            'Parásitos',
            'Picaduras',
            'Mordeduras',
            'Fluidos o excrementos'
        ],
        'Físico' : [
            'Ruido (impacto intermitente y continuo)',
            'Iluminación (luz visible por exceso o deficiencia)',
            'Vibración (cuerpo entero, segmentaria)',
            'Temperaturas extremas (calor y frio)',
            'Preción atmosférica (normal y ajustada)',
            'Radiaciones ionizantes (rayos x, gama, beta y alfa)',
            'Radiaciones no ionizantes (láser, ultravioleta infrarroja)'
        ],
        'Químico' : [
            'Polvos orgánicos inorgánicos',
            'Fibras',
            'Líquidos (nieblas y rocíos)',
            'Gases y vapores',
            'Humos metálicos, no metálicos',
            'Material particulado'
        ],
        'Clasificación Psicosocial' : [
            'Gestión organizacional (estilo de mando, pago, contratación, participación, inducción y capacitación, bienestar social, evaluación del desempeño, manejo de cambios)',
            'Características de la organización del trabajo (comunicación, tecnología, organización del trabajo, demandas cualitativas y cuantitativas de la labo',
            'Características del grupo social del trabajo (relaciones, cohesión, calidad de interacciones, trabajo en equipo',
            'Condiciones de la tarea (carga mental, contenido de la tarea, demandas emocionales, sistemas de control, definición de roles, monotonía, etc)',
            'Interfase persona tarea (conocimientos, habilidades con relación a la demanda de la tarea, iniciativa, autonomía y reconocimiento, identificación de la persona con la tarea y la organizació',
            'Jornada de trabajo (pausas, trabajo nocturno, rotación, horas extras, descansos)'
        ],
        'Biomecánicos' : [
            'Postura (prologada mantenida, forzada, antigravitacionales)',
            'Esfuerzo',
            'Movimiento repetitivo',
            'Manipulación manual de cargas'
        ],
        'Condiciones de Seguridad' : [
            'Mecánico (elementos de máquinas, herramientas, piezas a trabajar, materiales proyectados sólidos o fluidos',
            'Eléctrico (alta y baja tensión, estática)',
            'Locativo (almacenamiento, superficies de trabajo (irregularidades, deslizantes, con diferencia del nivel) condiciones de orden y aseo, caídas de objeto)',
            'Tecnológico (explosión, fuga, derrame, incendio)',
            'Accidentes de tránsito',
            'Públicos (Robos, atracos, asaltos, atentados, desorden público, etc.)',
            'Trabajo en Alturas',
            'Espacios Confinados' 
        ],
        'Fenómenos Naturales' : [
            'Sismo',
            'T erremoto',
            'Vendaval',
            'Inundación',
            'Derrumbe',
            'Precipitaciones, (lluvias, granizadas, heladas)'
        ]
    };

    return mRiesgos_Home_Peligo_Clasificaciones[Descripcion];
}