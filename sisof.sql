-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 20-08-2017 a las 04:36:51
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sisof`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Archivos`
--

CREATE TABLE `Archivos` (
  `id` int(11) NOT NULL,
  `idlogin` int(11) NOT NULL,
  `Prefijo` bigint(20) NOT NULL,
  `Ruta` longtext,
  `Nombre` varchar(255) DEFAULT NULL,
  `Observaciones` longtext NOT NULL,
  `Proceso` varchar(45) DEFAULT NULL,
  `FechaCargue` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Archivos`
--

INSERT INTO `Archivos` (`id`, `idlogin`, `Prefijo`, `Ruta`, `Nombre`, `Observaciones`, `Proceso`, `FechaCargue`) VALUES
(11, 1, 2, 'Archivos/2', '54568-minipic.jpg', '789', 'imagen_EPP', '2017-08-14 18:54:01'),
(10, 1, 7, 'Archivos/7', '2z9mdq9.jpg', '', 'empresa_Logo', '2017-08-14 16:26:53'),
(12, 1, 0, 'Archivos/0', '18_Close-128.png', 'a789', 'imagen_EPP', '2017-08-14 19:05:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `confRiesgos`
--

CREATE TABLE `confRiesgos` (
  `id` int(11) NOT NULL,
  `idClasificacion` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `confRiesgos`
--

INSERT INTO `confRiesgos` (`id`, `idClasificacion`, `Nombre`, `fechaCargue`) VALUES
(1, 1, 'Virus ', '2017-08-14 22:20:48'),
(2, 1, 'Bacterias ', '2017-08-14 22:20:48'),
(3, 1, 'Hongos ', '2017-08-14 22:20:48'),
(4, 1, 'Ricketsias ', '2017-08-14 22:20:48'),
(5, 1, 'Parásitos ', '2017-08-14 22:20:48'),
(6, 1, 'Picaduras ', '2017-08-14 22:20:48'),
(7, 1, 'Mordeduras ', '2017-08-14 22:20:48'),
(8, 1, 'Fluidos o excrementos ', '2017-08-14 22:20:48'),
(9, 5, 'Ruido (impacto intermitente y continuo) ', '2017-08-14 22:20:48'),
(10, 5, 'Iluminacion (luz visible por exceso o deficiencia) ', '2017-08-14 22:20:48'),
(11, 5, 'Vibración (cuerpo entero, segmentaria) ', '2017-08-14 22:20:48'),
(12, 5, 'Temperaturas extremas (calor y frío) ', '2017-08-14 22:20:48'),
(13, 5, 'Presión atmosférica (normal y ajustada) ', '2017-08-14 22:20:48'),
(14, 5, 'Radiaciones ionizantes (rayos x, gama, beta y alfa) ', '2017-08-14 22:20:48'),
(15, 5, 'Radiaciones no ionizantes (láser, ultravioleta infraroja) ', '2017-08-14 22:20:48'),
(16, 6, 'Polvos orgánicos inorgánicos ', '2017-08-14 22:20:48'),
(17, 6, 'Fibras ', '2017-08-14 22:20:48'),
(18, 6, 'Líquidos (nieblas y rocíos) ', '2017-08-14 22:20:48'),
(19, 6, 'Gases y vapores ', '2017-08-14 22:20:48'),
(20, 6, 'Humos metálicos, no metálicos ', '2017-08-14 22:20:48'),
(21, 6, 'Material particulado ', '2017-08-14 22:20:48'),
(22, 3, 'Gestión organizacional (estilo de mando, pago, contratación, participación, inducción y capacitación, bienestar social, evaluación del desempeño, manejo de cambios) ', '2017-08-14 22:20:48'),
(23, 3, 'Características de la organización del trabajo (comunicación, tecnología, organización del trabajo, demandas cualitativas y cuantitativas de la labor', '2017-08-14 22:20:48'),
(24, 3, 'Características del grupo social del trabajo (relaciones, cohesión, calidad de interacciones, trabajo en equipo ', '2017-08-14 22:20:48'),
(25, 3, 'Condiciones de la tarea (carga mental, contenido de la tarea, demandas emocionales, sistemas de control, definición de roles, monotonía, etc).', '2017-08-14 22:20:48'),
(26, 3, 'Interfase persona tarea (conocimientos, habilidades con relación a la demanda de la tarea, iniciativa, autonomía y reconocimiento, identificación de la persona con la tarea y la organización', '2017-08-14 22:20:48'),
(27, 3, 'Jornada de trabajo (pausas, trabajo nocturno, rotación, horas extras, descansos) ', '2017-08-14 22:20:48'),
(28, 2, 'Postura (prologada mantenida, forzada, antigravitacionales) ', '2017-08-14 22:20:48'),
(29, 2, 'Esfuerzo ', '2017-08-14 22:20:48'),
(30, 2, 'Movimiento repetitivo ', '2017-08-14 22:20:48'),
(31, 2, 'Manipulación manual de cargas ', '2017-08-14 22:20:48'),
(32, 4, 'Mecánico (elementos de máquinas, herramientas, piezas a trabajar, materiales proyectados sólidos o fluidos ', '2017-08-14 22:20:48'),
(33, 4, 'Eléctrico (alta y baja tensión, estática) ', '2017-08-14 22:20:48'),
(34, 4, 'Locativo (almacenamiento, superficies de trabajo (irregularidades, deslizantes, con diferencia del nivel) condiciones de orden y aseo, caídas de objeto) ', '2017-08-14 22:20:48'),
(35, 4, 'Tecnológico (explosión, fuga, derrame, incendio) ', '2017-08-14 22:20:48'),
(36, 4, 'Accidentes de tránsito ', '2017-08-14 22:20:48'),
(37, 4, 'Públicos (Robos, atracos, asaltos, atentados, desorden público, etc.) ', '2017-08-14 22:20:48'),
(38, 4, 'Trabajo en Alturas ', '2017-08-14 22:20:48'),
(39, 4, 'Espacios Confinados ', '2017-08-14 22:20:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `confRiesgos_Clasificacion`
--

CREATE TABLE `confRiesgos_Clasificacion` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `confRiesgos_Clasificacion`
--

INSERT INTO `confRiesgos_Clasificacion` (`id`, `Nombre`, `fechaCargue`) VALUES
(1, 'Biológico ', '2017-08-14 22:18:08'),
(2, 'Biomecánicos ', '2017-08-14 22:18:08'),
(3, 'Clasificación Psicosocial ', '2017-08-14 22:18:08'),
(4, 'Condiciones de seguridad ', '2017-08-14 22:18:08'),
(5, 'Físico ', '2017-08-14 22:18:08'),
(6, 'Químico ', '2017-08-14 22:18:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datosUsuarios`
--

CREATE TABLE `datosUsuarios` (
  `idLogin` int(11) NOT NULL,
  `Nombre` varchar(120) NOT NULL,
  `Correo` varchar(80) NOT NULL,
  `idPerfil` int(11) NOT NULL,
  `idSede` int(11) NOT NULL,
  `Cargo` varchar(45) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `datosUsuarios`
--

INSERT INTO `datosUsuarios` (`idLogin`, `Nombre`, `Correo`, `idPerfil`, `idSede`, `Cargo`, `fechaCargue`) VALUES
(1, 'Jhonathan Espinosa', 'jhonathan2@wspgroup.com', 1, 3, 'Admin', '2017-06-07 12:03:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Empresas`
--

CREATE TABLE `Empresas` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Direccion` mediumint(9) NOT NULL,
  `Correo` varchar(85) NOT NULL,
  `Telefono` int(45) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Empresas`
--

INSERT INTO `Empresas` (`id`, `Nombre`, `Direccion`, `Correo`, `Telefono`, `idUsuario`, `fechaCargue`) VALUES
(1, 'Soporte', 0, '', 0, 1, '2017-07-09 17:02:06'),
(7, '852', 951, '2313', 4567, 1, '2017-08-14 16:26:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Funciones`
--

CREATE TABLE `Funciones` (
  `id` int(11) NOT NULL,
  `Descripcion` longtext NOT NULL,
  `control` varchar(85) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gHumana_Cargos`
--

CREATE TABLE `gHumana_Cargos` (
  `id` int(11) NOT NULL,
  `idDiagrama` int(11) NOT NULL,
  `idInterno` int(11) NOT NULL,
  `Texto` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `gHumana_Cargos`
--

INSERT INTO `gHumana_Cargos` (`id`, `idDiagrama`, `idInterno`, `Texto`) VALUES
(1, 1, -1, 'Cargo 1'),
(2, 1, -2, 'Cargo 2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gHumana_MatrizEPP`
--

CREATE TABLE `gHumana_MatrizEPP` (
  `id` int(11) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Prefijo` bigint(25) NOT NULL,
  `Tipo_de_Proteccion` varchar(85) DEFAULT NULL,
  `EPP` varchar(255) DEFAULT NULL,
  `Norma` mediumtext,
  `Limitaciones` longtext,
  `Mantenimiento` longtext,
  `Tiempo_de_Reposicion` longtext
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `gHumana_MatrizEPP`
--

INSERT INTO `gHumana_MatrizEPP` (`id`, `idEmpresa`, `idUsuario`, `fechaCargue`, `Prefijo`, `Tipo_de_Proteccion`, `EPP`, `Norma`, `Limitaciones`, `Mantenimiento`, `Tiempo_de_Reposicion`) VALUES
(1, 7, 1, '2017-08-14 18:53:07', 20170814135242001, '123', '456', '789', '012', '345', '678'),
(2, 7, 1, '2017-08-14 18:54:01', 20170814135342001, '456', '789', '012', '345', '678', '901'),
(3, 7, 1, '2017-08-14 19:04:02', 20170814140334001, '123', 'a789', 'asas', 'asas', 'asasa', 'as');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gHumana_Organigrama_Diagrama`
--

CREATE TABLE `gHumana_Organigrama_Diagrama` (
  `id` int(11) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `Diagrama` longtext NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `gHumana_Organigrama_Diagrama`
--

INSERT INTO `gHumana_Organigrama_Diagrama` (`id`, `idEmpresa`, `idUsuario`, `Diagrama`, `fechaCargue`) VALUES
(1, 1, 1, '{ \"class\": \"go.GraphLinksModel\",\n  \"nodeDataArray\": [ \n{\"text\":\"Cargo 1\", \"key\":-1, \"loc\":\"430 240\"},\n{\"text\":\"Cargo 2\", \"key\":-2, \"loc\":\"290 440\"}\n ],\n  \"linkDataArray\": []}', '2017-08-14 21:25:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gHumana_Personal`
--

CREATE TABLE `gHumana_Personal` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idLogin` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Numero_id` varchar(25) NOT NULL,
  `Apellidos` varchar(120) NOT NULL,
  `Nombres` varchar(120) NOT NULL,
  `talla_Camisa` varchar(15) NOT NULL,
  `talla_Pantalon` varchar(15) NOT NULL,
  `talla_Zapatos` varchar(15) NOT NULL,
  `fecha_de_Ingreso` date NOT NULL,
  `idCargo` int(11) NOT NULL,
  `RH` varchar(5) NOT NULL,
  `Telefono` varchar(25) NOT NULL,
  `email` varchar(150) NOT NULL,
  `Direccion` varchar(255) NOT NULL,
  `estado_Civil` varchar(45) NOT NULL,
  `idEmpresa` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `gHumana_Personal`
--

INSERT INTO `gHumana_Personal` (`id`, `idUsuario`, `idLogin`, `fechaCargue`, `Numero_id`, `Apellidos`, `Nombres`, `talla_Camisa`, `talla_Pantalon`, `talla_Zapatos`, `fecha_de_Ingreso`, `idCargo`, `RH`, `Telefono`, `email`, `Direccion`, `estado_Civil`, `idEmpresa`) VALUES
(1, 1, 0, '2017-08-14 21:43:30', '789', '123', '456', '012', '345', '678', '0000-00-00', -1, '234', '567', '890', '123', 'Soltero', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gProcesos_Mapa_Diagrama`
--

CREATE TABLE `gProcesos_Mapa_Diagrama` (
  `id` int(11) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `Diagrama` longtext NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `gProcesos_Mapa_Diagrama`
--

INSERT INTO `gProcesos_Mapa_Diagrama` (`id`, `idEmpresa`, `idUsuario`, `Diagrama`, `fechaCargue`) VALUES
(7, 7, 1, '{ \"class\": \"go.GraphLinksModel\",\n  \"nodeDataArray\": [ {\"text\":\"Proceso\", \"color\":\"#ACE600\", \"key\":-1, \"loc\":\"38.1240234375 18.08037109374999\"} ],\n  \"linkDataArray\": []}', '2017-08-14 18:45:43'),
(8, 1, 1, '{ \"class\": \"go.GraphLinksModel\",\n  \"nodeDataArray\": [ \n{\"text\":\"Proceso 1\", \"color\":\"#ACE600\", \"key\":-1, \"loc\":\"49.9619140625 49.241113281249994\", \"group\":-2},\n{\"text\":\"Sub Grupo\", \"color\":\"#FFDD33\", \"isGroup\":true, \"category\":\"OfNodes\", \"key\":-2, \"loc\":\"49.9619140625 49.241113281249994\"},\n{\"text\":\"Proceso2\", \"color\":\"#ACE600\", \"key\":-3, \"loc\":\"174.01708984375 18.08037109375\"}\n ],\n  \"linkDataArray\": []}', '2017-08-14 21:53:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gProcesos_Procesos`
--

CREATE TABLE `gProcesos_Procesos` (
  `id` int(11) NOT NULL,
  `idDiagrama` int(11) NOT NULL,
  `Tipo` varchar(12) NOT NULL,
  `idInterno` int(11) NOT NULL,
  `Texto` varchar(255) NOT NULL,
  `idContenedor` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `gProcesos_Procesos`
--

INSERT INTO `gProcesos_Procesos` (`id`, `idDiagrama`, `Tipo`, `idInterno`, `Texto`, `idContenedor`) VALUES
(88, 7, 'Proceso', -1, 'Proceso', 0),
(89, 8, 'Proceso', -1, 'Proceso 1', -2),
(90, 8, 'SubGrupo', -2, 'Sub Grupo', 0),
(91, 8, 'Proceso', -3, 'Proceso2', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gProcesos_Procesos_Actividades`
--

CREATE TABLE `gProcesos_Procesos_Actividades` (
  `id` int(11) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `idProceso` int(11) NOT NULL,
  `Nombre` longtext NOT NULL,
  `Recursos` longtext NOT NULL,
  `Insumos` longtext NOT NULL,
  `RSST` longtext NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `gProcesos_Procesos_Actividades`
--

INSERT INTO `gProcesos_Procesos_Actividades` (`id`, `idEmpresa`, `idProceso`, `Nombre`, `Recursos`, `Insumos`, `RSST`, `idUsuario`, `fechaCargue`) VALUES
(1, 1, -3, '123', '456789', '789', '012', 1, '2017-08-20 01:38:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gProcesos_Procesos_Info`
--

CREATE TABLE `gProcesos_Procesos_Info` (
  `id` int(11) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `idProceso` int(11) NOT NULL,
  `Objetivo` longtext NOT NULL,
  `idResponsable` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `gProcesos_Procesos_Info`
--

INSERT INTO `gProcesos_Procesos_Info` (`id`, `idEmpresa`, `idProceso`, `Objetivo`, `idResponsable`, `idUsuario`, `fechaCargue`) VALUES
(3, 1, -3, '123', -1, 1, '2017-08-20 00:40:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gProcesos_Procesos_Personal`
--

CREATE TABLE `gProcesos_Procesos_Personal` (
  `id` int(11) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `idProceso` int(11) NOT NULL,
  `idCargo` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `gProcesos_Procesos_Personal`
--

INSERT INTO `gProcesos_Procesos_Personal` (`id`, `idEmpresa`, `idProceso`, `idCargo`, `idUsuario`, `fechaCargue`) VALUES
(5, 1, -3, -2, 1, '2017-08-20 02:32:06'),
(4, 1, -3, -1, 1, '2017-08-20 02:31:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gProcesos_Procesos_Riesgos`
--

CREATE TABLE `gProcesos_Procesos_Riesgos` (
  `id` int(11) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `idProceso` int(11) NOT NULL,
  `idRiesgo` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `gProcesos_Procesos_Riesgos`
--

INSERT INTO `gProcesos_Procesos_Riesgos` (`id`, `idEmpresa`, `idProceso`, `idRiesgo`, `idUsuario`, `fechaCargue`) VALUES
(1, 1, -3, 28, 1, '2017-08-19 17:47:56'),
(2, 1, -3, 22, 1, '2017-08-19 17:50:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Login`
--

CREATE TABLE `Login` (
  `idLogin` int(11) NOT NULL,
  `Usuario` varchar(45) NOT NULL,
  `Clave` varchar(45) NOT NULL,
  `Estado` varchar(45) NOT NULL,
  `idEmpresa` int(11) DEFAULT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Login`
--

INSERT INTO `Login` (`idLogin`, `Usuario`, `Clave`, `Estado`, `idEmpresa`, `fechaCargue`) VALUES
(1, 'admin', 'dab4ec27e4772948284b13606a5a61a9', 'Activo', 1, '2017-02-02 05:20:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Perfiles`
--

CREATE TABLE `Perfiles` (
  `idPerfil` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Perfiles`
--

INSERT INTO `Perfiles` (`idPerfil`, `Nombre`) VALUES
(1, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Perfiles_hasnot_Funciones`
--

CREATE TABLE `Perfiles_hasnot_Funciones` (
  `idPerfil` int(11) NOT NULL,
  `idFuncion` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Archivos`
--
ALTER TABLE `Archivos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `confRiesgos`
--
ALTER TABLE `confRiesgos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `confRiesgos_Clasificacion`
--
ALTER TABLE `confRiesgos_Clasificacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `datosUsuarios`
--
ALTER TABLE `datosUsuarios`
  ADD PRIMARY KEY (`idLogin`);

--
-- Indices de la tabla `Empresas`
--
ALTER TABLE `Empresas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Funciones`
--
ALTER TABLE `Funciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gHumana_Cargos`
--
ALTER TABLE `gHumana_Cargos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gHumana_MatrizEPP`
--
ALTER TABLE `gHumana_MatrizEPP`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Prefijo` (`Prefijo`);

--
-- Indices de la tabla `gHumana_Organigrama_Diagrama`
--
ALTER TABLE `gHumana_Organigrama_Diagrama`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gHumana_Personal`
--
ALTER TABLE `gHumana_Personal`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gProcesos_Mapa_Diagrama`
--
ALTER TABLE `gProcesos_Mapa_Diagrama`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gProcesos_Procesos`
--
ALTER TABLE `gProcesos_Procesos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gProcesos_Procesos_Actividades`
--
ALTER TABLE `gProcesos_Procesos_Actividades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gProcesos_Procesos_Info`
--
ALTER TABLE `gProcesos_Procesos_Info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gProcesos_Procesos_Info_key` (`idEmpresa`,`idProceso`);

--
-- Indices de la tabla `gProcesos_Procesos_Personal`
--
ALTER TABLE `gProcesos_Procesos_Personal`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gProcesos_Procesos_Riesgos`
--
ALTER TABLE `gProcesos_Procesos_Riesgos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Login`
--
ALTER TABLE `Login`
  ADD PRIMARY KEY (`idLogin`);

--
-- Indices de la tabla `Perfiles`
--
ALTER TABLE `Perfiles`
  ADD PRIMARY KEY (`idPerfil`);

--
-- Indices de la tabla `Perfiles_hasnot_Funciones`
--
ALTER TABLE `Perfiles_hasnot_Funciones`
  ADD UNIQUE KEY `idPerfil` (`idPerfil`,`idFuncion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Archivos`
--
ALTER TABLE `Archivos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `confRiesgos`
--
ALTER TABLE `confRiesgos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT de la tabla `confRiesgos_Clasificacion`
--
ALTER TABLE `confRiesgos_Clasificacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `Empresas`
--
ALTER TABLE `Empresas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `Funciones`
--
ALTER TABLE `Funciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `gHumana_Cargos`
--
ALTER TABLE `gHumana_Cargos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `gHumana_MatrizEPP`
--
ALTER TABLE `gHumana_MatrizEPP`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `gHumana_Organigrama_Diagrama`
--
ALTER TABLE `gHumana_Organigrama_Diagrama`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `gHumana_Personal`
--
ALTER TABLE `gHumana_Personal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `gProcesos_Mapa_Diagrama`
--
ALTER TABLE `gProcesos_Mapa_Diagrama`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `gProcesos_Procesos`
--
ALTER TABLE `gProcesos_Procesos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;
--
-- AUTO_INCREMENT de la tabla `gProcesos_Procesos_Actividades`
--
ALTER TABLE `gProcesos_Procesos_Actividades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `gProcesos_Procesos_Info`
--
ALTER TABLE `gProcesos_Procesos_Info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `gProcesos_Procesos_Personal`
--
ALTER TABLE `gProcesos_Procesos_Personal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `gProcesos_Procesos_Riesgos`
--
ALTER TABLE `gProcesos_Procesos_Riesgos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `Login`
--
ALTER TABLE `Login`
  MODIFY `idLogin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;
--
-- AUTO_INCREMENT de la tabla `Perfiles`
--
ALTER TABLE `Perfiles`
  MODIFY `idPerfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
