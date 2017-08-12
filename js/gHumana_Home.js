function gHumana_Home_inicio()
{
	$(document).delegate('.btnGHumana_VerPanel', 'click', function()
	{
		cargarModulo('gHumana/home.html', 'Gestión Humana');
	});
}