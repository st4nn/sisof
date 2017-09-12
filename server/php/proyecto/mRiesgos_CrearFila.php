<?php

   include("../conectar.php"); 
   $link = Conectar();
   

   $id = addslashes($_POST['id']);
   $idActividad = addslashes($_POST['idActividad']);
   $idEmpresa = addslashes($_POST['idEmpresa']);
   $Usuario = addslashes($_POST['Usuario']);
   $Clasificacion = addslashes($_POST['Clasificacion']);
   $Control = addslashes($_POST['Control']);
   $Descripcion = addslashes($_POST['Descripcion']);
   $EfectosPosibles = addslashes($_POST['EfectosPosibles']);
   $InterpretacionDeProbabilidad = addslashes($_POST['InterpretacionDeProbabilidad']);
   $MedidasDeIntervencion = addslashes($_POST['MedidasDeIntervencion']);
   $NivelDeConsecuencia = addslashes($_POST['NivelDeConsecuencia']);
   $NivelDeDeficiencia = addslashes($_POST['NivelDeDeficiencia']);
   $NivelDeExposicion = addslashes($_POST['NivelDeExposicion']);
   $NivelDeProbabilidad = addslashes($_POST['NivelDeProbabilidad']);
   $NivelDeRiesgo = addslashes($_POST['NivelDeRiesgo']);
   $NroExpuestos = addslashes($_POST['NroExpuestos']);
   $Programa = addslashes($_POST['Programa']);
   $RequisitoLegal = addslashes($_POST['RequisitoLegal']);
   $Rutinario = addslashes($_POST['Rutinario']);
   $Tipo = addslashes($_POST['Tipo']);
   $TipoMedida = addslashes($_POST['TipoMedida']);
   $iNivelDeRiesgo = addslashes($_POST['iNivelDeRiesgo']);
   $aNivelDeRiesgo = addslashes($_POST['aNivelDeRiesgo']);
   $PeorConsecuecia = addslashes($_POST['PeorConsecuecia']);


   if ($id == "undefined" OR $id == "0" OR $id == "" OR is_null($id) OR $id == " " OR $id == "NULL")
   {
      $id = 'NULL';
   }


      $sql = "INSERT INTO mRiesgos_Matriz(id, idUsuario, idEmpresa, idActividad, Rutinario, Descripcion, Clasificacion, EfectosPosibles, Tipo, Control, NivelDeDeficiencia, NivelDeExposicion, NivelDeProbabilidad, InterpretacionDeProbabilidad, NivelDeConsecuencia, NivelDeRiesgo, iNivelDeRiesgo, aNivelDeRiesgo, NroExpuestos, PeorConsecuecia, RequisitoLegal, MedidasDeIntervencion, TipoMedida, Programa) VALUES 
      (
         " . $id . ", 
         '" . $Usuario . "',
         '" . $idEmpresa . "',
         '" . $idActividad . "',
         '" . $Rutinario . "',
         '" . $Descripcion . "',
         '" . $Clasificacion . "',
         '" . $EfectosPosibles . "',
         '" . $Tipo . "',
         '" . $Control . "',
         '" . $NivelDeDeficiencia . "',
         '" . $NivelDeExposicion . "',
         '" . $NivelDeProbabilidad . "',
         '" . $InterpretacionDeProbabilidad . "',
         '" . $NivelDeConsecuencia . "',
         '" . $NivelDeRiesgo . "',
         '" . $iNivelDeRiesgo . "',
         '" . $aNivelDeRiesgo . "',
         '" . $NroExpuestos . "',
         '" . $PeorConsecuecia . "',
         '" . $RequisitoLegal . "',
         '" . $MedidasDeIntervencion . "',
         '" . $TipoMedida . "',
         '" . $Programa . "'
      ) ON DUPLICATE KEY UPDATE
         idUsuario = VALUES(idUsuario),
         idEmpresa = VALUES(idEmpresa),
         fechaCargue = VALUES(fechaCargue),
         idActividad = VALUES(idActividad),
         Rutinario = VALUES(Rutinario),
         Descripcion = VALUES(Descripcion),
         Clasificacion = VALUES(Clasificacion),
         EfectosPosibles = VALUES(EfectosPosibles),
         Tipo = VALUES(Tipo),
         Control = VALUES(Control),
         NivelDeDeficiencia = VALUES(NivelDeDeficiencia),
         NivelDeExposicion = VALUES(NivelDeExposicion),
         NivelDeProbabilidad = VALUES(NivelDeProbabilidad),
         InterpretacionDeProbabilidad = VALUES(InterpretacionDeProbabilidad),
         NivelDeConsecuencia = VALUES(NivelDeConsecuencia),
         NivelDeRiesgo = VALUES(NivelDeRiesgo),
         iNivelDeRiesgo = VALUES(iNivelDeRiesgo),
         aNivelDeRiesgo = VALUES(aNivelDeRiesgo),
         NroExpuestos = VALUES(NroExpuestos),
         PeorConsecuecia = VALUES(PeorConsecuecia),
         RequisitoLegal = VALUES(RequisitoLegal),
         MedidasDeIntervencion = VALUES(MedidasDeIntervencion),
         TipoMedida = VALUES(TipoMedida),
         Programa = VALUES(Programa);";

      $link->query(utf8_decode($sql));


      if ( $link->error == "")
      {
         if ($id == 'NULL')
         {
            echo $link->insert_id;
         } else
         {
            echo $id;
         }
      } else
      {
         echo $link->error;
      }
?> 