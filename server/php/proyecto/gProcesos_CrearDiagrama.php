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
      $nuevoId = $link->insert_id;
      echo $nuevoId;

      $sql = "DELETE FROM gProcesos_Procesos WHERE idDiagrama = '$nuevoId'";
      $link->query(utf8_decode($sql));

      $arrDiagrama = json_decode(stripslashes($Diagrama));

      $values = '';

      if (array_key_exists('nodeDataArray', $arrDiagrama))
      {
         foreach ($arrDiagrama->nodeDataArray as $index => $value) 
         {
            if (array_key_exists('color', $value))
            {
               $group = 0;
               if (array_key_exists('group', $value))
               {
                  $group = $value->group;
               }

               switch ($value->color) {
                   case '#ACE600':
                       $values .= "('$nuevoId', 'Proceso', '" . $value->key . "', '" . $value->text . "', $group), ";//Proceso
                       break;
                   case '#FFDD33':
                       $values .= "('$nuevoId', 'SubGrupo', '" . $value->key . "', '" . $value->text . "', $group), ";//SubGrupo
                       break;
                   case '#33D3E5':
                       $values .= "('$nuevoId', 'Grupo', '" . $value->key . "', '" . $value->text . "', $group), ";//Grupo
                       break;
               }
            }
         }
      }

      if ($values <> '')
      {
         $values = substr($values, 0, -2);
         $sql = "INSERT INTO gProcesos_Procesos(idDiagrama, Tipo, idInterno, Texto, idContenedor) VALUES $values;";

         $link->query(utf8_decode($sql));
      }



   } else
   {
      echo $link->error;
   }

?> 