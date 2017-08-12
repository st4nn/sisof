<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   
   
   $sql = "SELECT
            *
          FROM
            gHumana_Organigrama_Diagrama
         WHERE
            gHumana_Organigrama_Diagrama.idEmpresa = '$idEmpresa'
         ORDER BY
            gHumana_Organigrama_Diagrama.fechaCargue DESC;";
            
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
         $Resultado['Diagrama'] = $row['Diagrama'];
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