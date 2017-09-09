
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