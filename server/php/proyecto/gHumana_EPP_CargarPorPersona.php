<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $idPersona = addslashes($_POST['idPersona']);
   
   $sql = "SELECT 
                gHumana_EntregaEPP.id AS idEntrega,
                gHumana_EntregaEPP.Proyecto,
                gHumana_Personal.Numero_id,
                gHumana_Personal.Apellidos,
                gHumana_Personal.Nombres,
                gHumana_MatrizEPP.id AS idEPP,
                gHumana_MatrizEPP.EPP,
                gHumana_EntregaEPP.fechaEntrega,
                gHumana_EntregaEPP.Talla,
                gHumana_EntregaEPP.Cantidad
            FROM gHumana_Cargos_has_EPP
               INNER JOIN gHumana_Personal ON gHumana_Personal.idCargo = gHumana_Cargos_has_EPP.idCargo
               INNER JOIN gHumana_MatrizEPP ON gHumana_Cargos_has_EPP.idEPP = gHumana_MatrizEPP.id
               LEFT JOIN gHumana_EntregaEPP ON gHumana_EntregaEPP.idPersonal = gHumana_Personal.id AND gHumana_EntregaEPP.idEPP = gHumana_Cargos_has_EPP.idEPP
            WHERE 
               gHumana_Personal.id = '$idPersona'
               AND gHumana_MatrizEPP.idEmpresa = '$idEmpresa';";

            
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