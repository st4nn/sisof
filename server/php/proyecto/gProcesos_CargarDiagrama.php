<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   
   
   $sql = "SELECT
            *
          FROM
            gProcesos_Mapa_Diagrama
         WHERE
            gProcesos_Mapa_Diagrama.idEmpresa = '$idEmpresa'
         ORDER BY
            gProcesos_Mapa_Diagrama.fechaCargue ASC;";

            
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
         //$Resultado['Diagrama'] = utf8_encode($row['Diagrama']);
         $idx++;
      }
         mysqli_free_result($result);  
         //echo $Resultado['Diagrama'];
         echo json_encode($Resultado, JSON_UNESCAPED_UNICODE, 2);
   } else
   {
      echo 0;
   }
?>