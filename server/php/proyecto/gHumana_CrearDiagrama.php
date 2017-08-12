<?php
   include("../conectar.php"); 
   $link = Conectar();

   date_default_timezone_set('America/Bogota');

   $idDiagrama = addslashes($_POST['idDiagrama']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['idUsuario']);
   $Diagrama = addslashes($_POST['Diagrama']);

   $fecha = date('Y-m-d H:i:s');


   $sql = "INSERT INTO gHumana_Organigrama_Diagrama(id, idEmpresa, idUsuario, Diagrama) VALUES 
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
      $nuevoId = $link->insert_id;
      echo $nuevoId;

      $sql = "DELETE FROM gHumana_Cargos WHERE idDiagrama = '$nuevoId'";
      $link->query(utf8_decode($sql));

      $arrDiagrama = json_decode(stripslashes($Diagrama));

      $values = '';

      if (array_key_exists('nodeDataArray', $arrDiagrama))
      {
         foreach ($arrDiagrama->nodeDataArray as $index => $value) 
         {
           $values .= "('$nuevoId', '" . $value->key . "', '" . $value->text . "'), ";
         }
      }

      if ($values <> '')
      {
         $values = substr($values, 0, -2);
         $sql = "INSERT INTO gHumana_Cargos(idDiagrama, idInterno, Texto) VALUES $values;";

         $link->query(utf8_decode($sql));
      }



   } else
   {
      echo $link->error;
   }

?> 