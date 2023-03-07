-- -------------------------------------------------------------
-- TablePlus 5.3.0(486)
--
-- https://tableplus.com/
--
-- Database: nick
-- Generation Time: 2023-02-10 11:11:21.0030
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `table1`;
CREATE TABLE `table1` (
  `id` int NOT NULL AUTO_INCREMENT,
  `normalized_url` varchar(255) DEFAULT NULL,
  `downloaded_url` varchar(255) DEFAULT NULL,
  `folder_path` varchar(255) DEFAULT NULL,
  `file_id` varchar(255) DEFAULT NULL,
  `download_ok` varchar(255) DEFAULT NULL,
  `download_ko` varchar(255) DEFAULT NULL,
  `no_result` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_url` (`normalized_url`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `table1` (`id`, `normalized_url`, `downloaded_url`, `folder_path`, `file_id`, `download_ok`, `download_ko`, `no_result`) VALUES
(2, 'https://www.pagesjaunes.fr/annuaire/chercherlespros?quoiqui=Abris%20de%20jardin&ou=01', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'https://www.pagesjaunes.fr/annuaire/chercherlespros?quoiqui=Accessoires%20auto&ou=02', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'https://www.pagesjaunes.fr/pros/00505412', NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'https://www.pagesjaunes.fr/pros/60195996', NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'https://www.pagesjaunes.fr/annuaire/chercherlespros?quoiqui=Accessoires%20auto&ou=02&page=3', NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'https://www.pagesjaunes.fr/pros/detail?code_etablissement=00289409&code_localite=L07505600&code_rubrique=693780', NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'https://www.pagesjaunes.fr/pros/00289409', NULL, NULL, NULL, NULL, NULL, NULL);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;