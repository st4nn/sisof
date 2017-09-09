<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   
   $sql = "SELECT 
              gHumana_EntregaEPP.*,
              gHumana_Personal.Numero_id,
              gHumana_Personal.Apellidos,
              gHumana_Personal.Nombres,
              gHumana_MatrizEPP.EPP,
              gHumana_Cargos.Texto AS Cargo
            FROM 
              gHumana_EntregaEPP
               INNER JOIN gHumana_Personal ON gHumana_Personal.id = gHumana_EntregaEPP.idPersonal
               INNER JOIN gHumana_MatrizEPP ON gHumana_EntregaEPP.idEPP = gHumana_MatrizEPP.id
               INNER JOIN gHumana_Cargos ON gHumana_Personal.idCargo = gHumana_Cargos.idInterno AND gHumana_Cargos.idDiagrama = gHumana_Personal.idEmpresa
            WHERE 
               gHumana_EntregaEPP.idEmpresa = '$idEmpresa';";

            
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