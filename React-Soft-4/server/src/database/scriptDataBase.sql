CREATE DATABASE IF NOT EXISTS `fegs-soft-react`;
USE `fegs-soft-react`;

CREATE TABLE IF NOT EXISTS `usuarios` (
    `id` INT AUTO_INCREMENT,
    `Nombre` VARCHAR(50) NOT NULL,
    `Correo` VARCHAR(50) NOT NULL,
    `Documento` VARCHAR(50) NOT NULL,
    `Clave` VARCHAR(50) NOT NULL,
    `rol` INT NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `usuarios` (`Nombre`, `Correo`, `Documento`, `Clave`, `rol`) VALUES
    ('User One', 'user1@example.com', '12345678', '1234123213', 2),
    ('User Two', 'user2@example.com', '87654321', '1234', 3),
    ('User Three', 'user3@example.com', '111222333', '1234', 3),
    ('User Four', 'user4@example.com', '444555666', '1234', 2);