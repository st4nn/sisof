
CREATE TABLE `gHumana_Cargos_Descripcion` (
  `id` int(11) NOT NULL,
  `idCargo` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Estudios` longtext NOT NULL,
  `Formacion` longtext NOT NULL,
  `Experiencia` longtext NOT NULL,
  `Responsabilidades` longtext NOT NULL,
  `RendicionDeCuentas` longtext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `gHumana_Cargos_Descripcion`
--
ALTER TABLE `gHumana_Cargos_Descripcion`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `gHumana_Cargos_Descripcion`
--
ALTER TABLE `gHumana_Cargos_Descripcion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;COMMIT;


ALTER TABLE `gHumana_Cargos_Descripcion` ADD UNIQUE `kGHumana_Cargos_Descripcion` (`idCargo`, `idEmpresa`);


--
-- Estructura de tabla para la tabla `gHumana_EntregaEPP`
--

CREATE TABLE `gHumana_EntregaEPP` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `idEmpresa` int(11) NOT NULL,
  `Proyecto` varchar(255) NOT NULL,
  `Talla` varchar(15) NOT NULL,
  `Cantidad` float NOT NULL,
  `idPersonal` int(11) NOT NULL,
  `idEPP` int(11) NOT NULL,
  `fechaEntrega` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `gHumana_EntregaEPP`
--
ALTER TABLE `gHumana_EntregaEPP`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `gHumana_EntregaEPP`
--
ALTER TABLE `gHumana_EntregaEPP`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;COMMIT;


--
-- Estructura de tabla para la tabla `gHumana_Cargos_has_EPP`
--

CREATE TABLE `gHumana_Cargos_has_EPP` (
  `id` int(11) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idCargo` int(11) NOT NULL,
  `idEPP` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `gHumana_Cargos_has_EPP`
--
ALTER TABLE `gHumana_Cargos_has_EPP`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `gHumana_Cargos_has_EPP`
--
ALTER TABLE `gHumana_Cargos_has_EPP`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;COMMIT;

ALTER TABLE `gHumana_Cargos_has_EPP` ADD UNIQUE (`idEmpresa`, `idCargo`, `idEPP`);




/*-- ---------------------------------------------------------- ---------------------------------------------------------- --------------------------------------------------------
20170911
 */

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mRiesgos_Matriz`
--

CREATE TABLE `mRiesgos_Matriz` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `fechaCargue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idActividad` int(11) NOT NULL,
  `Rutinario` varchar(5) NOT NULL,
  `Descripcion` varchar(80) NOT NULL,
  `Clasificacion` varchar(220) NOT NULL,
  `EfectosPosibles` longtext NOT NULL,
  `Tipo` varchar(15) NOT NULL,
  `Control` longtext NOT NULL,
  `NivelDeDeficiencia` int(11) NOT NULL,
  `NivelDeExposicion` int(11) NOT NULL,
  `NivelDeProbabilidad` int(11) NOT NULL,
  `InterpretacionDeProbabilidad` varchar(20) NOT NULL,
  `NivelDeConsecuencia` int(11) NOT NULL,
  `NivelDeRiesgo` double NOT NULL,
  `iNivelDeRiesgo` varchar(5) NOT NULL,
  `aNivelDeRiesgo` varchar(55) NOT NULL,
  `NroExpuestos` int(11) NOT NULL,
  `PeorConsecuecia` longtext NOT NULL,
  `RequisitoLegal` varchar(5) NOT NULL,
  `MedidasDeIntervencion` longtext NOT NULL,
  `TipoMedida` varchar(65) NOT NULL,
  `Programa` varchar(45) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `mRiesgos_Matriz`
--
ALTER TABLE `mRiesgos_Matriz`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `mRiesgos_Matriz`
--
ALTER TABLE `mRiesgos_Matriz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;