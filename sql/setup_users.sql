CREATE SCHEMA `incolun`;

DROP TABLE IF EXISTS `incolun`.`users`;

CREATE TABLE IF NOT EXISTS `incolun`.`users` (
  `id` BIGINT UNSIGNED NOT NULL,
  `profile_id` INT UNSIGNED NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `type` CHAR(1) NOT NULL,
  `created` DATETIME NOT NULL,
  `status` CHAR(1) NOT NULL,
  `kudos` INT UNSIGNED NOT NULL DEFAULT 0,
  `boards` INT UNSIGNED NOT NULL DEFAULT 0,
  `saved_boards` INT UNSIGNED NOT NULL DEFAULT 0,
  `json_blob` JSON NULL,
  PRIMARY KEY (`id`, `profile_id`))
ENGINE = InnoDB;


INSERT INTO incolun.users (id,profile_id, username, email, password, type, created, status) 
   VALUES (0, '1372734638','a','a@a','2ebb8efcaa00598520e7b4fdc7d3a6630bcb13f0','L',NOW(),'A');
   
SELECT * FROM incolun.users;

SELECT * from incolun.users WHERE user_id_key = '1372734638';

INSERT INTO incolun.users (id,user_id_key,user_id, email,username, password,token,type,created,status) 
   VALUES (1, '1','b@b','b@b','b','N/A','NA','L',NOW(),'A');

DELETE from incolun.users WHERE user_id_key=4232722471
DELETE from incolun.users WHERE user_id_key=834624741
                   
INSERT INTO users (id,user_id_key,user_id, email,username, password, token, type,created,status) 
	VALUES ('281779587464273920', '4232722471','b@b','b@b','b','5ece1dc5bb7a19d0d5d8dc670a582519f5f3170a','NA','L',NOW(),'N')