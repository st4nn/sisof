<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);
   
   $sql = "SELECT
            gProcesos_Procesos_Actividades.id AS RidActividad,
            gProcesos_Procesos.Texto AS Proceso,
            gProcesos_Procesos_Actividades.Nombre AS Actividad,
            mRiesgos_Matriz.*
         FROM
            gProcesos_Procesos_Actividades
            INNER JOIN gProcesos_Procesos ON gProcesos_Procesos.idDiagrama = gProcesos_Procesos_Actividades.idEmpresa AND gProcesos_Procesos_Actividades.idProceso = gProcesos_Procesos.idInterno
            LEFT JOIN mRiesgos_Matriz ON mRiesgos_Matriz.idEmpresa = gProcesos_Procesos_Actividades.idEmpresa AND gProcesos_Procesos_Actividades.id = mRiesgos_Matriz.idActividad
         WHERE
            gProcesos_Procesos_Actividades.idEmpresa = '$idEmpresa'
         ORDER BY 1, 2;";
            
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