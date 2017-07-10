function fun_Inicio()
{
  $(document).delegate('.btnCargarMenu', 'click', function(evento) 
  {
    evento.preventDefault();
    $(this).inicio_CargarMenu();
  });
  

  $.fn.inicio_CargarMenu = function()
  {
    var Vinculo = $(this).attr("data-sitio");

    $("#contenedorMenu ul").remove();
    $.get('menus/' + Vinculo + ".html?tmpId=" + obtenerPrefijo(), function(data) 
    {
      $("#contenedorMenu").append(data);
      if ($(window).width() < 767)
          {
            $.site.menubar.open();
          } else
          {
            $.site.menubar.unfold();
          }
    }).fail(function() {
      Mensaje("Error", "No tiene permisos para acceder a este modulo", "danger");
    });
    $("#contenedorMenu ul").remove();
  }

  $(document).delegate('.input-search-close', 'click', function(event) 
  {
    var control = $(this).parent('.input-search').find('input[type="text"]');
    $(control).val('');
  });

  $(document).delegate('.buscarGoogle', 'submit', function(event) 
  {
    event.preventDefault();

    $(this).ajustarFormularioGoogle();
  });

  $.fn.ajustarFormularioGoogle = function()
  {
    $(this).css('margin-top', '0px');
    $(this).css('width', '100%');
    $(this).find(".buscarGoogle_titulo").remove();

    var objetos = $(this).find('.buscarGoogle_col');
    var botones = $(objetos).find("button");

    $(objetos).removeClass('col-sm-12');
    $(objetos).addClass('col-lg-6');

    $(botones).removeClass('margin-10');
    $(botones).addClass('margin-horizontal-5');

    $(this).find(".buscarGoogle_col_del").remove();

    $(this).removeClass('buscarGoogle');
  }
}