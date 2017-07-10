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
}