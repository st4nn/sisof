<?php
   include("../conectar.php"); 
   $link = Conectar();

   date_default_timezone_set('America/Bogota');

   $idRiesgo = addslashes($_POST['idRiesgo']);
   $Mes = addslashes($_POST['Mes']);
   $Semana = addslashes($_POST['Semana']);
   $Tipo = addslashes($_POST['Tipo']);
   $Anio = addslashes($_POST['Anio']);
   $idUsuario = addslashes($_POST['idUsuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $Valor = addslashes($_POST['Valor']);

   $fecha = date('Y-m-d H:i:s');


   $sql = "INSERT INTO pTrabajo_Anual_Riesgos(idEmpresa, idRiesgo, idUsuario, fechaCargue, Anio, Mes, Semana, Tipo, Valor) VALUES 
   (
      '$idEmpresa',
      '$idRiesgo',
      '$idUsuario',
      '$fecha',
      '$Anio',
      '$Mes',
      '$Semana',
      '$Tipo',
      '$Valor'
   ) ON DUPLICATE KEY UPDATE 
      idEmpresa = VALUES(idEmpresa),
      idRiesgo = VALUES(idRiesgo),
      idUsuario = VALUES(idUsuario),
      fechaCargue = VALUES(fechaCargue),
      Anio = VALUES(Anio),
      Mes = VALUES(Mes),
      Semana = VALUES(Semana),
      Tipo = VALUES(Tipo),
      Valor = VALUES(Valor);";

   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      $nuevoId = $link->insert_id;
      echo $nuevoId;
   } else
   {
      echo $link->error;
   }

?> 