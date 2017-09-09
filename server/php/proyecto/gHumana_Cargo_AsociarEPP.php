<?php
   include("../conectar.php"); 
   $link = Conectar();

   
   $idUsuario = addslashes($_POST['Usuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idCargo = addslashes($_POST['idCargo']);
   $idEPP = addslashes($_POST['idEPP']);

   $sql = "INSERT INTO gHumana_Cargos_has_EPP(idEmpresa, idUsuario, idCargo, idEPP)  VALUES 
   (
      '" . $idEmpresa . "',
      '" . $idUsuario . "',
      '" . $idCargo . "',
      '" . $idEPP . "'
   ) ON DUPLICATE KEY UPDATE
      idEmpresa = VALUES(idEmpresa),
      idUsuario = VALUES(idUsuario),
      idCargo = VALUES(idCargo),
      idEPP = VALUES(idEPP);";

   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      echo $link->insert_id;
   } else
   {
      echo $link->error;
   }
   
?> 