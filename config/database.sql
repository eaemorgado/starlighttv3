
DROP DATABASE IF exists starlight ;
CREATE DATABASE starlight;
USE starlight;

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE usuarios (
	id INT PRIMARY KEY, 
	nome VARCHAR(200) NOT NULL,
	usuario VARCHAR(45) NOT NULL,
	email VARCHAR(60) NOT NULL,
	senha VARCHAR(50) NOT NULL
	);
    
LOCK TABLES `usuarios` WRITE;

INSERT INTO `usuarios` (`id`, `nome`,`usuario`,`email`, `senha`) VALUES
('1','Gabriel','eaemorgado','morgado@gmail.com','123456');
