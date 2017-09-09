
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


ALTER TABLE `sisof`.`gHumana_Cargos_Descripcion` ADD UNIQUE `kGHumana_Cargos_Descripcion` (`idCargo`, `idEmpresa`);