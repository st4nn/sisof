<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   
   $sql = "SELECT
            gHumana_MatrizEPP.*,
            Archivos.Ruta,
            Archivos.Nombre AS Archivo
          FROM
            gHumana_MatrizEPP
            LEFT JOIN Archivos ON Archivos.Proceso = 'imagen_EPP' AND Archivos.Prefijo = gHumana_MatrizEPP.id
         WHERE
            gHumana_MatrizEPP.idEmpresa = '$idEmpresa';";
            
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