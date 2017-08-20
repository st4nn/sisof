<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $idDiagrama = addslashes($_POST['idDiagrama']);
   $idKey = addslashes($_POST['idKey']);

   $Resultado = array('Datos' => [], 'Info'=>[], 'Riesgos' => [], 'Actividades' => [], 'Personal' => []);
   
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
      
      while ($row = mysqli_fetch_assoc($result))
      {
         foreach ($row as $key => $value) 
         {
            $Resultado['Datos'][$key] = utf8_encode($value);
         }
         $idx++;
      }
      mysqli_free_result($result);  

      $sql = "SELECT
            gProcesos_Procesos_Riesgos.*,
            confRiesgos.Nombre AS Riesgo,
            confRiesgos_Clasificacion.Nombre AS Clasificacion
          FROM
            gProcesos_Procesos_Riesgos
            INNER JOIN confRiesgos ON confRiesgos.id = gProcesos_Procesos_Riesgos.idRiesgo
            INNER JOIN confRiesgos_Clasificacion ON confRiesgos_Clasificacion.id = confRiesgos.idClasificacion 
            INNER JOIN gProcesos_Procesos ON gProcesos_Procesos.idInterno = gProcesos_Procesos_Riesgos.idProceso AND gProcesos_Procesos.idDiagrama = '$idDiagrama'
         WHERE
            gProcesos_Procesos.idInterno = '$idKey';";
            
      $result = $link->query($sql);
      $idx = 0;
      if ( $result->num_rows > 0)
      {
         while ($row = mysqli_fetch_assoc($result))
         {
            $Resultado['Riesgos'][$idx] = array(); 
            foreach ($row as $key => $value) 
            {
               $Resultado['Riesgos'][$idx][$key] = utf8_encode($value);
            }
            $idx++;
         }
         mysqli_free_result($result);  
      }

      $sql = "SELECT
            gProcesos_Procesos_Info.*
          FROM
            gProcesos_Procesos_Info
            INNER JOIN gProcesos_Procesos ON gProcesos_Procesos.idInterno = gProcesos_Procesos_Info.idProceso AND gProcesos_Procesos.idDiagrama = '$idDiagrama'
         WHERE
            gProcesos_Procesos.idInterno = '$idKey';";

            
      $result = $link->query($sql);
      if ( $result->num_rows > 0)
      {
         while ($row = mysqli_fetch_assoc($result))
         {
            foreach ($row as $key => $value) 
            {
               $Resultado['Info'][$key] = utf8_encode($value);
            }
         }
         mysqli_free_result($result);  
      }

       echo json_encode($Resultado);
   } else
   {
      echo 0;
   }

?>