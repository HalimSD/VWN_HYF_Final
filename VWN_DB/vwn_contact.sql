-- MySQL dump 10.13  Distrib 5.7.12, for Win32 (AMD64)
--
-- Host: 127.0.0.1    Database: vwn
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `web` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `org_id` int(11) NOT NULL,
  `post_code` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `house_number` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`,`org_id`),
  KEY `fk_contact_org_idx` (`org_id`),
  CONSTRAINT `fk_contact_org` FOREIGN KEY (`org_id`) REFERENCES `org` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2054 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES 
(2014,'0031688999777','info@hackyourfuture.net','http://www.hackyourfuture.net/',DEFAULT,DEFAULT,1014,'1017 CB','Amsterdam','504'),
(2015,'0031677446688','info@global-workforce.nl','https://www.global-workforce.nl/pages/workforce/Home',DEFAULT,DEFAULT,1015,'1012 GH','Amsterdam','2'),
(2016,'0031677446688','info@refugeestartforce.eu','https://refugeestartforce.eu/',DEFAULT,DEFAULT,1016,'3512 JE','Utrecht','13'),
(2017,'0031677446688','info@refugeestartforce.eu','https://refugeestartforce.eu/',DEFAULT,DEFAULT,1016,'5611 CH','Eindhoven','55'),
(2018,'0031205231100','info@humanitas.nl','https://www.humanitas.nl/programmas/taalmaatjes/',DEFAULT,DEFAULT,1017,'1017 WS','Amsterdam','4'),
(2019,'0031205231100','info@humanitas.nl','https://www.humanitas.nl/programmas/taalmaatjes/',DEFAULT,DEFAULT,1017,'7513 HJ','Enschede','259'),
(2020,'0031206272408 ','askv@dds.nl','http://www.askv.nl/',DEFAULT,DEFAULT,1018,'1052 HN','Amsterdam','111'),
(2021,'0031206272408 ','askv@dds.nl','http://www.askv.nl/',DEFAULT,DEFAULT,1018,'6085 AB','Horn','41'),
(2022,'0031206272408 ','askv@dds.nl','http://www.askv.nl/',DEFAULT,DEFAULT,1018,'9727 CC','Groningen','61'),
(2023,'0031638251938','info@restaurantsyr.nl','http://restaurantsyr.nl/',DEFAULT,DEFAULT,1019,'3512 PE','Utrecht','71'),
(2024,'0031638251938','info@restaurantsyr.nl','http://restaurantsyr.nl/',DEFAULT,DEFAULT,1019,'3262 HK','Oud-Beijerland','1'),
(2025,'0031673947173','info@refugeecompany.com','https://www.refugeecompany.com/',DEFAULT,DEFAULT,1020,'1096 AN','Amsterdam','1'),
(2026,'0031673947173','info@refugeecompany.com','https://www.refugeecompany.com/',DEFAULT,DEFAULT,1020,'8932 GN','Leeuwarden','15'),
(2027,'0031673947173','info@refugeecompany.com','https://www.refugeecompany.com/',DEFAULT,DEFAULT,1020,'7602 HN','Almelo','9'),
(2028,'0031673958263','info@takecarebnb.com','https://www.takecarebnb.com/',DEFAULT,DEFAULT,1021,'1018 DP','Amsterdam','18'),
(2029,'0031673958263','info@takecarebnb.com','https://www.takecarebnb.com/',DEFAULT,DEFAULT,1021,'4331 TV','Middelburg','33'),
(2030,'0031649582018','info@delitelabs.com','http://delitelabs.com/',DEFAULT,DEFAULT,1022,'1092 CK','Amsterdam','2'),
(2031,'0031649582018','info@delitelabs.com','http://delitelabs.com/',DEFAULT,DEFAULT,1022,'6301','Valkenburg','22'),
(2032,'0031649582018','info@delitelabs.com','http://delitelabs.com/',DEFAULT,DEFAULT,1022,'9673 HP','Winschoten','31'),
(2033,'0031673810543','info@futurelearn.com','https://www.futurelearn.com/courses/dutch',DEFAULT,DEFAULT,1023,'5049 BR','Tilburg','192'),
(2034,'0031673810543','info@futurelearn.com','https://www.futurelearn.com/courses/dutch',DEFAULT,DEFAULT,1023,'8253 CD','Dronten','3'),
(2035,'0031641294061','info@mobile-educator.org','http://mobile-educator.org/',DEFAULT,DEFAULT,1024,'2313 ES','Leiden','21'),
(2036,'0031641294061','info@mobile-educator.org','http://mobile-educator.org/',DEFAULT,DEFAULT,1024,'8748 GG','Witmarsum','5'),
(2037,'0031638451016','info@new-bees.org','https://www.new-bees.org/',DEFAULT,DEFAULT,1025,'1506 MZ','Zaandam','3'),
(2038,'0031638451016','info@new-bees.org','https://www.new-bees.org/',DEFAULT,DEFAULT,1025,'7122 TA','Aalten','65'),
(2039,'0031614793312','info@yallafoundation.nl','http://yallafoundation.nl/',DEFAULT,DEFAULT,1026,'6541 BA','Nijmegen','150'),
(2040,'0031614793312','info@yallafoundation.nl','http://yallafoundation.nl/',DEFAULT,DEFAULT,1026,'8019 AR','Zwolle','18A'),
(2041,'0031637481524','info@openembassy.nl','http://www.openembassy.nl/',DEFAULT,DEFAULT,1027,'8225','Lelystad','33'),
(2042,'0031637481524','info@openembassy.nl','http://www.openembassy.nl/',DEFAULT,DEFAULT,1027,'7007 AV','Doetinchem','43'),
(2043,'0031624879501','info@syriersgezond.nl','https://www.gezondinnederland.info/',DEFAULT,DEFAULT,1028,'7944 XX','Meppel','55'),
(2044,'0031624879501','info@syriersgezond.nl','https://www.gezondinnederland.info/',DEFAULT,DEFAULT,1028,'3315 AJ','Dordrecht','213');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-29  3:34:08
