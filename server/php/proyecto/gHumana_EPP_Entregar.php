<?php

   include("../conectar.php"); 
   $link = Conectar();
   
   $idEPP = addslashes($_POST['idEPP']);
   $Talla = addslashes($_POST['Talla']);
   $Cantidad = addslashes($_POST['Cantidad']);
   $fechaEntrega = addslashes($_POST['fechaEntrega']);
   $Proyecto = addslashes($_POST['Proyecto']);
   $idPersona = addslashes($_POST['idPersona']);
   
   $idUsuario = addslashes($_POST['Usuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);

   $id='NULL';

      $sql = "INSERT INTO gHumana_EntregaEPP(idUsuario, idEmpresa, Proyecto, Talla, Cantidad, idPersonal, idEPP, fechaEntrega) VALUES 
      (
         '" . $idUsuario . "', 
         '" . $idEmpresa . "', 
         '" . $Proyecto . "', 
         '" . $Talla . "', 
         '" . $Cantidad . "', 
         '" . $idPersona . "', 
         '" . $idEPP . "', 
         '" . $fechaEntrega . "'
      ) ON DUPLICATE KEY UPDATE
         idUsuario = VALUES(idUsuario),
         idEmpresa = VALUES(idEmpresa),
         Proyecto = VALUES(Proyecto),
         Talla = VALUES(Talla),
         Cantidad = VALUES(Cantidad),
         idPersonal = VALUES(idPersonal),
         idEPP = VALUES(idEPP),
         fechaEntrega = VALUES(fechaEntrega);";

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