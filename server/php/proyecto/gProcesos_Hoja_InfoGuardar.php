<?php
   include("../conectar.php"); 
   $link = Conectar();

   
   $idUsuario = addslashes($_POST['Usuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idProceso = addslashes($_POST['idKey']);
   $Objetivo = addslashes($_POST['Objetivo']);
   $Responsable = addslashes($_POST['Responsable']);

   $sql = "INSERT INTO gProcesos_Procesos_Info(idEmpresa, idProceso, Objetivo, idResponsable, idUsuario) VALUES 
   (
      '" . $idEmpresa . "',
      '" . $idProceso . "',
      '" . $Objetivo . "',
      '" . $Responsable . "',
      '" . $idUsuario . "'
   ) ON DUPLICATE KEY UPDATE
      idEmpresa = VALUES(idEmpresa),
      idUsuario = VALUES(idUsuario),
      idResponsable = VALUES(idResponsable),
      Objetivo = VALUES(Objetivo);";

   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      echo $link->insert_id;
   } else
   {
      echo $link->error;
   }
   
?> 