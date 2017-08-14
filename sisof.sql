-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 14-08-2017 a las 10:50:08
-- Versión del servidor: 5.6.35
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sisoftwa_app`
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
  `idUsuario` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `Empresas`
--
ALTER TABLE `Empresas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `Funciones`
--
ALTER TABLE `Funciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `gHumana_Cargos`
--
ALTER TABLE `gHumana_Cargos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `gHumana_MatrizEPP`
--
ALTER TABLE `gHumana_MatrizEPP`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `gHumana_Organigrama_Diagrama`
--
ALTER TABLE `gHumana_Organigrama_Diagrama`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `gProcesos_Mapa_Diagrama`
--
ALTER TABLE `gProcesos_Mapa_Diagrama`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `gProcesos_Procesos`
--
ALTER TABLE `gProcesos_Procesos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;
--
-- AUTO_INCREMENT de la tabla `Login`
--
ALTER TABLE `Login`
  MODIFY `idLogin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;
--
-- AUTO_INCREMENT de la tabla `Perfiles`
--
ALTER TABLE `Perfiles`
  MODIFY `idPerfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
