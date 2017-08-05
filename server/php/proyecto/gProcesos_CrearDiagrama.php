<?php
   include("../conectar.php"); 
   $link = Conectar();

   date_default_timezone_set('America/Bogota');

   $idDiagrama = addslashes($_POST['idDiagrama']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['idUsuario']);
   $Diagrama = addslashes($_POST['Diagrama']);

   $fecha = date('Y-m-d H:i:s');


   $sql = "INSERT INTO gProcesos_Mapa_Diagrama(id, idEmpresa, idUsuario, Diagrama) VALUES 
   (
      $idDiagrama,
      '$idEmpresa',
      '$idUsuario',
      '$Diagrama'
   ) ON DUPLICATE KEY UPDATE 
      idEmpresa = VALUES(idEmpresa),
      idUsuario = VALUES(idUsuario),
      Diagrama = VALUES(Diagrama),
      fechaCargue = '$fecha';";

   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      echo $link->insert_id;
   } else
   {
      echo $link->error;
   }

?> 