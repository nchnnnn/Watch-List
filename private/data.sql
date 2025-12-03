CREATE TABLE `tablenotes` (
  `UID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(254) NOT NULL,
  `episodes` int NOT NULL,
  `viewing_status` varchar(254) NOT NULL,
  `release_status` varchar(254) NOT NULL,
  `date_created` date NOT NULL,
  `time_created` time NOT NULL,
  PRIMARY KEY (`UID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

