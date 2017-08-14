<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $Prefijo = addslashes($_POST['Prefijo']);
   
   $sql = "SELECT
            gHumana_MatrizEPP.*
          FROM
            gHumana_MatrizEPP
         WHERE
            gHumana_MatrizEPP.Prefijo = '$Prefijo';";
            
   $result = $link->query($sql);
   $idx = 0;
   if ( $result->num_rows > 0)
   {
      $Resultado = array();
      while ($row = mysqli_fetch_assoc($result))
      {
         //$Resultado[$idx] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado[$key] = utf8_encode($value);
         }
         $idx++;
      }
         mysqli_free_result($result);  
         echo json_encode($Resultado);
   } else
   {
      echo 0;
   }
?>