pTrabajo_Home_inicio();

function pTrabajo_Home_inicio()
{
	$(document).delegate('.btnPObjetivos_VerPanel', 'click', function()
	{
		cargarModulo('pObjetivos/home.html', 'Política y Objetivos SG SST');
	});
}