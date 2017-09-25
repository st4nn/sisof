<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idUsuario = addslashes($_POST['Usuario']);
   
   
   $sql = "SELECT
            gProcesos_Procesos.id AS RidProceso,
            mRiesgos_Matriz.Descripcion AS Descripcion,
            mRiesgos_Matriz.Clasificacion AS Clasificacion,
            mRiesgos_Matriz.aNivelDeRiesgo,
            COUNT(DISTINCT gProcesos_Procesos_Actividades.id) AS Cantidad
         FROM
            gProcesos_Procesos            
            INNER JOIN gProcesos_Mapa_Diagrama ON gProcesos_Mapa_Diagrama.id = gProcesos_Procesos.idDiagrama
            LEFT JOIN gProcesos_Procesos_Actividades ON gProcesos_Procesos_Actividades.idProceso = gProcesos_Procesos.idInterno AND gProcesos_Procesos_Actividades.idEmpresa = gProcesos_Mapa_Diagrama.idEmpresa
            LEFT JOIN mRiesgos_Matriz ON mRiesgos_Matriz.idActividad = gProcesos_Procesos_Actividades.id
         WHERE
            gProcesos_Mapa_Diagrama.idEmpresa = '$idEmpresa'
            AND gProcesos_Procesos.Tipo = 'Proceso'
         GROUP BY
            mRiesgos_Matriz.Descripcion,
            mRiesgos_Matriz.Clasificacion,
            mRiesgos_Matriz.aNivelDeRiesgo
         ORDER BY 
            1, 2;";

   $result = $link->query($sql);
   $idx = 0;
   if ( $result->num_rows > 0)
   {
      $Resultado = array();
      while ($row = mysqli_fetch_assoc($result))
      {
         $idx = crypt($row['RidProceso'] . $row['Descripcion'] . $row['Clasificacion'], 'sisof');

         if (!isset($Resultado[$idx]))
         {
            $Resultado[$idx] = array();

            $Resultado[$idx]['Descripcion'] = utf8_encode($row['Descripcion']);
            $Resultado[$idx]['Clasificacion'] = utf8_encode($row['Clasificacion']);
            $Resultado[$idx]['C0'] = 0;
            $Resultado[$idx]['C1'] = 0;
            $Resultado[$idx]['C2'] = 0;
            $Resultado[$idx]['C3'] = 0;
            $Resultado[$idx]['C4'] = 0;
            $Resultado[$idx]['Total'] = 0;
         }

         $Resultado[$idx]['Total'] = $Resultado[$idx]['Total'] + $row['Cantidad'];

         $aNivelDeRiesgo = $row['aNivelDeRiesgo'];

         if ($aNivelDeRiesgo == 'Aceptable')
         {
            $Resultado[$idx]['C1'] = $row['Cantidad'];
         } else
         {
            if ($aNivelDeRiesgo == 'Mejorable')
            {
               $Resultado[$idx]['C2'] = $row['Cantidad'];
            } else
            {
               if (utf8_encode($aNivelDeRiesgo) == 'No Aceptable o Aceptable con Control Específico')
               {
                  $Resultado[$idx]['C3'] = $row['Cantidad'];
               } else
               {
                  if ($aNivelDeRiesgo == 'No Aceptable')
                  {
                     $Resultado[$idx]['C4'] = $row['Cantidad'];
                  } else
                  {
                     $Resultado[$idx]['C0'] = $row['Cantidad'];
                  }   
               }      
            }            
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