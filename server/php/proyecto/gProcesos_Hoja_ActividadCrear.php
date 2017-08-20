<?php
   include("../conectar.php"); 
   $link = Conectar();

   
   $idUsuario = addslashes($_POST['Usuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idProceso = addslashes($_POST['idKey']);

   $id = addslashes($_POST['id']);
   $Nombre = addslashes($_POST['Nombre']);
   $Recursos = addslashes($_POST['Recursos']);
   $Insumos = addslashes($_POST['Insumos']);
   $RSST = addslashes($_POST['RSST']);

   $sql = "INSERT INTO gProcesos_Procesos_Actividades(id, idEmpresa, idProceso, Nombre, Recursos, Insumos, RSST, idUsuario) VALUES 
   (
      $id,
      '" . $idEmpresa . "',
      '" . $idProceso . "',
      '" . $Nombre . "',
      '" . $Recursos . "',
      '" . $Insumos . "',
      '" . $RSST . "',
      '" . $idUsuario . "'
   ) ON DUPLICATE KEY UPDATE
      idEmpresa = VALUES(idEmpresa),
      idUsuario = VALUES(idUsuario),
      idProceso = VALUES(idProceso),
      Nombre = VALUES(Nombre),
      Recursos = VALUES(Recursos),
      Insumos = VALUES(Insumos),
      RSST = VALUES(RSST);";

   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      echo $link->insert_id;
   } else
   {
      echo $link->error;
   }
   
?> 