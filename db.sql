-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: try2
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1-log

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
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'DELHI'),(2,'GURUGRAM'),(3,'BANGLORE');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_address`
--

DROP TABLE IF EXISTS `tb_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` text,
  `response` text,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_addr` int(11) DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_address`
--

LOCK TABLES `tb_address` WRITE;
/*!40000 ALTER TABLE `tb_address` DISABLE KEYS */;
INSERT INTO `tb_address` VALUES (1,'A1234','Lorem ipsum dolor sit amet','2019-05-28 18:22:04',NULL,NULL),(2,'12XC34','Lorem dolor sit amet','2019-05-28 18:22:20',NULL,NULL),(3,'8080','recteque contentiones his ut','2019-05-28 18:22:57',NULL,NULL),(4,'1111','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at velit sit amet sem laoreet efficitur non in urna. Fusce fringilla ipsum massa, ac tristique arcu varius eget. Maecenas vestibulum tristique nisi id fringilla. In elit odio, consectetur eget condimentum ut, egestas in nisi. Pellentesque aliquam nulla ac ex rutrum, et ullamcorper nulla aliquam. Aenean ac nulla ut velit vehicula lacinia sed eu odio. Donec egestas arcu tortor, ac euismod justo fermentum vitae. Morbi placerat ante vel efficitur tempus. Duis mollis feugiat finibus. Pellentesque varius et sapien laoreet varius. Donec eget neque elementum, euismod sem eu, vehicula felis. Nulla facilisi. Phasellus id turpis vitae diam pharetra efficitur. Morbi nunc urna, lacinia non dolor nec, pharetra sagittis enim. ','2019-06-01 09:03:07',NULL,NULL);
/*!40000 ALTER TABLE `tb_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_status`
--

DROP TABLE IF EXISTS `tb_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_status` (
  `chno` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT NULL,
  `label` varchar(14) DEFAULT 'ABCDEFGHIJKL',
  `location` int(11) DEFAULT '1',
  PRIMARY KEY (`chno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_status`
--

LOCK TABLES `tb_status` WRITE;
/*!40000 ALTER TABLE `tb_status` DISABLE KEYS */;
INSERT INTO `tb_status` VALUES (1,'2019-05-28 18:11:14',0,'ABCDEFGHIJKL',1),(2,'2019-05-28 18:11:48',0,'ABCDEFGHIJKL',1),(3,'2019-05-28 18:11:48',1,'ABCDEFGHIJKL',1),(4,'2019-05-28 18:11:48',1,'ABCDEFGHIJKL',1),(5,'2019-05-28 18:11:48',1,'ABCDEFGHIJKL',1),(6,'2019-05-28 18:11:48',1,'ABCDEFGHIJKL',1),(7,'2019-05-28 18:12:27',1,'jhhjbkjnkl',1),(8,'2019-05-28 18:12:27',1,'ABCDEFGHIJKL',1),(9,'2019-05-28 18:12:27',1,'ABCDEFGHIJKL',1),(10,'2019-05-28 18:12:27',1,'ABCDEFGHIJKL',1),(11,'2019-05-28 18:12:27',1,'ABCDEFGHIJKL',1),(12,'2019-05-28 18:12:55',1,'ABCDEFGHIJKL',1),(13,'2019-05-28 18:12:55',0,'ABCDEFGHIJKL',1),(14,'2019-05-28 18:12:55',0,'ABCDEFGHIJKL',1),(15,'2019-05-28 18:12:55',0,'ABCDEFGHIJKL',1),(16,'2019-05-28 18:12:55',0,'ABCDEFGHIJKL',1),(17,'2019-05-28 18:13:26',1,'ABCDEFGHIJKL',1),(18,'2019-05-28 18:13:26',1,'ABCDEFGHIJKL',1),(19,'2019-05-28 18:13:26',0,'ABCDEFGHIJKL',1),(20,'2019-05-28 18:13:26',0,'ABCDEFGHIJKL',1),(21,'2019-05-28 18:13:26',1,'ABCDEFGHIJKL',1),(22,'2019-05-28 18:13:49',1,'ABCDEFGHIJKL',1),(23,'2019-05-28 18:13:49',1,'ABCDEFGHIJKL',1),(24,'2019-05-28 18:13:49',1,'ABCDEFGHIJKL',1),(25,'2019-05-28 18:15:06',0,'XYZASASXSASAS',1),(26,'2019-05-28 18:15:06',1,'ABCDEFGHIJKL',1),(27,'2019-05-28 18:15:06',0,'ABCDEFGHIJKL',1),(28,'2019-05-28 18:15:06',0,'ABCDEFGHIJKL',1),(29,'2019-05-28 18:15:06',2,'ABCDEFGHIJKL',1),(30,'2019-05-28 18:15:34',1,'ABCDEFGHIJKL',1),(31,'2019-05-28 18:15:34',2,'ABCDEFGHIJKL',1),(32,'2019-05-28 18:15:34',1,'ABCDEFGHIJKL',1),(33,'2019-06-11 06:24:01',3,'ABCDEFGHIJKL',1),(34,'2019-06-01 09:10:59',1,'ABCDEFGHIJKL',1),(35,'2019-06-02 09:45:39',1,'XYZASASXSASAS',1),(36,'2019-06-12 08:45:07',2,'ABCDEFGHIJKL',1);
/*!40000 ALTER TABLE `tb_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` text,
  `password` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'sashakt','$2a$10$Jou8rTHA0RTk7umx6sTrNuxIDoSnxxvUOZwwJjs74Jy.fLb0nR0WO');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-13  0:00:51
