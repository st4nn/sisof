<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);
   
   
   $sql = "SELECT
            mRiesgos_Matriz.id AS id,
            mRiesgos_Matriz.Descripcion AS Descripcion,
            mRiesgos_Matriz.Clasificacion AS Clasificacion,
            mRiesgos_Matriz.MedidasDeIntervencion
         FROM
            mRiesgos_Matriz
         WHERE
            mRiesgos_Matriz.idEmpresa = '$idEmpresa'
         ORDER BY 
            1, 2, 3;";

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