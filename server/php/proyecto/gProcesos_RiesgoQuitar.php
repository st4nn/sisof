<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idRiesgo = addslashes($_POST['idRiesgo']);

   $sql = "DELETE FROM gProcesos_Procesos_Riesgos WHERE id = '$idRiesgo';";

   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      echo $link->insert_id;
   } else
   {
      echo $link->error;
   }
   
?> 