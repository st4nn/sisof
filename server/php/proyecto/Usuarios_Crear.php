<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['Usuario']);
   $id = addslashes($_POST['id']);
   $Nombre = addslashes($_POST['Nombre']);
   $Cargo = addslashes($_POST['Cargo']);
   $Correo = addslashes($_POST['Correo']);
   $idPerfil = addslashes($_POST['idPerfil']);
   $idEmpresa = addslashes($_POST['idEmpresa']);

   $nUsuario = addslashes($_POST['nUsuario']);
   $Clave = addslashes($_POST['Clave']);
   $Clave2 = addslashes($_POST['Clave2']);

   if ($id == "" OR is_null($id) OR $id == " " OR $id == "NULL")
   {
      $id = "NULL";
   }

   $sql = "INSERT INTO Login(idLogin, Usuario, Clave, Estado, idEmpresa) VALUES 
   (
      $id, 
      '" . $nUsuario . "',
      '" . md5(md5(md5($Clave))) . "',
      'Activo',
      '" . $idEmpresa . "'
   ) ON DUPLICATE KEY UPDATE
   Usuario = VALUES(Usuario),
   Clave = VALUES(Clave),
   Estado = VALUES(Estado),
   idEmpresa = VALUES(idEmpresa);";

   $link->query(utf8_decode($sql));

   if ( $link->error == "")
   {
      if ($id == 'NULL')
      {
         $id = $link->insert_id;
      } 

      $sql = "INSERT INTO datosUsuarios(idLogin, Nombre, Correo, idPerfil, Cargo) VALUES
      (
         $id, 
         '" . $Nombre . "',
         '" . $Correo . "',
         '" . $idPerfil . "',
         '" . $Cargo . "'
      ) ON DUPLICATE KEY UPDATE
      Nombre = VALUES(Nombre),
      Correo = VALUES(Correo),
      idPerfil = VALUES(idPerfil),
      Cargo = VALUES(Cargo);";

      $link->query(utf8_decode($sql));

      if ( $link->error == "")
      {
         echo $id;
      } else
      {
         echo $link->error;
      }
   } else
   {
      echo $link->error;
   }
?> 