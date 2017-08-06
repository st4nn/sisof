<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $idDiagrama = addslashes($_POST['idDiagrama']);
   $idKey = addslashes($_POST['idKey']);
   
   
   $sql = "SELECT
            gProcesos_Procesos.*
          FROM
            gProcesos_Procesos
         WHERE
            gProcesos_Procesos.idDiagrama = '$idDiagrama'
            AND gProcesos_Procesos.idInterno = '$idKey';";
            
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
         //echo $Resultado['Diagrama'];
         echo json_encode($Resultado);
   } else
   {
      echo 0;
   }
?>