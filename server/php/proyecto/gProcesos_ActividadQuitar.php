<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idActividad = addslashes($_POST['idActividad']);

   $sql = "DELETE FROM gProcesos_Procesos_Actividades WHERE id = '$idActividad';";

   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      echo $link->insert_id;
   } else
   {
      echo $link->error;
   }
   
?> 