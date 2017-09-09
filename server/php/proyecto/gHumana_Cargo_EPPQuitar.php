<?php
   include("../conectar.php"); 
   $link = Conectar();

   $idCargoEPP = addslashes($_POST['idCargoEPP']);

   $sql = "DELETE FROM gHumana_MatrizEPP WHERE id = '$idCargoEPP';";

   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      echo $link->insert_id;
   } else
   {
      echo $link->error;
   }
   
?> 