<?php

   include("../conectar.php"); 
   $link = Conectar();
   $id = addslashes($_POST['idCargo']);
   $Estudios = addslashes($_POST['Estudios']);
   $Formacion = addslashes($_POST['Formacion']);
   $Experiencia = addslashes($_POST['Experiencia']);
   $Responsabilidades = addslashes($_POST['Responsabilidades']);
   $RendicionDeCuentas = addslashes($_POST['RendicionDeCuentas']);
   
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);

   if ($id == "" OR is_null($id) OR $id == " " OR $id == "NULL")
   {
      $id = "NULL";
   }

      $sql = "INSERT INTO gHumana_Cargos_Descripcion(idCargo, idUsuario, idEmpresa, Estudios, Formacion, Experiencia, Responsabilidades, RendicionDeCuentas) VALUES 
      (
         '" . $id . "', 
         '" . $idUsuario . "', 
         '" . $idEmpresa . "', 
         '" . $Estudios . "', 
         '" . $Formacion . "', 
         '" . $Experiencia . "', 
         '" . $Responsabilidades . "', 
         '" . $RendicionDeCuentas . "'
      ) ON DUPLICATE KEY UPDATE
         idUsuario = VALUES(idUsuario),
         Estudios = VALUES(Estudios),
         Formacion = VALUES(Formacion),
         Experiencia = VALUES(Experiencia),
         Responsabilidades = VALUES(Responsabilidades),
         RendicionDeCuentas = VALUES(RendicionDeCuentas);";

      $link->query(utf8_decode($sql));


      if ( $link->error == "")
      {
         if ($id == 'NULL')
         {
            echo $link->insert_id;
         } else
         {
            echo $id;
         }
      } else
      {
         echo $link->error;
      }
?> 