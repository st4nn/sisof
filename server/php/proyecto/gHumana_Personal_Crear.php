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

   $sql = "INSERT INTO gHumana_Personal(
      idEmpresa, idUsuario, Numero_id, Apellidos, Nombres, talla_Camisa, talla_Pantalon, 
      talla_Zapatos, fecha_de_Ingreso, idCargo, RH, Telefono, email, Direccion, estado_Civil) VALUES 
   (
      '" . $idEmpresa . "',
      '" . $idUsuario . "',
      '" . $datos->Numero_id . "', 
      '" . $datos->Apellidos . "', 
      '" . $datos->Nombres . "', 
      '" . $datos->talla_Camisa . "', 
      '" . $datos->talla_Pantalon . "', 
      '" . $datos->talla_Zapatos . "', 
      '" . $datos->fecha_de_Ingreso . "', 
      '" . $datos->idCargo . "', 
      '" . $datos->RH . "', 
      '" . $datos->Telefono . "', 
      '" . $datos->email . "', 
      '" . $datos->Direccion . "', 
      '" . $datos->estado_Civil . "'
   ) ON DUPLICATE KEY UPDATE
      idEmpresa = VALUES(idEmpresa),
      idUsuario = VALUES(idUsuario),
      Numero_id = VALUES(Numero_id),
      Apellidos = VALUES(Apellidos),
      Nombres = VALUES(Nombres),
      talla_Camisa = VALUES(talla_Camisa),
      talla_Pantalon = VALUES(talla_Pantalon),
      talla_Zapatos = VALUES(talla_Zapatos),
      fecha_de_Ingreso = VALUES(fecha_de_Ingreso),
      idCargo = VALUES(idCargo),
      RH = VALUES(RH),
      Telefono = VALUES(Telefono),
      email = VALUES(email),
      Direccion = VALUES(Direccion),
      estado_Civil = VALUES(estado_Civil);";

   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      echo $link->insert_id;
   } else
   {
      echo $link->error;
   }
   
?> 