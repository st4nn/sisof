<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idPersonal = addslashes($_POST['idPersonal']);

   $sql = "DELETE FROM gProcesos_Procesos_Personal WHERE id = '$idPersonal';";

   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      echo $link->insert_id;
   } else
   {
      echo $link->error;
   }
   
?> 