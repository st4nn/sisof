<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idCargo = addslashes($_POST['idCargo']);
   
   $Usuario = datosUsuario($idUsuario);

   $eUsuario = "";
   if ($Usuario['idPerfil'] > 1)
   {
      $eUsuario = " AND gHumana_Cargos_Descripcion.idEmpresa = '" . $Usuario['idEmpresa'] . "'";
   }

   $sql = "SELECT
            gHumana_Cargos_Descripcion.*,
            datosUsuarios.Nombre AS Usuario,
            datosUsuarios.Correo AS uCorreo
          FROM
            gHumana_Cargos_Descripcion
            INNER JOIN datosUsuarios ON datosUsuarios.idLogin = gHumana_Cargos_Descripcion.idUsuario
         WHERE
            gHumana_Cargos_Descripcion.idCargo = '$idCargo'
            AND gHumana_Cargos_Descripcion.idEmpresa = '$idEmpresa' $eUsuario;";
            
   $result = $link->query(utf8_decode($sql));
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