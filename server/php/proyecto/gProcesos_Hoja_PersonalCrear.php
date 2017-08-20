<?php
   include("../conectar.php"); 
   $link = Conectar();

   
   $idUsuario = addslashes($_POST['Usuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idProceso = addslashes($_POST['idKey']);

   $idCargo = addslashes($_POST['idCargo']);

   $sql = "INSERT INTO gProcesos_Procesos_Personal(idEmpresa, idProceso, idCargo, idUsuario) VALUES 
   (
      '" . $idEmpresa . "',
      '" . $idProceso . "',
      '" . $idCargo . "',
      '" . $idUsuario . "'
   ) ON DUPLICATE KEY UPDATE
      idEmpresa = VALUES(idEmpresa),
      idUsuario = VALUES(idUsuario),
      idProceso = VALUES(idProceso),
      idCargo = VALUES(idCargo);";

   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      echo $link->insert_id;
   } else
   {
      echo $link->error;
   }
   
?> 