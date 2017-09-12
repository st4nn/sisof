<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idRiesgo = addslashes($_POST['idRiesgo']);

   $sql = "DELETE FROM mRiesgos_Matriz WHERE id = '$idRiesgo';";

   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      echo $link->insert_id;
   } else
   {
      echo $link->error;
   }
   
?> 