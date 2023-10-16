DROP DATABASE IF exists `starlight` ;
CREATE DATABASE `starlight`;
USE `starlight`;

DROP TABLE IF EXISTS `tipo_usuario`;

CREATE TABLE `tipo_usuario` (
  id_tipo int(11) primary key,
  tipo varchar(25) DEFAULT NULL,
  descricao varchar(155) DEFAULT NULL,
  status_tipo int DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  id int primary key,
  nome varchar(45) NOT NULL,
  user varchar(45) NOT NULL,
  email varchar(60) NOT NULL,
  senha varchar(50) NOT NULL,
  confirmar varchar(50) NOT NULL,
  tel varchar(14) DEFAULT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_tipo int(11) foreign key 
);

LOCK TABLES `usuario` WRITE;

INSERT INTO `usuario` (`id_usu`, `nome_usu`, `user_usu`,`email_usu`, `senha_usu`, `confirmar_usu`,`tel_usu`, `created_at_usu`) VALUES
();