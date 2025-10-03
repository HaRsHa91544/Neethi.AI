-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: neethi
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `neethi`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `neethi` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `neethi`;

--
-- Table structure for table `sources`
--

DROP TABLE IF EXISTS `sources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sources` (
  `id` int(11) NOT NULL,
  `articleId` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `link` text NOT NULL,
  KEY `aid_fk` (`articleId`),
  CONSTRAINT `aid_fk` FOREIGN KEY (`articleId`) REFERENCES `submissions` (`articleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sources`
--

LOCK TABLES `sources` WRITE;
/*!40000 ALTER TABLE `sources` DISABLE KEYS */;
INSERT INTO `sources` VALUES (0,865957,'NDTV','Reports on Ayodhya land prices soaring with circle rates hiked up to 200%.','https://www.ndtv.com/topic/ayodhya'),(0,865957,'Hindustan Times','Provides latest news, photos and videos related to Ayodhya.','https://www.hindustantimes.com/topic/ayodhya'),(0,865957,'Indian Express','Discusses the Babri Masjid debate and a former CJI\'s reference to it.','https://indianexpress.com/article/opinion/columns/babri-masjid-ayodhya-dispute-d-y-chandrachud-on-babri-masjid-10280573/'),(0,449972,'https://www.bbc.com/news/world-asia-india-67775166','BBC reports on the transformation of Ayodhya into a major pilgrimage center.','https://www.bbc.com/news/world-asia-india-67775166'),(0,449972,'https://ayodhyada.in/','Ayodhya Development Authority provides updates on development interventions.','https://ayodhyada.in/'),(0,449972,'https://www.fairobserver.com/culture/how-has-ayodhya-changed-since-the-ram-mandirs-construction/','Fair Observer details how Ayodhya has changed since the Ram Mandir\'s construction.','https://www.fairobserver.com/culture/how-has-ayodhya-changed-since-the-ram-mandirs-construction/');
/*!40000 ALTER TABLE `sources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submissions`
--

DROP TABLE IF EXISTS `submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `submissions` (
  `articleId` int(11) NOT NULL,
  `mobile` bigint(10) NOT NULL,
  `news` text NOT NULL,
  `verdict` text NOT NULL,
  `score` int(11) NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`articleId`),
  KEY `mobile_fk` (`mobile`),
  CONSTRAINT `mobile_fk` FOREIGN KEY (`mobile`) REFERENCES `users` (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submissions`
--

LOCK TABLES `submissions` WRITE;
/*!40000 ALTER TABLE `submissions` DISABLE KEYS */;
INSERT INTO `submissions` VALUES (449972,9014709040,'There are new developments or updates concerning Ayodhya.','Real',79,'2025-10-01 21:37:10'),(865957,9014709040,'Recent news reports are about Ayodhya.','Real',98,'2025-10-01 21:36:25');
/*!40000 ALTER TABLE `submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `url_submissions`
--

DROP TABLE IF EXISTS `url_submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `url_submissions` (
  `url_id` int(11) NOT NULL,
  `mobile` bigint(10) NOT NULL,
  `url` longtext NOT NULL,
  `verdict` text NOT NULL,
  `score` int(11) NOT NULL,
  `googleSafe` text NOT NULL,
  `virusTotal` text NOT NULL,
  `urlScan` text NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  KEY `mob_fk` (`mobile`),
  CONSTRAINT `mob_fk` FOREIGN KEY (`mobile`) REFERENCES `users` (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `url_submissions`
--

LOCK TABLES `url_submissions` WRITE;
/*!40000 ALTER TABLE `url_submissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `url_submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `mobile` bigint(10) NOT NULL,
  `pin` varchar(100) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `category` text NOT NULL,
  `city` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (9014709040,'0','Harsha','','education','Rayadurgam','2025-10-01 21:12:53');
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

-- Dump completed on 2025-10-02 19:34:47
