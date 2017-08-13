<?php
   include("../conectar.php"); 
   $link = Conectar();

   $datos = json_decode($_POST['datos']);
   $idUsuario = addslashes($_POST['Usuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);

   foreach ($datos as $key => $value) 
   {
      $datos->$key = addslashes($value);
   }

   $sql = "INSERT INTO gHumana_MatrizEPP(idEmpresa, idUsuario, Prefijo, Tipo_de_Proteccion, EPP, Norma, Limitaciones, Mantenimiento, Tiempo_de_Reposicion) VALUES 
   (
      '" . $idEmpresa . "',
      '" . $idUsuario . "',
      '" . $datos->Prefijo . "',
      '" . $datos->Tipo_de_Proteccion . "',
      '" . $datos->EPP . "',
      '" . $datos->Norma . "',
      '" . $datos->Limitaciones . "',
      '" . $datos->Mantenimiento . "',
      '" . $datos->Tiempo_de_Reposicion . "'
   ) ON DUPLICATE KEY UPDATE
      idEmpresa = VALUES(idEmpresa),
      idUsuario = VALUES(idUsuario),
      Prefijo = VALUES(Prefijo),
      Tipo_de_Proteccion = VALUES(Tipo_de_Proteccion),
      EPP = VALUES(EPP),
      Norma = VALUES(Norma),
      Limitaciones = VALUES(Limitaciones),
      Mantenimiento = VALUES(Mantenimiento),
      Tiempo_de_Reposicion = VALUES(Tiempo_de_Reposicion);";

   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      echo 1;
   } else
   {
      echo $link->error;
   }
   
?> 