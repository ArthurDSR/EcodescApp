-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jan 04, 2026 at 05:25 PM
-- Server version: 8.0.40
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecodesc`
--

-- --------------------------------------------------------

--
-- Table structure for table `avaliacao`
--

CREATE TABLE `avaliacao` (
  `id` bigint NOT NULL,
  `idEmpresa` bigint NOT NULL,
  `idUsuarioComum` bigint NOT NULL,
  `nota` tinyint NOT NULL,
  `comentario` varchar(1000) DEFAULT NULL,
  `dataAvaliacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `avaliacao`
--

INSERT INTO `avaliacao` (`id`, `idEmpresa`, `idUsuarioComum`, `nota`, `comentario`, `dataAvaliacao`) VALUES
(11, 1, 0, 4, 'asfsfasf', '2025-11-27 14:36:34'),
(12, 2, 0, 2, 'sfasfasfasf', '2025-11-27 14:38:39'),
(13, 3, 0, 4, 'muito boa!', '2025-11-27 14:47:52'),
(14, 4, 0, 4, 'asfasfasf', '2025-11-27 15:07:20'),
(15, 2, 0, 2, 'ruim', '2025-12-01 14:13:45'),
(16, 2, 0, 3, 'mediano', '2025-12-01 14:13:49');

-- --------------------------------------------------------

--
-- Table structure for table `categoria`
--

CREATE TABLE `categoria` (
  `id` int NOT NULL,
  `nome` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categoria`
--

INSERT INTO `categoria` (`id`, `nome`) VALUES
(1, 'Eletrônico'),
(2, 'Sustentável'),
(3, 'Reciclado');

-- --------------------------------------------------------

--
-- Table structure for table `chat_message`
--

CREATE TABLE `chat_message` (
  `id` bigint NOT NULL,
  `chat_room_id` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `produto_id` varchar(255) DEFAULT NULL,
  `recipient_id` varchar(255) DEFAULT NULL,
  `sender_id` varchar(255) DEFAULT NULL,
  `status` enum('READ','RECEIVED','SENT') DEFAULT NULL,
  `timestamp` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `chat_message`
--

INSERT INTO `chat_message` (`id`, `chat_room_id`, `content`, `produto_id`, `recipient_id`, `sender_id`, `status`, `timestamp`) VALUES
(5, '11_34cb8954-8337-4c12-9460-3ab5a4496dcc_9fb163ed-9613-4947-811d-0fe0f7cdd880', 'OI', '11', '9fb163ed-9613-4947-811d-0fe0f7cdd880', '34cb8954-8337-4c12-9460-3ab5a4496dcc', NULL, '2025-11-27 03:19:39.834080'),
(6, '11_34cb8954-8337-4c12-9460-3ab5a4496dcc_9fb163ed-9613-4947-811d-0fe0f7cdd880', 'QUANTO QUE TÁ O PRODUTO?', '11', '9fb163ed-9613-4947-811d-0fe0f7cdd880', '34cb8954-8337-4c12-9460-3ab5a4496dcc', NULL, '2025-11-27 03:21:03.005850'),
(7, '11_34cb8954-8337-4c12-9460-3ab5a4496dcc_9fb163ed-9613-4947-811d-0fe0f7cdd880', 'safasfasf', '11', '9fb163ed-9613-4947-811d-0fe0f7cdd880', '34cb8954-8337-4c12-9460-3ab5a4496dcc', NULL, '2025-11-27 03:41:48.110055'),
(8, '11_34cb8954-8337-4c12-9460-3ab5a4496dcc_9fb163ed-9613-4947-811d-0fe0f7cdd880', 'asfasfasf', '11', '9fb163ed-9613-4947-811d-0fe0f7cdd880', '34cb8954-8337-4c12-9460-3ab5a4496dcc', NULL, '2025-11-27 04:28:50.849991'),
(9, '11_34cb8954-8337-4c12-9460-3ab5a4496dcc_9fb163ed-9613-4947-811d-0fe0f7cdd880', 'andreyzao', '11', '9fb163ed-9613-4947-811d-0fe0f7cdd880', '34cb8954-8337-4c12-9460-3ab5a4496dcc', NULL, '2025-11-27 04:29:11.223770'),
(10, '11_9fb163ed-9613-4947-811d-0fe0f7cdd880_9fb163ed-9613-4947-811d-0fe0f7cdd880', 'asfFASFASF', '11', '9fb163ed-9613-4947-811d-0fe0f7cdd880', '9fb163ed-9613-4947-811d-0fe0f7cdd880', NULL, '2025-11-27 04:50:37.744469'),
(11, '11_9fb163ed-9613-4947-811d-0fe0f7cdd880_9fb163ed-9613-4947-811d-0fe0f7cdd880', 'ASF', '11', '9fb163ed-9613-4947-811d-0fe0f7cdd880', '9fb163ed-9613-4947-811d-0fe0f7cdd880', NULL, '2025-11-27 04:50:43.181170'),
(12, '11_9fb163ed-9613-4947-811d-0fe0f7cdd880_e5b6067e-70e3-46cc-8834-67d1a2f509a3', 'aiaiaiaiiaiaia', '11', '9fb163ed-9613-4947-811d-0fe0f7cdd880', 'e5b6067e-70e3-46cc-8834-67d1a2f509a3', NULL, '2025-11-27 07:38:49.394606'),
(13, '11_9fb163ed-9613-4947-811d-0fe0f7cdd880_e5b6067e-70e3-46cc-8834-67d1a2f509a3', 'wqqwrqwr', '11', '9fb163ed-9613-4947-811d-0fe0f7cdd880', 'e5b6067e-70e3-46cc-8834-67d1a2f509a3', NULL, '2025-11-27 07:39:13.286472'),
(14, '11_9fb163ed-9613-4947-811d-0fe0f7cdd880_e5b6067e-70e3-46cc-8834-67d1a2f509a3', 'asfasfasf', '11', '9fb163ed-9613-4947-811d-0fe0f7cdd880', 'e5b6067e-70e3-46cc-8834-67d1a2f509a3', NULL, '2025-11-27 07:39:55.622639'),
(15, '11_9fb163ed-9613-4947-811d-0fe0f7cdd880_d1e6f7f2-541f-452a-ba1f-4aff6f997ac9', 'safasf', '11', '9fb163ed-9613-4947-811d-0fe0f7cdd880', 'd1e6f7f2-541f-452a-ba1f-4aff6f997ac9', NULL, '2025-11-27 12:01:09.065319'),
(16, '12_0016d0a4-7d63-40e1-8ed8-361909dc92fb_6d655557-f910-49be-a262-1a3611ba66e8', 'oi', '12', '0016d0a4-7d63-40e1-8ed8-361909dc92fb', '6d655557-f910-49be-a262-1a3611ba66e8', NULL, '2025-12-01 11:11:08.937359'),
(17, '12_0016d0a4-7d63-40e1-8ed8-361909dc92fb_6d655557-f910-49be-a262-1a3611ba66e8', 'oi', '12', '0016d0a4-7d63-40e1-8ed8-361909dc92fb', '6d655557-f910-49be-a262-1a3611ba66e8', NULL, '2025-12-01 11:12:47.879818');

-- --------------------------------------------------------

--
-- Table structure for table `ecoponto`
--

CREATE TABLE `ecoponto` (
  `id` int NOT NULL,
  `coordenadas` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ecoponto`
--

INSERT INTO `ecoponto` (`id`, `coordenadas`, `nome`, `descricao`) VALUES
(16, '-19.5389261, -42.6354869', 'ana letro', 'E. E. Ana Letro Staacks, Rua 102, Cruzeirinho, Timóteo, Região Geográfica Imediata de Ipatinga, Região Metropolitana do Vale do Aço, Região Geográfica Intermediária de Ipatinga, Minas Gerais, Região Sudeste, 35180-060, Brasil'),
(15, '-19.5389530, -42.6504281', 'cefet', 'CEFET-MG Campus Timóteo, 121, Rua 19 de Novembro, Bromélias, Centro, Timóteo, Região Geográfica Imediata de Ipatinga, Região Metropolitana do Vale do Aço, Região Geográfica Intermediária de Ipatinga, Minas Gerais, Região Sudeste, 31180-008, Brasil');

-- --------------------------------------------------------

--
-- Table structure for table `empresas`
--

CREATE TABLE `empresas` (
  `id` bigint NOT NULL,
  `cnpj` varchar(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `document_path` varchar(255) NOT NULL,
  `status` enum('ACTIVE','PENDING','REJECTED') NOT NULL,
  `usuario_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `empresas`
--

INSERT INTO `empresas` (`id`, `cnpj`, `created_at`, `document_path`, `status`, `usuario_id`) VALUES
(2, '132132142132131321', '2025-11-27 10:44:17.279115', 'empresa_132132142132131321_1764251057278.pdf', 'ACTIVE', 'e25c72f9-e0e5-49f2-a915-f380e12df03d'),
(3, '111111111111111111', '2025-11-27 11:41:21.268719', 'empresa_111111111111111111_1764254481201.pdf', 'ACTIVE', 'b9754e79-b1a5-4e07-81db-9fdccbecfa42'),
(4, '111111111111111112', '2025-11-27 12:05:51.579968', 'empresa_111111111111111112_1764255951579.jpg', 'ACTIVE', 'fe32cd9a-5083-4a1e-992e-01775ebb138f');

-- --------------------------------------------------------

--
-- Table structure for table `novidade`
--

CREATE TABLE `novidade` (
  `id` int NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `texto` text NOT NULL,
  `dataPublicacao` date NOT NULL,
  `dataAlteracao` date DEFAULT NULL,
  `idAdministrador` bigint NOT NULL,
  `imagemCaminho` text,
  `imagemTipo` varchar(100) DEFAULT NULL,
  `imagemTamanho` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produto`
--

CREATE TABLE `produto` (
  `id` bigint NOT NULL,
  `usuario_id` varchar(255) NOT NULL,
  `categoria_id` bigint NOT NULL,
  `status` enum('PENDING','ACTIVE','REJECTED','INACTIVE') NOT NULL DEFAULT 'PENDING',
  `titulo` varchar(255) NOT NULL,
  `preco` decimal(10,2) DEFAULT NULL,
  `descricao` text,
  `imagemCaminho` varchar(500) DEFAULT NULL,
  `imagemTipo` varchar(100) DEFAULT NULL,
  `imagemTamanho` bigint DEFAULT NULL,
  `dataPublicacao` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `produto`
--

INSERT INTO `produto` (`id`, `usuario_id`, `categoria_id`, `status`, `titulo`, `preco`, `descricao`, `imagemCaminho`, `imagemTipo`, `imagemTamanho`, `dataPublicacao`) VALUES
(11, '9fb163ed-9613-4947-811d-0fe0f7cdd880', 2, 'ACTIVE', 'anunciante 1', 1234.00, 'A gáspea é dividida em funções suporte e resistência. Na região do calcanhar uma malha fechada entrega suporte, na região do antepé uma tela com sobreposição se encarrega de entregar toda resistência necessária para a atividade.', 'produto_20251127_030818_577ba5e1.jpeg', 'image/jpeg', 224528, '2025-11-27'),
(10, 'd1e6f7f2-541f-452a-ba1f-4aff6f997ac9', 2, 'ACTIVE', 'Tênis de Treino Masculino Under Armour Tribase Reps - Preto', 296.00, 'A gáspea é dividida em funções suporte e resistência. Na região do calcanhar uma malha fechada entrega suporte, na região do antepé uma tela com sobreposição se encarrega de entregar toda resistência necessária para a atividade.', 'produto_20251127_030339_f8c0a7a3.png', 'image/png', 510545, '2025-11-27'),
(12, '0016d0a4-7d63-40e1-8ed8-361909dc92fb', 1, 'ACTIVE', 'computador', 1234.00, 'asfasfasfasfasfasfasfasfasf', 'produto_20251127_121034_0aec795c.jpeg', 'image/jpeg', 37422, '2025-11-27');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id` varchar(255) NOT NULL,
  `login` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','BUSINESS','USER') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id`, `login`, `nome`, `password`, `role`) VALUES
('0016d0a4-7d63-40e1-8ed8-361909dc92fb', 'vick@gmail.com', 'vick', '$2a$10$exQDbz3vtfNxpvGRGpfjYOiiGnzXPyQqMg2LSQiTZkF2DdatN6tpq', 'ADMIN'),
('34cb8954-8337-4c12-9460-3ab5a4496dcc', 'andrey@gmail.com', 'andrey', '$2a$10$XlR2DwGciFRHBchU8wrQ/ew6Iu1yIew.6YP2dUH/5RhMj9tJnmtnK', 'ADMIN'),
('3a453b67-c4c1-4683-a943-eb114ba49697', 'andreyzacariascarvalho024@gmail.com', 'Andrey Zacarias', '$2a$10$Ho1WkDbzMXbyKrii8srBIOYd3shXq8qMwBq.OZOD2L5BzMFQfp.ZK', 'ADMIN'),
('497b95ae-b60a-46a0-b4c5-68076bd3ce61', 'arthurdsr313@gmail.com', 'Arthur Davi', '$2a$10$tXuzsmpqPRiiWai4cn179OLGXHZrArZjPTAjsKKQ2N1.4DtmTjHDK', 'ADMIN'),
('66120552-029a-483b-a5fd-38170fe2e33f', 'asada@gmail.com', 'andrey', '$2a$10$sFSEpG6746J5ZirzdkejtOg5GPO6d4eWq2pyZVJ1ngy42BenF/UBi', 'USER'),
('6d655557-f910-49be-a262-1a3611ba66e8', 'art@gmail.com', 'Arthur', '$2a$10$ba8jxDY1VB3QQFD9WwVUPe1BtdWSioifcbxapSGG1G/XjNez9qf2q', 'USER'),
('9fb163ed-9613-4947-811d-0fe0f7cdd880', 'anunciante1@gmail.com', 'anunciante1', '$2a$10$bhcEFtOmqeNfwktj8OrtC.5dhivAHCqx.SdoxmPPQ4t8wplTY96H6', 'USER'),
('b9754e79-b1a5-4e07-81db-9fdccbecfa42', 'bio@gmail.com', 'biovale', '$2a$10$AwG1S3D4Xd1TELdp50IipOwTkZkRVXUwfQLGm9cy83wVAa8PKhjRu', 'BUSINESS'),
('cd48f0fa-9524-4533-ab44-d8ca49bc7c39', 'biovale@gmail.com', 'biovale', '$2a$10$F9aX4JN6ci6rj2YpPj4UWuCRa/mD.y1ZlCn.F1riziPysEVBNrC3W', 'BUSINESS'),
('d1e6f7f2-541f-452a-ba1f-4aff6f997ac9', 'azc@gmail.com', 'andrey', '$2a$10$USHSsgKhHc120GzORUaWx.4gyXvUFODV8RqbkIuDuK2VEjmRcp.FW', 'ADMIN'),
('e0c0081a-4ed0-4c7c-813b-0954e5964d3c', 'ggdosteclados@gmail.com', 'Joao alface', '$2a$10$SKxUU9MW8Lq2cPVNbqVhVOt7QKf6H404DOVezAqVBK9K1BkTEOqe2', 'USER'),
('e25c72f9-e0e5-49f2-a915-f380e12df03d', 'ecometals@gmail.com', 'ecometals', '$2a$10$UtmMi.O2ORmodIHmOeVaGundWN06S7JHZonDBCuy.wN3VnM81PGrW', 'BUSINESS'),
('e5b6067e-70e3-46cc-8834-67d1a2f509a3', 'clara@gmail.com', 'clara', '$2a$10$nfTVYxb0IKXtiAKzpSlszee99smQcX43ICqGRyW6qjoT8f8JMAOgG', 'ADMIN'),
('f801a479-da46-452b-90a2-8ef2476bec01', 'asfasf@gmail.com', 'asfasfsaf', '$2a$10$zBGgRDRVRCpMFB3O.O1PpO35fJyCzQqxQBVFIWyRSQxSrF9LEEh.y', 'BUSINESS'),
('fe32cd9a-5083-4a1e-992e-01775ebb138f', 'empresa@gmail.com', 'empresacefet', '$2a$10$QZGgn/RFzJpsYieKmsVEY.Qq3gh0iP3F3o6Qru.vZdyx64oWJ5.Eq', 'BUSINESS');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `avaliacao`
--
ALTER TABLE `avaliacao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_avaliacao_empresa` (`idEmpresa`),
  ADD KEY `fk_avaliacao_usuario` (`idUsuarioComum`);

--
-- Indexes for table `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_message`
--
ALTER TABLE `chat_message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ecoponto`
--
ALTER TABLE `ecoponto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKdlxi0rufl6e9lwbo6fkcd5kp5` (`cnpj`),
  ADD UNIQUE KEY `UKa1bdrk80mj5pb9r8emyhgf82n` (`usuario_id`);

--
-- Indexes for table `novidade`
--
ALTER TABLE `novidade`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `avaliacao`
--
ALTER TABLE `avaliacao`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `chat_message`
--
ALTER TABLE `chat_message`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `ecoponto`
--
ALTER TABLE `ecoponto`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `novidade`
--
ALTER TABLE `novidade`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `produto`
--
ALTER TABLE `produto`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `empresas`
--
ALTER TABLE `empresas`
  ADD CONSTRAINT `FK55vicveb5mtcum77d7xrpe8e4` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
