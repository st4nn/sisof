<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);
   
   
   $sql = "SELECT
            pTrabajo_Anual_Riesgos.*
         FROM
            pTrabajo_Anual_Riesgos
         WHERE
            pTrabajo_Anual_Riesgos.idEmpresa = '$idEmpresa';";

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