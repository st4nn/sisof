<?php
   include("../conectar.php"); 
   $link = Conectar();

   $id = addslashes($_POST['id']);

   $sql = "DELETE FROM gHumana_Personal WHERE id = '$id';";

   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      echo $link->insert_id;
   } else
   {
      echo $link->error;
   }
   
?> 