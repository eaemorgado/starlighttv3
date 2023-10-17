DROP DATABASE IF exists starlight ;
CREATE DATABASE starlight;
USE starlight;

DROP TABLE IF EXISTS tipo_usuario;

CREATE TABLE tipo_usuario (
  id_tipo int(11) primary key,
  tipo varchar(25) DEFAULT NULL,
  descricao varchar(155) DEFAULT NULL,
  status_tipo int DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
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

LOCK TABLES usuario WRITE;

INSERT INTO usuario (id_usu, nome_usu, user_usu,email_usu, senha_usu, confirmar_usu,tel_usu, created_at_usu) VALUES
();

CREATE TABLE fornecedor (
  id_fornecedor int primary key,
  nome varchar(45) NOT NULL,
  celular varchar(14) DEFAULT NULL,
  empresa_IDempresa varchar(45) NOT NULL
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_tipo int(11) foreign key 
);

LOCK TABLES fornecedor WRITE;

INSERT INTO usuario (id_fornecedor,nome,celular,created_at_fornecedor) VALUES

CREATE TABLE Produtos (
  id_produtos int primary key,
  categoria varchar(45) NOT NULL,
  marca varchar(14) NOT NULL,
  quantidade varchar(4500) NOT NULL
  valor varchar(45) NOT NULL
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_tipo int(11) foreign key 
)

 INSERT INTO usuario (id_produtos,categoria,marca,quantidade,valor) VALUES

 LOCK TABLES Produtos WRITE;

CREATE TABLE Noticia (
  id_noticia int primary key,
  data_hora varchar(45) NOT NULL,
  fonte varchar(14) NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_tipo int(11) foreign key 
)

INSERT INTO usuario (id_noticia,data_hora,fonte) VALUES

LOCK TABLES Noticia WRITE;

CREATE TABLE restaurante (
  id_restaurante int primary key,
  endereço varchar(45) NOT NULL,
  dono varchar(14) NOT NULL,
  tema varchar(14) NOT NULL,
  usuario_IDusuario varchar(45) NOT NULL
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_tipo int(11) foreign key 
)

INSERT INTO usuario (id_restaurante,endereço,dono,tema,usuario_IDusuario) VALUES

LOCK TABLES restaurante WRITE;

CREATE TABLE avaliação (
  id_avaliação int primary key,
  data_hora varchar(45) NOT NULL,
  dono varchar(14) NOT NULL,
  usuario_IDusuario varchar (45) NOT NULL
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_tipo int(11) foreign key 
)

LOCK TABLES avaliação WRITE;

CREATE TABLE eventos (
  id_evento int primary key,
  data_hora varchar(45) NOT NULL, 
  localização varchar(14) NOT NULL,
  atração varchar (45) NOT NULL
  usuario_IDusuario varchar (45) NOT NULL
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_tipo int(11) foreign key 
)  

LOCK TABLES eventos a WRITE;