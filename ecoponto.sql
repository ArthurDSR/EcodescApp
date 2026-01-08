-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 08/01/2026 às 12:08
-- Versão do servidor: 8.4.7
-- Versão do PHP: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ecodesc`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `ecoponto`
--

DROP TABLE IF EXISTS `ecoponto`;
CREATE TABLE IF NOT EXISTS `ecoponto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `coordenadas` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `ecoponto`
--

INSERT INTO `ecoponto` (`id`, `coordenadas`, `nome`, `descricao`) VALUES
(18, '-19.4573076, -42.5689950', 'Academia B7 (Biovale)', 'Avenida Felipe dos Santos, Cidade Nobre, Barra Alegre, Ipatinga, Região Geográfica Imediata de Ipatinga, Região Metropolitana do Vale do Aço, Região Geográfica Intermediária de Ipatinga, Minas Gerais, Região Sudeste, 35162-369, Brasil'),
(17, '-19.4519363, -42.5810276', 'Biovale (Sede)', 'Avenida Sanitária, Limoeiro, Barra Alegre, Ipatinga, Região Geográfica Imediata de Ipatinga, Região Metropolitana do Vale do Aço, Região Geográfica Intermediária de Ipatinga, Minas Gerais, Região Sudeste, 35162-887, Brasil'),
(19, '-19.4659272, -42.5586596', 'Casa Ganja Cidade Nobre (Biovale)', 'Avenida Carlos Chagas, Cidade Nobre, Barra Alegre, Ipatinga, Região Geográfica Imediata de Ipatinga, Região Metropolitana do Vale do Aço, Região Geográfica Intermediária de Ipatinga, Minas Gerais, Região Sudeste, 35162-386, Brasil'),
(22, '-19.4608701, -42.5586115', 'Velha Amiga Tattoo (Biovale)', 'Rua João Monlevade, Cidade Nobre, Barra Alegre, Ipatinga, Região Geográfica Imediata de Ipatinga, Região Metropolitana do Vale do Aço, Região Geográfica Intermediária de Ipatinga, Minas Gerais, Região Sudeste, 35162-381, Brasil'),
(21, '-19.4633931, -42.5561387', 'Vaz Informática (Biovale)', 'Rua Dom Pedro I, Cidade Nobre, Barra Alegre, Ipatinga, Região Geográfica Imediata de Ipatinga, Região Metropolitana do Vale do Aço, Região Geográfica Intermediária de Ipatinga, Minas Gerais, Região Sudeste, 35164-544, Brasil'),
(23, '-19.4915630, -42.5268045', 'Tech Smart (Biovale)', 'Cariru, Ipatinga, Região Geográfica Imediata de Ipatinga, Região Metropolitana do Vale do Aço, Região Geográfica Intermediária de Ipatinga, Minas Gerais, Região Sudeste, Brasil'),
(24, '-19.5065924, -42.5737029', 'Arena da mata (Biovale)', 'Rua Palmeiras, Horto, Ipatinga, Região Geográfica Imediata de Ipatinga, Região Metropolitana do Vale do Aço, Região Geográfica Intermediária de Ipatinga, Minas Gerais, Região Sudeste, 35160-293, Brasil'),
(25, '-19.5389530, -42.6504281', 'CEFET MG Timóteo (Biovale)', 'CEFET-MG Campus Timóteo, 121, Rua 19 de Novembro, Bromélias, Centro, Timóteo, Região Geográfica Imediata de Ipatinga, Região Metropolitana do Vale do Aço, Região Geográfica Intermediária de Ipatinga, Minas Gerais, Região Sudeste, 31180-008, Brasil'),
(26, '-19.4583302, -42.5360218', 'RECICLEVALE (Reciclagem de plásticos)', 'Rua Itajaí, Caravelas, Ipatinga, Região Geográfica Imediata de Ipatinga, Região Metropolitana do Vale do Aço, Região Geográfica Intermediária de Ipatinga, Minas Gerais, Região Sudeste, 35164-243, Brasil'),
(27, '-19.4600391, -42.5342708', 'RECICLEVALE (Reciclagem de plásticos)', 'Rua Lorena, Caravelas, Ipatinga, Região Geográfica Imediata de Ipatinga, Região Metropolitana do Vale do Aço, Região Geográfica Intermediária de Ipatinga, Minas Gerais, Região Sudeste, 35164-300, Brasil'),
(28, '-19.4691628, -42.5332648', 'Sucateira Vale do Aço Ltda.', 'Rua Novo Hamburgo, Veneza, Ipatinga, Região Geográfica Imediata de Ipatinga, Região Metropolitana do Vale do Aço, Região Geográfica Intermediária de Ipatinga, Minas Gerais, Região Sudeste, 35164-251, Brasil'),
(29, '-19.4517117, -42.5824479', 'COOPCAVA (Recicláveis)', 'Rua Cereja, Limoeiro, Barra Alegre, Ipatinga, Região Geográfica Imediata de Ipatinga, Região Metropolitana do Vale do Aço, Região Geográfica Intermediária de Ipatinga, Minas Gerais, Região Sudeste, 35162-887, Brasil'),
(30, '-19.5029993, -42.5999663', 'Sucataria Vale do Aço / AMAP Moreira (Sucatas metálicas)', 'Av. Pres. Tancredo de Almeida Neves, 4644 - Caladinho, Cel. Fabriciano - MG, 35171-302\n'),
(31, '-19.5435644, -42.5884808', 'Sucataço (Sucatas Metálicas)', 'Avenida Pinheiro, Limoeiro, Timóteo, Região Geográfica Imediata de Ipatinga, Região Metropolitana do Vale do Aço, Região Geográfica Intermediária de Ipatinga, Minas Gerais, Região Sudeste, 35181-678, Brasil'),
(32, '-19.5404162, -42.6227297', 'ASCATI (Recicláveis ​​em geral)', 'Rua 161, Eldorado, Santa Maria, Timóteo, Região Geográfica Imediata de Ipatinga, Região Metropolitana do Vale do Aço, Região Geográfica Intermediária de Ipatinga, Minas Gerais, Região Sudeste, 35181-215, Brasil'),
(33, '-19.3955438, -42.5415571', 'ACASP (Recicláveis ​​em geral)', '35167-000, Santana do Paraíso, Região Geográfica Imediata de Ipatinga, Região Metropolitana do Vale do Aço, Região Geográfica Intermediária de Ipatinga, Minas Gerais, Região Sudeste, Brasil'),
(34, '-19.4122485, -42.5501385', 'Ecoferros Santana do Paraíso (Sucatas metálicas)', 'Avenida Minas Gerais, Industrial, Santana do Paraíso, Região Geográfica Imediata de Ipatinga, Região Metropolitana do Vale do Aço, Região Geográfica Intermediária de Ipatinga, Minas Gerais, Região Sudeste, 35167-000, Brasil');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
