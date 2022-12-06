-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-12-2022 a las 11:48:02
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `2233_garciaalex`
--
CREATE DATABASE IF NOT EXISTS `2233_garciaalex` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `2233_garciaalex`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `Id` int(11) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `pass` text NOT NULL,
  `nombre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_admin`
--

INSERT INTO `tbl_admin` (`Id`, `correo`, `pass`, `nombre`) VALUES
(1, 'admin@admin.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'admin\r\n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_camarero`
--

CREATE TABLE `tbl_camarero` (
  `id_camarero` int(11) NOT NULL,
  `nombre_camarero` varchar(20) NOT NULL,
  `Apellido` varchar(30) NOT NULL,
  `correo_camarero` varchar(50) NOT NULL,
  `contra_camarero` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_camarero`
--

INSERT INTO `tbl_camarero` (`id_camarero`, `nombre_camarero`, `Apellido`, `correo_camarero`, `contra_camarero`) VALUES
(2, 'Alex', 'Garcia', 'alex@gmail.com', '7c222fb2927d828af22f592134e8932480637c0d'),
(3, 'Paco', 'Suarez', 'paco@gmail.com', '7c222fb2927d828af22f592134e8932480637c0d'),
(4, 'Juan', 'Carlos', 'juan@gmail.com', '7c222fb2927d828af22f592134e8932480637c0d'),
(6, 'Raul', 'Serena', 'raul@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_mantenimiento`
--

CREATE TABLE `tbl_mantenimiento` (
  `id_mantenimiento` int(11) NOT NULL,
  `hora_incidencia` varchar(20) NOT NULL,
  `correo_mantenimiento` varchar(40) NOT NULL,
  `id_sala` int(11) NOT NULL,
  `id_mesa` int(11) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_mesa`
--

CREATE TABLE `tbl_mesa` (
  `id_mesa` int(11) NOT NULL,
  `numero_mesa` int(2) NOT NULL,
  `estado_mesa` enum('Disponible','Mantenimiento','Ocupado','Reservado') NOT NULL,
  `sillas_mesa` int(2) NOT NULL,
  `id_sala` int(11) NOT NULL,
  `foto_mesa` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_mesa`
--

INSERT INTO `tbl_mesa` (`id_mesa`, `numero_mesa`, `estado_mesa`, `sillas_mesa`, `id_sala`, `foto_mesa`) VALUES
(1, 14, 'Disponible', 2, 2, 'mesa1.jpg'),
(2, 12, 'Disponible', 4, 2, 'mesa2.webp'),
(3, 666, 'Disponible', 6, 3, 'mesa3.jpg'),
(4, 4, 'Disponible', 4, 4, 'pokemon.webp'),
(5, 5, 'Disponible', 4, 1, 'mesa5.webp'),
(6, 6, 'Disponible', 4, 1, 'mesa6.jpg'),
(7, 7, 'Disponible', 2, 1, 'mesa7.jpg'),
(8, 8, 'Disponible', 6, 1, 'mesa8.jpg'),
(9, 9, 'Disponible', 4, 1, 'mesa9.jpg'),
(10, 10, 'Disponible', 4, 2, 'mesa10.webp'),
(11, 11, 'Disponible', 2, 2, 'mesa11.jpg'),
(12, 12, 'Disponible', 4, 2, 'mesa12.jpg'),
(13, 13, 'Disponible', 2, 2, 'mesa13.jpg'),
(14, 14, 'Disponible', 4, 2, 'mesa14.jpg'),
(15, 15, 'Disponible', 4, 2, 'mesa15.jpg'),
(16, 16, 'Disponible', 2, 2, 'mesa16.jpg'),
(17, 17, 'Disponible', 4, 2, 'mesa17.jpg'),
(18, 18, 'Disponible', 4, 2, 'mesa18.jpg'),
(19, 1, 'Disponible', 6, 3, 'mesa19.jpg'),
(20, 2, 'Disponible', 4, 3, 'mesa20.jpg'),
(21, 3, 'Disponible', 2, 3, 'mesa21.jpg'),
(22, 4, 'Disponible', 4, 3, 'mesa22.webp'),
(23, 5, 'Disponible', 4, 3, 'mesa23.jpg'),
(24, 6, 'Disponible', 2, 3, 'mesa24.jpg'),
(25, 7, 'Disponible', 4, 3, 'mesa25.jpg'),
(26, 8, 'Disponible', 4, 3, 'mesa26.jpg'),
(27, 9, 'Disponible', 4, 3, 'mesa27.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_personal_man`
--

CREATE TABLE `tbl_personal_man` (
  `Id` int(11) NOT NULL,
  `Nombre` text NOT NULL,
  `Apellido` text NOT NULL,
  `Correo` text NOT NULL,
  `pass` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_personal_man`
--

INSERT INTO `tbl_personal_man` (`Id`, `Nombre`, `Apellido`, `Correo`, `pass`) VALUES
(1, 'Freddys', 'Ramirezsda', 'fredddsay@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220'),
(3, 'Luis', 'Alberto', 'luis@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220'),
(4, 'Roberto', 'Giraldez', 'roberto@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220'),
(5, 'Andrea', 'Ramirez', 'andrea@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220'),
(8, 'Manolo', 'Lama', 'furbo@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_registro`
--

CREATE TABLE `tbl_registro` (
  `id_registro` int(11) NOT NULL,
  `fecha_inicio_registro` text NOT NULL,
  `fecha_final_registro` text NOT NULL,
  `num_personas_registro` int(2) NOT NULL,
  `id_camarero` int(11) NOT NULL,
  `id_sala` int(11) NOT NULL,
  `id_mesa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_registro`
--

INSERT INTO `tbl_registro` (`id_registro`, `fecha_inicio_registro`, `fecha_final_registro`, `num_personas_registro`, `id_camarero`, `id_sala`, `id_mesa`) VALUES
(17, '04/12/22 12:40:51 PM', '04/12/22 12:40:53 PM', 2, 2, 1, 2),
(18, '04/12/22 12:41:10 PM', '04/12/22 12:41:12 PM', 2, 2, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_reserva`
--

CREATE TABLE `tbl_reserva` (
  `Id` int(11) NOT NULL,
  `hora_inicio` time NOT NULL,
  `mesa` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora_fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_sala`
--

CREATE TABLE `tbl_sala` (
  `id_sala` int(11) NOT NULL,
  `nombre_sala` varchar(20) NOT NULL,
  `tipo_sala` varchar(30) NOT NULL,
  `desc_sala` text NOT NULL,
  `foto` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_sala`
--

INSERT INTO `tbl_sala` (`id_sala`, `nombre_sala`, `tipo_sala`, `desc_sala`, `foto`) VALUES
(1, 'Sala Gato', 'Gato', 'miau miau\r\n', 'gato.webp'),
(2, 'Sala Interior 2', 'Interior', 'Sala con mesas', 'sala_interior_2.jpg'),
(3, 'Sala Exterior 1', 'Exterior', 'Sala con mesas', 'sala_exterior_1.png'),
(4, 'Sala perro', 'Perro', 'guau guau', 'perro.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_user`
--

CREATE TABLE `tbl_user` (
  `Id` int(11) NOT NULL,
  `nombre_usuario` varchar(40) NOT NULL,
  `correo` varchar(40) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_user`
--

INSERT INTO `tbl_user` (`Id`, `nombre_usuario`, `correo`, `password`) VALUES
(3, 'Alex', 'alex@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `tbl_camarero`
--
ALTER TABLE `tbl_camarero`
  ADD PRIMARY KEY (`id_camarero`);

--
-- Indices de la tabla `tbl_mantenimiento`
--
ALTER TABLE `tbl_mantenimiento`
  ADD PRIMARY KEY (`id_mantenimiento`),
  ADD KEY `id_sala` (`id_sala`),
  ADD KEY `fk_mantenimiento_mesa` (`id_mesa`);

--
-- Indices de la tabla `tbl_mesa`
--
ALTER TABLE `tbl_mesa`
  ADD PRIMARY KEY (`id_mesa`),
  ADD KEY `id_sala` (`id_sala`);

--
-- Indices de la tabla `tbl_personal_man`
--
ALTER TABLE `tbl_personal_man`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `tbl_registro`
--
ALTER TABLE `tbl_registro`
  ADD PRIMARY KEY (`id_registro`),
  ADD KEY `id_camarero` (`id_camarero`),
  ADD KEY `id_sala` (`id_sala`),
  ADD KEY `id_mesa` (`id_mesa`);

--
-- Indices de la tabla `tbl_reserva`
--
ALTER TABLE `tbl_reserva`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_usuario_reserva` (`usuario`),
  ADD KEY `fk_mesa_reserva` (`mesa`);

--
-- Indices de la tabla `tbl_sala`
--
ALTER TABLE `tbl_sala`
  ADD PRIMARY KEY (`id_sala`);

--
-- Indices de la tabla `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tbl_camarero`
--
ALTER TABLE `tbl_camarero`
  MODIFY `id_camarero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tbl_mantenimiento`
--
ALTER TABLE `tbl_mantenimiento`
  MODIFY `id_mantenimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tbl_mesa`
--
ALTER TABLE `tbl_mesa`
  MODIFY `id_mesa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `tbl_personal_man`
--
ALTER TABLE `tbl_personal_man`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tbl_registro`
--
ALTER TABLE `tbl_registro`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `tbl_reserva`
--
ALTER TABLE `tbl_reserva`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tbl_sala`
--
ALTER TABLE `tbl_sala`
  MODIFY `id_sala` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_mantenimiento`
--
ALTER TABLE `tbl_mantenimiento`
  ADD CONSTRAINT `fk_mantenimiento_mesa` FOREIGN KEY (`id_mesa`) REFERENCES `tbl_mesa` (`id_mesa`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_mantenimiento_sala` FOREIGN KEY (`id_sala`) REFERENCES `tbl_sala` (`id_sala`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_mesa`
--
ALTER TABLE `tbl_mesa`
  ADD CONSTRAINT `fk_mesa_sala` FOREIGN KEY (`id_sala`) REFERENCES `tbl_sala` (`id_sala`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_registro`
--
ALTER TABLE `tbl_registro`
  ADD CONSTRAINT `fk_registro_camarero` FOREIGN KEY (`id_camarero`) REFERENCES `tbl_camarero` (`id_camarero`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_registro_mesa` FOREIGN KEY (`id_mesa`) REFERENCES `tbl_mesa` (`id_mesa`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_registro_sala` FOREIGN KEY (`id_sala`) REFERENCES `tbl_sala` (`id_sala`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_reserva`
--
ALTER TABLE `tbl_reserva`
  ADD CONSTRAINT `fk_mesa_reserva` FOREIGN KEY (`mesa`) REFERENCES `tbl_mesa` (`id_mesa`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario_reserva` FOREIGN KEY (`usuario`) REFERENCES `tbl_user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
