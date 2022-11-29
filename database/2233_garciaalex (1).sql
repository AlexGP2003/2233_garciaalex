-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-11-2022 a las 18:45:34
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
(1, 'Raul', 'Gonzalez', 'camarero1@gmail.com', '7c222fb2927d828af22f592134e8932480637c0d'),
(2, 'Alex', 'Garcia', 'alex@gmail.com', '7c222fb2927d828af22f592134e8932480637c0d'),
(3, 'Paco', 'Suarez', 'paco@gmail.com', '7c222fb2927d828af22f592134e8932480637c0d'),
(4, 'Juan', 'Carlos', 'juan@gmail.com', '7c222fb2927d828af22f592134e8932480637c0d'),
(5, 'Maria', 'Perez', 'maria@gmail.com', '7c222fb2927d828af22f592134e8932480637c0d');

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

--
-- Volcado de datos para la tabla `tbl_mantenimiento`
--

INSERT INTO `tbl_mantenimiento` (`id_mantenimiento`, `hora_incidencia`, `correo_mantenimiento`, `id_sala`, `id_mesa`, `descripcion`) VALUES
(3, '14/11/22 05:40:53 PM', 'alex@gmail.com', 1, 5, 'Hola falla algo'),
(4, '14/11/22 06:10:40 PM', 'alex@gmail.com', 3, 19, ''),
(5, '14/11/22 06:12:09 PM', '', 3, 19, ''),
(7, '14/11/22 06:28:20 PM', 'a', 1, 2, 'sad'),
(8, '15/11/22 05:39:04 PM', 'alex@gmail.com', 3, 19, 'mesa rota');

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
(1, 1, 'Mantenimiento', 6, 1, 'mesa1.jpg'),
(2, 2, 'Disponible', 2, 1, 'mesa2.webp'),
(3, 3, 'Ocupado', 4, 1, 'mesa3.jpg'),
(4, 4, 'Reservado', 4, 1, 'mesa4.jpg'),
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
(1, 'Freddy', 'Ramirez', 'freddy@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220'),
(2, 'John', 'Ramirez', 'john@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220'),
(3, 'Luis', 'Alberto', 'luis@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220'),
(4, 'Roberto', 'Giraldez', 'roberto@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220'),
(5, 'Andrea', 'Ramirez', 'andrea@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220'),
(6, 'Funciona', 'porfa', 'porfa@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220'),
(7, 'xzcxc', 'xcczzc', 'aledasasdasdx@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220');

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
(2, '09/11/22 07:56:46 PM', '09/11/22 08:05:19 PM', 2, 1, 1, 1),
(3, '09/11/22 08:07:29 PM', '09/11/22 08:08:50 PM', 3, 1, 1, 1),
(4, '09/11/22 08:09:15 PM', '09/11/22 08:09:29 PM', 3, 1, 1, 1),
(5, '11/11/22 11:51:18 AM', '11/11/22 11:51:59 AM', 2, 1, 1, 1),
(6, '11/11/22 11:57:22 AM', '11/11/22 11:57:44 AM', 2, 1, 1, 1),
(7, '11/11/22 11:58:24 AM', '11/11/22 03:08:37 PM', 2, 1, 1, 1),
(8, '11/11/22 03:55:45 PM', '11/11/22 03:55:59 PM', 2, 1, 1, 1),
(9, '12/11/22 01:20:28 PM', '12/11/22 01:21:15 PM', 2, 1, 3, 23),
(10, '14/11/22 04:32:18 PM', '14/11/22 06:31:48 PM', 2, 1, 2, 10),
(11, '14/11/22 05:09:36 PM', '14/11/22 05:10:20 PM', 5, 1, 1, 3),
(12, '14/11/22 05:13:32 PM', '14/11/22 06:22:59 PM', 1, 1, 1, 4),
(13, '14/11/22 06:30:13 PM', '14/11/22 06:30:15 PM', 6, 1, 1, 4),
(14, '15/11/22 03:41:33 PM', '15/11/22 03:41:46 PM', 2, 1, 1, 1),
(15, '15/11/22 05:36:35 PM', '15/11/22 05:38:17 PM', 4, 1, 3, 19),
(16, '15/11/22 05:36:43 PM', '15/11/22 05:38:28 PM', 3, 1, 3, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_reserva`
--

CREATE TABLE `tbl_reserva` (
  `Id` int(11) NOT NULL,
  `hora` varchar(14) NOT NULL,
  `mesa` int(11) NOT NULL,
  `usuario` int(11) NOT NULL
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
(1, 'Sala Interior 1', 'Interior', 'Sala con mesas', 'sala_interior_1.jpg'),
(2, 'Sala Interior 2', 'Interior', 'Sala con mesas', 'sala_interior_2.jpg'),
(3, 'Sala Exterior 1', 'Exterior', 'Sala con mesas', 'sala_exterior_1.png');

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
(1, 'alex', 'alex@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220');

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
  MODIFY `id_camarero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tbl_mantenimiento`
--
ALTER TABLE `tbl_mantenimiento`
  MODIFY `id_mantenimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tbl_mesa`
--
ALTER TABLE `tbl_mesa`
  MODIFY `id_mesa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `tbl_personal_man`
--
ALTER TABLE `tbl_personal_man`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tbl_registro`
--
ALTER TABLE `tbl_registro`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `tbl_reserva`
--
ALTER TABLE `tbl_reserva`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_sala`
--
ALTER TABLE `tbl_sala`
  MODIFY `id_sala` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
