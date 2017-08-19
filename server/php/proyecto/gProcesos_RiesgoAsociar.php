<?php
   include("../conectar.php"); 
   $link = Conectar();

   
   $idUsuario = addslashes($_POST['Usuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idProceso = addslashes($_POST['idProceso']);
   $idRiesgo = addslashes($_POST['idRiesgo']);

   $sql = "INSERT INTO gProcesos_Procesos_Riesgos(idEmpresa, idProceso, idRiesgo, idUsuario) VALUES
   (
      '" . $idEmpresa . "',
      '" . $idProceso . "',
      '" . $idRiesgo . "',
      '" . $idUsuario . "'
   ) ON DUPLICATE KEY UPDATE
      idEmpresa = VALUES(idEmpresa),
      idUsuario = VALUES(idUsuario),
      idProceso = VALUES(idProceso),
      idRiesgo = VALUES(idRiesgo);";

   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      echo $link->insert_id;
   } else
   {
      echo $link->error;
   }
   
?> 