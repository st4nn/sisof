<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $Parametro = addslashes($_POST['Parametro']);
   
   $sql = "SELECT
            Empresas.*,
            Archivos.Ruta,
            Archivos.Nombre AS Archivo,
            datosUsuarios.Nombre AS Usuario,
            datosUsuarios.Correo AS Correo
          FROM
            Empresas
            LEFT JOIN Archivos ON Archivos.Proceso = 'empresa_Logo' AND Archivos.Prefijo = Empresas.id
            INNER JOIN datosUsuarios ON datosUsuarios.idLogin = Empresas.idUsuario
         WHERE
            Empresas.Nombre LIKE '%$Parametro%'
            OR Empresas.Direccion LIKE '%$Parametro%'
            OR Empresas.Correo LIKE '%$Parametro%'
            OR Empresas.Telefono LIKE '%$Parametro%';";
            
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