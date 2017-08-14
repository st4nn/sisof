<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   
   $sql = "SELECT
            gHumana_Cargos.*
         FROM
            gHumana_Cargos
            INNER JOIN gHumana_Organigrama_Diagrama ON gHumana_Organigrama_Diagrama.id = gHumana_Cargos.idDiagrama
         WHERE
            gHumana_Organigrama_Diagrama.idEmpresa = '$idEmpresa';";
            
   $result = $link->query($sql);
   $idx = 0;
   if ( $result->num_rows > 0)
   {
      $Resultado = array();
      while ($row = mysqli_fetch_assoc($result))
      {
         $Resultado[$idx] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado[$idx][$key] = utf8_encode($value);
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