pTrabajo_Home_inicio();

function pTrabajo_Home_inicio()
{
	$(document).delegate('.btnpTrabajo_VerPanel', 'click', function()
	{
		cargarModulo('pTrabajo/home.html', 'Plan de Trabajo Anual');
	});
}