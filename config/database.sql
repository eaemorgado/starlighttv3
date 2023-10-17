DROP DATABASE IF exists starlight ;
CREATE DATABASE starlight;
USE starlight;

CREATE TABLE tipo_usuario (
  id_tipo_usuario INT PRIMARY KEY, 
  tipo VARCHAR(25) NOT NULL,
  descricao VARCHAR(155) NOT NULL,
  status_tipo INT DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE usuario (
  id_usuario INT PRIMARY KEY, 
  nome VARCHAR(45) NOT NULL,
  usuario VARCHAR(45) NOT NULL,
  email VARCHAR(60) NOT NULL,
  senha VARCHAR(50) NOT NULL,
  confirmar VARCHAR(50) NOT NULL,
  tel VARCHAR(14),  
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_tipo INT, 
  FOREIGN KEY (id_tipo) REFERENCES tipo_usuario(id_tipo_usuario) 
);

CREATE TABLE fornecedor (
   id_fornecedor INT PRIMARY KEY,
   nome VARCHAR(45) NOT NULL,
   celular VARCHAR(14),
   empresa_IDempresa VARCHAR(45) NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE Produtos (
  id_produtos INT PRIMARY KEY,
  categoria VARCHAR(45) NOT NULL,
  marca VARCHAR(14) NOT NULL,
  quantidade INT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Noticia (
  id_noticia INT PRIMARY KEY, 
  data_hora VARCHAR(45) NOT NULL,
  fonte VARCHAR(14) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE restaurante (
  id_restaurante INT PRIMARY KEY,
  endereço VARCHAR(45) NOT NULL, 
  dono VARCHAR(14) NOT NULL,
  tema VARCHAR(14) NOT NULL,
  usuario_IDusuario VARCHAR(45) NOT NULL, 
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE avaliação (
  id_avaliacao INT PRIMARY KEY, 
  data_hora VARCHAR(45) NOT NULL,
  dono VARCHAR(14) NOT NULL,
  usuario_IDusuario VARCHAR(45) NOT NULL, 
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE eventos (
  id_evento INT PRIMARY KEY,
  data_hora VARCHAR(45) NOT NULL, 
  localizacao VARCHAR(14) NOT NULL, 
  atracao VARCHAR(45) NOT NULL, 
  usuario_IDusuario VARCHAR(45) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
